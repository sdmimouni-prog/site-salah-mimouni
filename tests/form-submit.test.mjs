import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
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
const { sendFormEmail } = await import(moduleUrl('src/lib/form-submit.ts'));
const payload = { to: ['sd.mimouni@richmedia.ma'], reply_to: 'visiteur@example.com', subject: 'Contact — Collaboration', text: 'Un message de test\nsur deux lignes.' };
const source = 'https://site-salah-mimouni.vercel.app/contact';

test('FormSubmit uses the fixed recipient, validated reply address and site source without extra recipients', async () => {
  let calls = 0;
  const reference = await sendFormEmail({ ...payload, _cc: 'forged@example.com', _webhook: 'https://untrusted.example' }, source, 'contact-test', async (url, options) => {
    calls++;
    assert.equal(url, 'https://formsubmit.co/ajax/sd.mimouni@richmedia.ma');
    assert.equal(options.method, 'POST');
    assert.equal(options.headers.Referer, source);
    assert.equal(options.headers.Origin, 'https://site-salah-mimouni.vercel.app');
    assert.deepEqual(JSON.parse(options.body), { email: 'visiteur@example.com', message: payload.text, reference: 'contact-test', source, _replyto: 'visiteur@example.com', _subject: payload.subject, _template: 'table', _url: source });
    return Response.json({ success: 'true', message: 'Form successfully submitted' });
  });
  assert.equal(reference, 'contact-test'); assert.equal(calls, 1);
});

test('FormSubmit rejects activation-required, failure and invalid responses instead of claiming delivery', async () => {
  for (const response of [
    Response.json({ success: 'false', message: 'This form needs Activation.' }),
    Response.json({ success: false }), Response.json({}), Response.json({ success: 'yes' }),
    Response.json({ success: 'true' }, { status: 503 }), new Response('<html>Unavailable</html>'),
  ]) await assert.rejects(sendFormEmail(payload, source, 'test', async () => response));
});

test('FormSubmit accepts boolean success and propagates connection failures', async () => {
  assert.equal(await sendFormEmail(payload, source, 'test', async () => Response.json({ success: true })), 'test');
  await assert.rejects(sendFormEmail(payload, source, 'test', async () => { throw new Error('Timeout'); }), /Timeout/);
});

test('FormSubmit refuses another recipient or a non-web source before making any request', async () => {
  let calls = 0;
  const send = async () => { calls++; return Response.json({ success: 'true' }); };
  await assert.rejects(sendFormEmail({ ...payload, to: ['other@example.com'] }, source, 'test', send), /INVALID_RECIPIENT/);
  await assert.rejects(sendFormEmail({ ...payload, to: [...payload.to, 'other@example.com'] }, source, 'test', send), /INVALID_RECIPIENT/);
  await assert.rejects(sendFormEmail(payload, 'file:///tmp/contact', 'test', send), /INVALID_SOURCE/);
  assert.equal(calls, 0);
});
