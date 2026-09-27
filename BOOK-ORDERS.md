# Book landing pages and order requests

Three routes: `/livres/entre-deux-vols`, `/livres/quand-les-marques-pensent`, `/livres/pour-un-like-de-plus`.
Canonical catalogue, price (145 MAD each), covers and excerpts: `src/content/books.ts`. Originals copied unchanged to `public/assets/books`. The full jacket of Quand les marques pensent is shown through a right-aligned CSS crop; the original file is intact.

## Activate email

Recipient authorized by the owner: **sd.mimouni@richmedia.ma**.

1. Copy `.env.example` to `.env.local` (ignored by Git).
2. Set `RESEND_API_KEY` and `BOOK_ORDERS_FROM` to a sender on a domain you have verified with Resend. Set `SITE_URL` to the exact public origin when deploying. Keys remain server-only.
3. Restart Next.js; no new client build is required for these runtime variables.
4. Send a single authorized test, verify receipt in the destination inbox and check Reply-To before opening orders to visitors.

Official provider documentation: https://resend.com/docs/api-reference/emails/send-email and https://resend.com/docs/dashboard/emails/idempotency-keys .

No credentials were available at implementation. Without configuration the API returns HTTP 503 with a direct email fallback; it never claims success. The visible success state requires provider acceptance (not a guarantee of inbox delivery). No automatic customer email or payment is sent/processed.

## Request contract

`POST /api/commandes`, same-origin JSON. Fields: book slug, name, email, optional phone, city, country, quantity 1–10, optional message, consent boolean, UUID v4 requestId and blank honeypot website.

Price and title come from the server catalogue, never the browser. The email contains quantity, subtotal, reader details, message and request reference. Shipping is explicitly unpriced and subject to confirmation. Reply-To uses the validated reader email. Recipient is fixed server-side. Messages are plain text. No request content is logged or saved to disk.

The route checks origin, content type, a streamed 12 KB body limit, all field lengths and values, the honeypot and consent. It limits requests to 5 per email/hour and 60 globally/hour in one server process. **Before a multi-instance public deployment, add a shared/edge rate limiter or CAPTCHA**; this in-memory limit is reset on restart. Provider idempotency prevents duplicate email on an identical retry during the provider retention window. The client preserves the request ID after errors and disables double submission.

## Excerpts and fulfillment still needed

Only the actual back-cover quote of Quand les marques pensent is published. No manuscript text was supplied for the other books. Add approved text to `excerpt` and/or a public PDF path to `excerptPdf` once the author uploads the three manuscripts. Do not publish entire manuscripts automatically.

Owner still needs to confirm delivery fees, regions, fulfillment and payment method. Forms are requests to arrange an order by email, not a paid checkout. Do not announce availability or delivery dates without confirmation.
