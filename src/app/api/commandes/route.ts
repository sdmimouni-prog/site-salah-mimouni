import { createHash } from 'node:crypto';
import { books, getBook } from '@/content/books';
import { contact } from '@/content/contact';
import { orderEmail, sendOrderEmail, validEmail, validateOrder } from '@/lib/book-order';
export const runtime = 'nodejs';
const attempts = new Map<string,{count:number;until:number}>();
function limited(key: string, max: number) {
  const now = Date.now();
  for (const [id, value] of attempts) if (value.until <= now) attempts.delete(id);
  const entry = attempts.get(key) || {count:0,until:now + 3_600_000};
  entry.count++; attempts.set(key,entry); return entry.count > max;
}
const reply = (error: string, status: number) => Response.json({error},{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request: Request) {
  let expectedOrigin: string;
  try {
    const url = new URL(request.url);
    expectedOrigin = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : new URL(`${url.protocol}//${request.headers.get('host') || url.host}`).origin;
  } catch { return reply('Service momentanément indisponible.',503); }
  if (request.headers.get('origin') !== expectedOrigin) return reply('Origine de la demande non autorisée.',403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply('Format de demande invalide.',415);
  if (Number(request.headers.get('content-length') || 0) > 12_000) return reply('Demande trop volumineuse.',413);
  let input: unknown;
  try {
    const reader = request.body?.getReader(); if (!reader) return reply('Demande vide.',400);
    const chunks: Uint8Array[] = []; let length = 0;
    while (true) { const {done,value} = await reader.read(); if (done) break; length += value.byteLength; if (length > 12_000) {await reader.cancel(); return reply('Demande trop volumineuse.',413);} chunks.push(value); }
    input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch { return reply('Demande invalide.',400); }
  const checked = validateOrder(input, books.map(book=>book.slug));
  if ('error' in checked) return reply(checked.error,400);
  const order = checked.order, book = getBook(order.book)!;
  const key = process.env.RESEND_API_KEY;
  const sender = process.env.BOOK_ORDERS_FROM;
  const recipient = contact.email;
  if (!key || !sender || /[\r\n]/.test(sender) || !validEmail(recipient)) return reply('L’envoi en ligne n’est pas encore activé. Contactez sd.mimouni@richmedia.ma pour commander.',503);
  // Single-process abuse guard. Add an edge/shared rate limiter before a multi-instance deployment.
  const readerKey = createHash('sha256').update(order.email).digest('hex');
  if (limited('global',60) || limited(readerKey,5)) return reply('Trop de demandes. Veuillez réessayer dans une heure.',429);
  const payload = orderEmail(order,book,recipient,sender);
  const idempotency = createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  try {
    await sendOrderEmail(payload,key,`book-order-${idempotency}`);
    return Response.json({ok:true,reference:order.requestId},{headers:{'Cache-Control':'no-store'}});
  } catch {
    return reply('L’envoi n’a pas pu être confirmé. Réessayez avec ce formulaire ou écrivez à sd.mimouni@richmedia.ma.',502);
  }
}
