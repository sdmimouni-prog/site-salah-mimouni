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
const { contactSubject, contactLink } = await import(moduleUrl('src/content/contact.ts'));
const { emptyContactFields, validateContactFields, validateContactRequest } = await import(moduleUrl('src/lib/contact-request.ts'));
const { contactEmail, createContactHandler } = await import(moduleUrl('src/lib/contact-service.ts'));
const env = { SITE_URL: 'http://localhost:3009' };
const valid = () => ({ ...emptyContactFields, name: 'Visiteur Test', email: 'VISITEUR@example.com', subject: 'conference', message: 'Ceci est un message de test, sans envoi réel.', consent: true, requestId: randomUUID() });
const request = (value, headers = {}) => new Request('http://localhost:3009/api/contact', { method: 'POST', headers: { Origin: env.SITE_URL, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(value) });

test('contact URL selection ignores unknown, arrays and injected values', () => {
  for (const value of ['conference', 'podcast', 'litteraire', 'collaboration']) assert.equal(contactSubject(value), value);
  for (const value of [undefined, ['conference'], 'CONFERENCE', 'javascript:bad', 'unknown']) assert.equal(contactSubject(value), '');
  assert.equal(contactLink('litteraire'), '/contact?objet=litteraire#formulaire');
  assert.equal(contactLink(), '/contact');
});
test('contact validation reports individual errors and requires consent', () => {
  const errors = validateContactFields(emptyContactFields);
  assert.deepEqual(Object.keys(errors), ['name', 'email', 'subject', 'message', 'consent']);
  assert.equal(validateContactRequest(null).error, 'Vérifiez les champs indiqués.');
  assert.ok(validateContactRequest({ ...valid(), requestId: 'bad' }).error);
});
test('contact accepts international telephone and normalizes validated fields', () => {
  const minimal = validateContactRequest({ name: 'Visiteur Test', email: 'test@example.com', subject: 'autre', message: 'Un message sans champs facultatifs.', consent: true, requestId: randomUUID() });
  assert.equal(minimal.message.phone, ''); assert.equal(minimal.message.organization, '');
  for (const phone of ['', '+212 661 17 28 85', '+1 (415) 555-0100', '0044 20 7946 0958']) {
    const result = validateContactRequest({ ...valid(), phone, name: ' Visiteur Test ' });
    assert.equal(result.message.email, 'visiteur@example.com'); assert.equal(result.message.name, 'Visiteur Test');
  }
  for (const phone of ['abcdef', '+123', '12+3456789', '+1234567890123456']) assert.ok(validateContactFields({ ...valid(), phone }).phone);
});
test('contact enforces maximum lengths, permitted values and prevents header injection', () => {
  for (const patch of [{ name: 'x'.repeat(101) }, { email: 'a@example.com\r\nBcc: b@example.com' }, { organization: 'x'.repeat(151) }, { message: 'x'.repeat(5001) }, { subject: 'forged' }, { format: 'invalid' }, { location: 'x'.repeat(151) }, { date: '2027-02-31' }, { website: 'spam' }]) assert.ok(Object.keys(validateContactFields({ ...valid(), ...patch })).length);
  assert.deepEqual(validateContactFields({ ...valid(), message: 'Un message\nsur plusieurs lignes.', date: '2028-02-29', format: 'hybride' }), {});
});
test('contact only includes event details for relevant categories', () => {
  const input = { ...valid(), date: '2027-10-15', location: 'Rabat', format: 'hybride' };
  const message = validateContactRequest(input).message;
  const mail = contactEmail(message);
  assert.deepEqual(mail.to, ['sd.mimouni@richmedia.ma']); assert.equal(mail.reply_to, 'visiteur@example.com');
  assert.match(mail.text, /2027-10-15/); assert.match(mail.text, /Hybride/);
  const without = validateContactRequest({ ...input, subject: 'podcast', to: 'attacker@example.com', from: 'attacker@example.com' }).message;
  assert.equal(without.location, ''); assert.doesNotMatch(contactEmail(without).text, /Date envisagée/);
});
test('contact recognizes the browser host and keeps a configured public origin authoritative', async () => {
  let calls = 0;
  const send = async () => { calls++; return 'mock'; };
  const headers = { Host: '127.0.0.1:3009', Origin: 'http://127.0.0.1:3009' };
  assert.equal((await createContactHandler({ env: {}, send })(request(valid(), headers))).status, 200);
  assert.equal((await createContactHandler({ env, send })(request(valid(), headers))).status, 403);
  assert.equal(calls, 1);
});
test('contact rejects wrong origin, bad content type and oversized streamed input without sending', async () => {
  let calls = 0; const handler = createContactHandler({ env, send: async () => { calls++; return 'mock'; } });
  assert.equal((await handler(request(valid(), { Origin: 'https://untrusted.example' }))).status, 403);
  assert.equal((await handler(request(valid(), { 'Content-Type': 'text/plain' }))).status, 415);
  assert.equal((await handler(request(valid(), { 'Content-Type': 'application/json-forged' }))).status, 415);
  assert.equal((await handler(request({ message: 'x'.repeat(33_000) }))).status, 413);
  assert.equal((await handler(request({ ...valid(), website: 'bot' }))).status, 400);
  assert.equal(calls, 0);
});
test('contact uses FormSubmit without requiring Resend credentials', async () => {
  let calls = 0;
  const response = await createContactHandler({ env: {}, send: async () => { calls++; return 'mock'; } })(request(valid()));
  assert.equal(response.status, 200); assert.equal(calls, 1); assert.equal((await response.json()).ok, true);
});
test('contact accepts only after provider success; concurrent duplicates send once', async () => {
  let release, started; const ready = new Promise(resolve => { started = resolve; }); let calls = 0;
  const handler = createContactHandler({ env, send: async (payload, source, reference) => {
    calls++; assert.deepEqual(payload.to, ['sd.mimouni@richmedia.ma']); assert.equal(source, 'http://localhost:3009/contact'); assert.match(reference, /^contact-/);
    started(); await new Promise(resolve => { release = resolve; }); return 'mock-accepted';
  } });
  const input = valid(); const first = handler(request(input)); await ready;
  const second = handler(request(input)); release();
  const results = await Promise.all([first, second]);
  for (const response of results) assert.deepEqual(await response.json(), { ok: true, reference: input.requestId });
  assert.equal(calls, 1);
  assert.equal((await handler(request({ ...input, message: 'Un autre message avec la même référence.' }))).status, 409);
});
test('contact provider failure retains retry possibility and never reports success', async () => {
  let calls = 0; const handler = createContactHandler({ env, send: async () => { if (++calls === 1) throw Error('simulated'); return 'mock-accepted'; } });
  const input = valid(); const failed = await handler(request(input));
  assert.equal(failed.status, 502); assert.equal((await failed.json()).ok, undefined);
  assert.equal((await handler(request(input))).status, 200); assert.equal(calls, 2);
});
test('contact per-email rate limit returns 429 and expires after one hour', async () => {
  let time = 1_000; let calls = 0;
  const handler = createContactHandler({ env, now: () => time, send: async () => { calls++; return 'mock'; } });
  for (let i = 0; i < 5; i++) assert.equal((await handler(request(valid()))).status, 200);
  const limited = await handler(request(valid())); assert.equal(limited.status, 429); assert.equal(limited.headers.get('Retry-After'), '3600'); assert.equal(calls, 5);
  time += 3_600_001; assert.equal((await handler(request(valid()))).status, 200);
});
test('contact global guard also bounds invalid submissions', async () => {
  const handler = createContactHandler({ env: {}, send: async () => { throw Error('must not send'); } });
  for (let i = 0; i < 120; i++) assert.equal((await handler(request({}))).status, 400);
  assert.equal((await handler(request({}))).status, 429);
});

test('browser contact delivery returns validated preparation, never a delivery confirmation', async () => {
  let calls = 0;
  const handler = createContactHandler({ env, browserDelivery: true, send: async () => { calls++; return 'mock'; } });
  const input = { ...valid(), to: 'forged@example.com', _cc: 'forged@example.com' };
  const result = await (await handler(request(input))).json();
  assert.equal(result.ready, true); assert.equal(result.ok, undefined); assert.equal(calls, 0);
  assert.equal(result.reference, input.requestId);
  assert.deepEqual(result.delivery.payload.to, ['sd.mimouni@richmedia.ma']);
  assert.equal(result.delivery.payload.reply_to, 'visiteur@example.com');
  assert.equal(result.delivery.source, env.SITE_URL + '/contact');
  assert.equal(result.delivery.payload._cc, undefined);
  for (let i = 0; i < 4; i++) assert.equal((await handler(request(valid()))).status, 200);
  assert.equal((await handler(request(valid()))).status, 429);
  assert.equal((await handler(request({ ...valid(), consent: false }))).status, 400);
});
