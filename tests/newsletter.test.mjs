import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { randomUUID } from 'node:crypto';
import ts from 'typescript';

const modules = new Map();
function moduleUrl(file) {
  file = resolve(file);
  if (modules.has(file)) return modules.get(file);
  let js = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  js = js.replace(/from ['"](\.[^'"]+)['"]/g, (_, path) => `from '${moduleUrl(resolve(dirname(file), path + '.ts'))}'`);
  const url = `data:text/javascript;base64,${Buffer.from(js).toString('base64')}`;
  modules.set(file, url); return url;
}
const { validateNewsletterFields, validateNewsletterRequest } = await import(moduleUrl('src/lib/newsletter-request.ts'));
const { newsletterEmail, newsletterMailConfig, createNewsletterHandler } = await import(moduleUrl('src/lib/newsletter-service.ts'));
const env = { RESEND_API_KEY: 'mock-key', BOOK_ORDERS_FROM: 'Site <sender@example.com>', SITE_URL: 'http://localhost:3009' };
const valid = () => ({ email: ' ABONNE@example.com ', consent: true, website: '', requestId: randomUUID() });
const request = (body, headers = {}) => new Request(env.SITE_URL + '/api/newsletter', { method: 'POST', headers: { Origin: env.SITE_URL, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });

test('newsletter validates consent, email, honeypot and request id', () => {
  const result = validateNewsletterRequest(valid());
  assert.equal(result.subscription.email, 'abonne@example.com');
  for (const patch of [{ email: '' }, { email: 'x'.repeat(255) }, { email: 'a@example.com\r\nBcc: b@example.com' }, { consent: false }, { consent: 'true' }, { website: 'bot' }, { requestId: 'bad' }]) assert.ok(validateNewsletterRequest({ ...valid(), ...patch }).error);
  for (const value of [null, [], 'test', {}, { email: 3 }]) assert.ok(validateNewsletterRequest(value).error);
  assert.deepEqual(Object.keys(validateNewsletterFields({ email: '', consent: false, website: '' })), ['email', 'consent']);
});

test('newsletter notification always goes only to the owner, with the validated visitor as reply-to', () => {
  const parsed = validateNewsletterRequest({ ...valid(), to: 'attacker@example.com', subject: 'forged' });
  const mail = newsletterEmail(parsed.subscription, env.BOOK_ORDERS_FROM);
  assert.deepEqual(mail.to, ['sd.mimouni@richmedia.ma']);
  assert.equal(mail.reply_to, 'abonne@example.com');
  assert.equal(mail.subject, 'Newsletter Podcasts — Nouvelle demande d’inscription');
  assert.match(mail.text, /Consentement/);
  assert.match(mail.text, /page \/podcasts/);
  assert.equal(mail.html, undefined);
  assert.doesNotMatch(mail.text, /attacker/);
});

test('newsletter configuration reuses the mail transport without exposing unconfigured senders', () => {
  assert.equal(newsletterMailConfig(env).available, true);
  assert.equal(newsletterMailConfig({ ...env, CONTACT_FROM: 'contact@example.com' }).sender, 'contact@example.com');
  assert.equal(newsletterMailConfig({ ...env, CONTACT_FROM: 'contact@example.com', NEWSLETTER_FROM: 'newsletter@example.com' }).sender, 'newsletter@example.com');
  for (const value of [{}, { ...env, RESEND_API_KEY: '' }, { ...env, NEWSLETTER_FROM: 'bad\r\nBcc:a@example.com' }]) assert.equal(newsletterMailConfig(value).available, false);
});

test('newsletter rejects cross-origin, non-JSON, oversized and bot submissions before sending', async () => {
  let calls = 0;
  const handler = createNewsletterHandler({ env, send: async () => { calls++; return 'mock'; } });
  assert.equal((await handler(request(valid(), { Origin: 'https://untrusted.example' }))).status, 403);
  assert.equal((await handler(request(valid(), { 'Content-Type': 'application/json-forged' }))).status, 415);
  assert.equal((await handler(request({ extra: 'x'.repeat(4100) }))).status, 413);
  assert.equal((await handler(request(valid(), { 'Content-Length': '5000' }))).status, 413);
  assert.equal((await handler(request({ ...valid(), website: 'spam' }))).status, 400);
  assert.equal(calls, 0);
});

test('newsletter without mail configuration never returns a false success', async () => {
  let calls = 0;
  const response = await createNewsletterHandler({ env: {}, send: async () => { calls++; return 'mock'; } })(request(valid()));
  assert.equal(response.status, 503); assert.equal((await response.json()).ok, undefined); assert.equal(calls, 0);
});

test('newsletter recognizes the browser host when Next uses an internal hostname, but honors configured origins', async () => {
  const handler = createNewsletterHandler({ env: {} });
  const headers = { Host: '127.0.0.1:3009', Origin: 'http://127.0.0.1:3009' };
  assert.equal((await handler(request(valid(), headers))).status, 503);
  assert.equal((await handler(request(valid(), { ...headers, Origin: 'http://untrusted.example' }))).status, 403);
  assert.equal((await createNewsletterHandler({ env })(request(valid(), headers))).status, 403);
});

test('newsletter only succeeds after provider acceptance and deduplicates concurrent retries', async () => {
  let release, started, calls = 0;
  const ready = new Promise(resolve => { started = resolve; });
  const input = valid();
  const handler = createNewsletterHandler({ env, send: async (mail, key, idempotency) => {
    calls++; assert.deepEqual(mail.to, ['sd.mimouni@richmedia.ma']); assert.equal(key, 'mock-key'); assert.equal(idempotency, `newsletter-${input.requestId}`);
    started(); await new Promise(resolve => { release = resolve; }); return 'mock-accepted';
  } });
  const first = handler(request(input)); await ready;
  const second = handler(request(input)); release();
  for (const response of await Promise.all([first, second])) assert.deepEqual(await response.json(), { ok: true, reference: input.requestId });
  assert.equal(calls, 1);
  assert.equal((await handler(request({ ...input, email: 'different@example.com' }))).status, 409);
});

test('newsletter keeps the same request retryable after a provider failure', async () => {
  let calls = 0;
  const handler = createNewsletterHandler({ env, send: async () => { if (++calls === 1) throw new Error('mock failure'); return 'mock'; } });
  const input = valid();
  const failed = await handler(request(input));
  assert.equal(failed.status, 502); assert.equal((await failed.json()).ok, undefined);
  assert.equal((await handler(request(input))).status, 200); assert.equal(calls, 2);
});

test('newsletter limits repeated email submissions and expires the guard after one hour', async () => {
  let time = 1000, calls = 0;
  const handler = createNewsletterHandler({ env, now: () => time, send: async () => { calls++; return 'mock'; } });
  for (let i = 0; i < 3; i++) assert.equal((await handler(request(valid()))).status, 200);
  const limited = await handler(request(valid()));
  assert.equal(limited.status, 429); assert.equal(limited.headers.get('Retry-After'), '3600'); assert.equal(calls, 3);
  time += 3_600_001; assert.equal((await handler(request(valid()))).status, 200);
});

test('newsletter global limit also bounds invalid requests', async () => {
  const handler = createNewsletterHandler({ env: {}, send: async () => { throw new Error('Unexpected send'); } });
  for (let i = 0; i < 120; i++) assert.equal((await handler(request({}))).status, 400);
  assert.equal((await handler(request({}))).status, 429);
});
