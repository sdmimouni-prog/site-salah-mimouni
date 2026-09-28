import { createHash } from 'node:crypto';
import { contact } from '../content/contact';
import { sendFormEmail } from './form-submit';
import { validateNewsletterRequest, type NewsletterRequest } from './newsletter-request';

type MailEnvironment = Record<string, string | undefined>;
export function newsletterEmail(subscription: NewsletterRequest) {
  return {
    to: [contact.email],
    reply_to: subscription.email,
    subject: 'Newsletter Podcasts — Nouvelle demande d’inscription',
    text: [
      'Nouvelle demande d’inscription à la newsletter Podcasts de Salah-Eddine MIMOUNI.',
      '', `Adresse e-mail : ${subscription.email}`, 'Source : formulaire de la page /podcasts',
      `Langue du formulaire : ${subscription.locale === 'en' ? 'anglais' : 'français'}`,
      'Consentement : je souhaite recevoir les nouveaux épisodes par e-mail.',
      `Référence : ${subscription.requestId}`, '',
      'Cette adresse est transmise pour le suivi de l’inscription. Aucun envoi de campagne automatique n’a été déclenché.',
    ].join('\n'),
  };
}

// Rate limits and deduplication are per server instance.
// Only hashes and submission references are retained in the short-lived maps.
export function createNewsletterHandler({ env = process.env, send = sendFormEmail, now = Date.now, browserDelivery = false }: { env?: MailEnvironment; send?: typeof sendFormEmail; now?: () => number; browserDelivery?: boolean } = {}) {
  const attempts = new Map<string, { count: number; until: number }>();
  const requests = new Map<string, { fingerprint: string; result: Promise<Response>; until: number }>();
  const hash = (value: string) => createHash('sha256').update(value).digest('hex');
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
      // Next's local request URL can use localhost while the browser uses 127.0.0.1.
      // A configured public URL always takes precedence over request headers.
      if (!env.SITE_URL && request.headers.get('host')) site.host = request.headers.get('host')!;
      origin = site.origin;
    }
    catch { return json({ error: 'Service temporairement indisponible.' }, 503); }
    if (request.headers.get('origin') !== origin) return json({ error: 'Origine de la demande non autorisée.' }, 403);
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return json({ error: 'Format de demande invalide.' }, 415);
    if (limited('global', 120)) return json({ error: 'Trop de demandes. Réessayez dans une heure.' }, 429);
    if (Number(request.headers.get('content-length') || 0) > 4096) return json({ error: 'Demande trop volumineuse.' }, 413);
    let input: unknown;
    try {
      const reader = request.body?.getReader();
      if (!reader) return json({ error: 'Demande vide.' }, 400);
      const chunks: Uint8Array[] = []; let size = 0;
      while (true) {
        const { value, done } = await reader.read(); if (done) break;
        size += value.byteLength;
        if (size > 4096) { await reader.cancel(); return json({ error: 'Demande trop volumineuse.' }, 413); }
        chunks.push(value);
      }
      input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch { return json({ error: 'Demande invalide.' }, 400); }
    const parsed = validateNewsletterRequest(input);
    if ('error' in parsed) return json(parsed, 400);
    const { subscription } = parsed;
    const payload = newsletterEmail(subscription);
    if (browserDelivery) {
      if (limited(hash(subscription.email), 3)) return json({ error: 'Trop de demandes pour cette adresse. Réessayez dans une heure.' }, 429);
      return json({ ready: true, reference: subscription.requestId, delivery: { payload, source: `${origin}/podcasts`, reference: `newsletter-${subscription.requestId}` } });
    }
    const fingerprint = hash(JSON.stringify(payload));
    const existing = requests.get(subscription.requestId);
    if (existing) return existing.fingerprint === fingerprint ? (await existing.result).clone() : json({ error: 'Cette référence a déjà été utilisée. Rechargez la page.' }, 409);
    if (limited(hash(subscription.email), 3)) return json({ error: 'Trop de demandes pour cette adresse. Réessayez dans une heure.' }, 429);
    const delivery = (async () => {
      try {
        await send(payload, `${origin}/podcasts`, `newsletter-${subscription.requestId}`);
        return json({ ok: true, reference: subscription.requestId });
      } catch {
        requests.delete(subscription.requestId);
        return json({ error: 'L’envoi n’a pas pu être confirmé. Réessayez ou envoyez votre demande par e-mail.' }, 502);
      }
    })();
    requests.set(subscription.requestId, { fingerprint, result: delivery, until: now() + 3_600_000 });
    return (await delivery).clone();
  };
}
