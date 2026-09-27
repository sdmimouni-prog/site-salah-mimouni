export type Order = { book: string; name: string; email: string; phone: string; city: string; country: string; address?: string; quantity: number; message: string; consent: true; requestId: string };
const emailPattern = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;
export const validEmail = (value: string) => value.length <= 254 && emailPattern.test(value) && !/[\r\n]/.test(value);
export function validateOrder(input: unknown, slugs: string[]): { order: Order } | { error: string } {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {error:'Demande invalide.'};
  const value = input as Record<string, unknown>;
  const read = (key: string, min: number, max: number, multiline = false) => {
    const field = value[key];
    if (typeof field !== 'string') return null;
    const trimmed = field.trim();
    return trimmed.length >= min && trimmed.length <= max && !(multiline ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/ : /[\u0000-\u001f]/).test(trimmed) ? trimmed : null;
  };
  if (value.website !== undefined && value.website !== '') return {error:'Demande invalide.'};
  const book = read('book',1,80), name = read('name',2,100), email = read('email',3,254), phone = read('phone',0,30), city = read('city',2,100), country = read('country',2,80), message = read('message',0,1500,true), requestId = read('requestId',36,36);
  const address = value.address === undefined ? undefined : read('address',5,300);
  if (address === null || (book === 'pour-un-like-de-plus' && !address)) return {error:'Veuillez renseigner votre adresse de livraison (5 à 300 caractères).'};
  if (!book || !slugs.includes(book)) return {error:'Veuillez choisir un livre disponible.'};
  if (!name || !email || !validEmail(email) || phone === null || !city || !country || message === null) return {error:'Vérifiez vos coordonnées et les champs obligatoires.'};
  if (phone && !/^[+\d\s().-]{6,30}$/.test(phone)) return {error:'Veuillez vérifier votre numéro de téléphone.'};
  if (typeof value.quantity !== 'number' || !Number.isInteger(value.quantity) || value.quantity < 1 || value.quantity > 10) return {error:'Choisissez entre 1 et 10 exemplaires.'};
  if (value.consent !== true) return {error:'Votre accord est nécessaire pour traiter la demande.'};
  if (!requestId || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(requestId)) return {error:'Rechargez la page avant de réessayer.'};
  return {order:{book,name,email:email.toLowerCase(),phone,city,country,...(address?{address}:{}),message,quantity:value.quantity,consent:true,requestId}};
}
export function orderEmail(order: Order, book: {title:string;price:number}, recipient: string, sender: string) {
  return {
    from: sender, to: [recipient], reply_to: order.email,
    subject: `Demande de commande — ${book.title} — ${order.quantity} exemplaire(s)`,
    text: [
      'Nouvelle demande de commande depuis le site de Salah Eddine Mimouni.',
      '', `Référence : ${order.requestId}`, `Livre : ${book.title}`, `Quantité : ${order.quantity}`,
      `Prix unitaire : ${book.price} MAD`, `Sous-total livres : ${book.price * order.quantity} MAD`,
      'Livraison : frais et modalités à confirmer. Aucun paiement effectué sur le site.',
      '', `Nom : ${order.name}`, `Email : ${order.email}`, `Téléphone : ${order.phone || 'Non renseigné'}`,
      `Ville : ${order.city}`, `Pays : ${order.country}`, ...(order.address ? [`Adresse : ${order.address}`] : []), '', `Message : ${order.message || 'Aucun message'}`,
      '', 'Accord pour être recontacté au sujet de cette demande : oui.',
      'Répondez directement à cet email pour contacter le lecteur et confirmer la disponibilité, la livraison et le paiement.',
    ].join('\n'),
  };
}
export async function sendOrderEmail(payload: ReturnType<typeof orderEmail>, apiKey: string, idempotencyKey: string, send: typeof fetch = fetch) {
  if (!apiKey) throw new Error('MAIL_NOT_CONFIGURED');
  const response = await send('https://api.resend.com/emails', {
    method:'POST', headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json','Idempotency-Key':idempotencyKey},
    body:JSON.stringify(payload), signal:AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error('MAIL_DELIVERY_FAILED');
  const data = await response.json();
  if (!data || typeof data.id !== 'string' || !data.id) throw new Error('MAIL_DELIVERY_FAILED');
  return data.id as string;
}
