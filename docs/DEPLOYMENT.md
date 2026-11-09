# Cloudflare Pages Deployment

The production target is Cloudflare Pages at `https://aayusx.dev`.

Deployment has **not** been performed from this pass. No DNS records, access policies, or production variables were changed.

## Build settings

| Setting | Value |
|---|---|
| Framework preset | None / Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Functions directory | `functions` (auto-detected) |
| Node version | 20 or newer |

`public/_redirects` contains the SPA fallback:

```text
/* /index.html 200
```

Cloudflare Pages Functions take precedence over static redirects, so `/api/contact` is handled by the Function rather than the fallback. `public/_headers` sets basic security and cache headers.

## Steps

1. Push the repository to GitHub.
2. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository and production branch (`main`).
4. Enter the build settings above.
5. Add environment variables from [CONTACT_SETUP.md](./CONTACT_SETUP.md).
6. Deploy once, then add the custom domain `aayusx.dev` under **Custom domains**.
7. Enable HTTPS (automatic with Cloudflare) and confirm the apex and `www` behaviour you want.

## Environment variables

Required for contact delivery:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

Optional:

- `TURNSTILE_SECRET_KEY` (runtime)
- `VITE_TURNSTILE_SITE_KEY` (build time)

## Local production checks

```bash
npm run build
npm run preview
```

`npm run preview` serves the static build but does not run Pages Functions. To test the contact endpoint:

```bash
npx wrangler pages dev dist
```

## Post-deployment verification

- [ ] Home, About, Journey, Projects, Experiments, Capabilities, Writing, Contact all load.
- [ ] `/ne` and every Nepali route load with `lang="ne"` and translated metadata.
- [ ] Direct visits to deep routes return the SPA (canonical URLs work).
- [ ] Project links and article routes work.
- [ ] Case-study demo videos play on request and do not autoplay.
- [ ] The physics experiment loads only after **Launch physics playground**.
- [ ] Language switching preserves the current page.
- [ ] Intro skip, replay, returning-visitor, and reduced-motion behaviour work.
- [ ] Contact form success path sends a real email; failure path shows the mailto fallback.
- [ ] `https://aayusx.dev/sitemap.xml`, `/robots.txt`, and `/llms.txt` resolve.
- [ ] Open Graph previews resolve to `https://aayusx.dev/og.png`.
- [ ] No console errors; Lighthouse checks reviewed.

## Known deployment notes

- The current `public/og.png` still carries the previous dark identity and should be replaced by the owner.
- `public/CNAME` and `public/.htaccess` are legacy GitHub Pages / Apache artifacts. They are inert on Cloudflare Pages and can be removed in a later cleanup.
- There is no analytics installed. If analytics are added, use a privacy-respecting option and update the footer statement.
