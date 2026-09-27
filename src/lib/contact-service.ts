import { createHash } from 'node:crypto';
import { contact, hasEventDetails } from '../content/contact';
import { sendFormEmail } from './form-submit';
import { validateContactRequest, type ContactMessage } from './contact-request';

type MailEnvironment = Record<string, string | undefined>;
export function contactEmail(message: ContactMessage) {
  const subject = contact.subjects.find(item => item.value === message.subject)!.label;
  const format = contact.formats.find(item => item.value === message.format)?.label || 'Non renseigné';
  return {
    to: [contact.email], reply_to: message.email,
    subject: `Contact — ${subject}`,
    text: [
      'Nouvelle demande depuis le site de Salah-Eddine MIMOUNI.', '', `Référence : ${message.requestId}`,
      `Objet : ${subject}`, `Nom : ${message.name}`, `E-mail : ${message.email}`, `Téléphone : ${message.phone || 'Non renseigné'}`,
      `Organisation : ${message.organization || 'Non renseignée'}`,
      ...(hasEventDetails(message.subject) ? ['', `Date envisagée : ${message.date || 'Non renseignée'}`, `Lieu : ${message.location || 'Non renseigné'}`, `Format : ${format}`] : []),
      '', 'Message :', message.message, '', 'Accord pour être recontacté au sujet de cette demande : oui.',
    ].join('\n'),
  };
}

// Scoped to this contact endpoint. No raw messages or contact details are retained
// in the limiter/deduplication maps. Use a shared limiter for multi-instance hosting.
export function createContactHandler({ env = process.env, send = sendFormEmail, now = Date.now }: { env?: MailEnvironment; send?: typeof sendFormEmail; now?: () => number } = {}) {
  const attempts = new Map<string, { count: number; until: number }>();
  const requests = new Map<string, { fingerprint: string; result: Promise<Response>; until: number }>();
  const hash = (text: string) => createHash('sha256').update(text).digest('hex');
  const json = (body: object, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': '3600' } : {}) } });
  const limited = (key: string, max: number) => {
    const time = now();
    for (const [id, item] of attempts) if (item.until <= time) attempts.delete(id);
    for (const [id, item] of requests) if (item.until <= time) requests.delete(id);
    const item = attempts.get(key) || { count: 0, until: time + 3_600_000 };
    item.count++; attempts.set(key, item);
    return item.count > max;
  };
  return async function POST(request: Request): Promise<Response> {
    let origin: string;
    try {
      const site = new URL(env.SITE_URL || request.url);
      if (!env.SITE_URL && request.headers.get('host')) site.host = request.headers.get('host')!;
      origin = site.origin;
    }
    catch { return json({ error: 'Service temporairement indisponible.' }, 503); }
    if (request.headers.get('origin') !== origin) return json({ error: 'Origine de la demande non autorisée.' }, 403);
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return json({ error: 'Format de demande invalide.' }, 415);
    if (limited('global', 120)) return json({ error: 'Trop de demandes. Veuillez réessayer dans une heure.' }, 429);
    if (Number(request.headers.get('content-length') || 0) > 32_000) return json({ error: 'Message trop volumineux.' }, 413);
    let input: unknown;
    try {
      const reader = request.body?.getReader();
      if (!reader) return json({ error: 'Demande vide.' }, 400);
      const chunks: Uint8Array[] = []; let size = 0;
      while (true) {
        const { value, done } = await reader.read(); if (done) break;
        size += value.byteLength;
        if (size > 32_000) { await reader.cancel(); return json({ error: 'Message trop volumineux.' }, 413); }
        chunks.push(value);
      }
      input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch { return json({ error: 'Demande invalide.' }, 400); }
    const result = validateContactRequest(input);
    if ('error' in result) return json(result, 400);
    const payload = contactEmail(result.message);
    const fingerprint = hash(JSON.stringify(payload));
    const existing = requests.get(result.message.requestId);
    if (existing) return existing.fingerprint === fingerprint ? (await existing.result).clone() : json({ error: 'Cette référence a déjà été utilisée. Modifiez votre demande avant de réessayer.' }, 409);
    if (limited(hash(result.message.email), 5)) return json({ error: 'Trop de demandes. Veuillez réessayer dans une heure.' }, 429);
    const delivery = (async () => {
      try {
        await send(payload, `${origin}/contact`, `contact-${result.message.requestId}`);
        return json({ ok: true, reference: result.message.requestId });
      } catch {
        requests.delete(result.message.requestId);
        return json({ error: `L’envoi n’a pas pu être confirmé. Vos champs sont conservés. Réessayez ou écrivez à ${contact.email}.` }, 502);
      }
    })();
    requests.set(result.message.requestId, { fingerprint, result: delivery, until: now() + 3_600_000 });
    return (await delivery).clone();
  };
}
