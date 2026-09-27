// Opt-in local QA preload. Not imported by the application or production runtime.
// Intercepts Resend before any network access: first attempt fails, next succeeds.
const originalFetch = globalThis.fetch;
let attempts = 0;
globalThis.fetch = async function(input, init) {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  if (url === 'https://api.resend.com/emails') {
    const attempt = ++attempts;
    await new Promise(resolve => setTimeout(resolve, 3000));
    process.stdout.write(`Mock mail attempt ${attempt}: ${attempt === 1 ? 'rejected' : 'accepted'}; no email sent.\n`);
    return attempt === 1 ? Response.json({ error: 'Simulated failure' }, { status: 503 }) : Response.json({ id: `mock-contact-${attempt}` });
  }
  if (/^https?:/.test(url) && !/^http:\/\/(127\.0\.0\.1|localhost)(:|\/)/.test(url)) throw new Error('External network disabled by local QA mail fixture');
  return originalFetch(input, init);
};
