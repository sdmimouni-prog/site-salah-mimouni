import { contact } from '../content/contact';

type SiteEmail = { to: string[]; reply_to: string; subject: string; text: string };

// The recipient and transport options are controlled by the server, never form fields.
export async function sendFormEmail(payload: SiteEmail, source: string, reference: string, send: typeof fetch = fetch) {
  if (payload.to.length !== 1 || payload.to[0] !== contact.email) throw new Error('INVALID_RECIPIENT');
  const url = new URL(source);
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('INVALID_SOURCE');
  const response = await send(`https://formsubmit.co/ajax/${contact.email}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', Referer: url.href, Origin: url.origin },
    body: JSON.stringify({
      email: payload.reply_to, message: payload.text, reference, source: url.href,
      _replyto: payload.reply_to, _subject: payload.subject, _template: 'table', _url: url.href,
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error('MAIL_DELIVERY_FAILED');
  const result = await response.json();
  // FormSubmit returns string booleans. Activation requests are success: "false".
  if (!result || (result.success !== true && result.success !== 'true')) throw new Error('MAIL_DELIVERY_FAILED');
  return reference;
}
