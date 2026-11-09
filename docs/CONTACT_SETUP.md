# Contact Form Setup

The contact form is implemented in `src/pages/ContactPage.tsx` and posts JSON to `POST /api/contact`, handled by `functions/api/contact.ts` as a Cloudflare Pages Function.

No database is used. Messages are validated on the server and forwarded by email through Resend.

## Behaviour

1. The browser trims input and validates it with `src/lib/validation.ts`.
2. The request includes a hidden honeypot field (`website`), an elapsed-time value, and an optional Turnstile token.
3. The Function re-validates every field and enforces length limits.
4. Honeypot submissions receive a silent success response so bots do not retry.
5. Submissions completed in under 2 seconds are rejected with an explicit error, so a fast legitimate submission is never falsely reported as sent.
6. If Turnstile is configured, the token is verified with Cloudflare.
7. If delivery is not configured, the endpoint returns `503` and the UI shows its failure state with a pre-filled `mailto:` fallback.

A failed submission is never presented as a success.

## Environment variables

Configure these in Cloudflare Pages under **Settings → Environment variables** (Production and Preview as needed).

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes, for delivery | Resend API key |
| `CONTACT_TO_EMAIL` | Yes, for delivery | Inbox that receives enquiries |
| `CONTACT_FROM_EMAIL` | Yes, for delivery | Verified sender address in Resend |
| `TURNSTILE_SECRET_KEY` | Optional | Server-side Turnstile verification secret |
| `VITE_TURNSTILE_SITE_KEY` | Optional | Public Turnstile site key; read at build time |

`VITE_TURNSTILE_SITE_KEY` is embedded into the client build. Only a public site key belongs there; never put the secret in a `VITE_` variable.

## Resend setup

1. Create a Resend account and verify the sending domain.
2. Create an API key with send permission.
3. Set `CONTACT_FROM_EMAIL` to a verified address on that domain, for example `contact@aayusx.dev`.
4. Set `CONTACT_TO_EMAIL` to the inbox you actually read.

## Turnstile (optional)

1. Create a Turnstile site in the Cloudflare dashboard.
2. Add the **site key** as `VITE_TURNSTILE_SITE_KEY` in the Pages build environment.
3. Add the **secret key** as `TURNSTILE_SECRET_KEY` in the Pages runtime environment.
4. Rebuild so the client picks up the site key.

Without these variables, the form still renders and submits; the endpoint simply skips the challenge.

## Local testing

Static-only preview (the endpoint is not available):

```bash
npm run build
npm run preview
```

Function testing with Wrangler:

```bash
npm run build
npx wrangler pages dev dist
```

Create a `.dev.vars` file in the project root for local secrets. It is gitignored.

```dotenv
RESEND_API_KEY=re_your_key
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=contact@aayusx.dev
TURNSTILE_SECRET_KEY=optional_secret
```

In development without Wrangler, `POST /api/contact` returns the SPA fallback instead of JSON. The form correctly shows the failure state and the email fallback. Use Wrangler to test the success path.

## Security notes

- Secrets are read only inside the Function.
- Input is length-limited and escaped before being placed in HTML email.
- The endpoint returns generic errors and does not echo submitted content or configuration.
- No message content is stored or logged by this implementation.
- Rate limiting is not implemented. If abuse becomes a problem, add a Cloudflare WAF rate-limiting rule for `/api/contact`.
