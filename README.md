# AayusX

Personal portfolio of **Aayush Bhandari (AayusX)** — a Computer Engineering student and technology entrepreneur in Nepal.

The current direction is **Ink & Plum**: warm bone paper, ink and aubergine chapters, rust accents, Bricolage Grotesque display type, a rectangular portrait, a restrained Changa cursor, English and Nepali routes, project case studies, essays, clearly labelled experiments, and a server-validated contact form.

## Stack

- Vite 8, React 18, TypeScript
- Bricolage Grotesque display, DM Sans body/UI, IBM Plex Mono labels, Noto Sans Devanagari for Nepali
- Changa SVG mascot with cursor tether; no gradient or SVG-filtered display type
- React Router 7
- i18next + react-i18next (English default, Nepali under `/ne`)
- Framer Motion and Lenis, both gated on reduced-motion preferences
- Three.js / React Three Fiber / Rapier, loaded only when the physics experiment is launched
- React Markdown + remark-gfm for local essays
- Simple Icons for authentic technology marks
- Cloudflare Pages + a Pages Function for contact delivery

## Quick start

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check (`tsc`) and create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Type-check without emitting |
| `npm test` | Run the Vitest suite |
| `npm run test:watch` | Run Vitest in watch mode |

## Project structure

```text
src/
  app/            application shell and route tree
  components/     layout, navigation, media, and UI primitives
  content/        projects, articles, technology marks, schemas
  features/       cinematic memory introduction
  i18n/           English and Nepali resources, bootstrap, locale helpers
  lib/            validation, focus management, scrolling, formatting, WebGL
  pages/          Home, About, Journey, Projects, CaseStudy, Experiments,
                  Capabilities, Writing, Article, Contact, NotFound
  styles/         tokens, base, layout, components, pages, intro
functions/api/    Cloudflare Pages contact endpoint
tests/            Vitest unit tests
public/           media, redirects, headers, sitemap, robots
docs/             product, design, technical, and status documentation
```

## Contact form

The form validates on the client and posts to `POST /api/contact`, implemented in `functions/api/contact.ts`. It uses server-side validation, a honeypot, a time trap, optional Turnstile, and Resend for delivery. Credentials are never exposed to the browser.

See [docs/CONTACT_SETUP.md](docs/CONTACT_SETUP.md) for environment variables and local testing. Until credentials are configured, the UI correctly shows the failure state and offers a pre-filled email fallback.

## Deployment

The production target is Cloudflare Pages with the canonical domain `https://aayusx.dev`.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). Deployment has **not** been performed from this development pass.

## Implementation status

Completed, partially completed, and intentionally omitted features are recorded in [docs/IMPLEMENTATION_STATUS.md](docs/IMPLEMENTATION_STATUS.md).

## Documentation

The full documentation index is in [docs/README.md](docs/README.md). Start with the audit, then the product and design documents.

## Content rules

- No invented experience, clients, revenue, testimonials, or metrics.
- Experiments are labelled as experiments.
- Project covers are typographic when no authentic screenshot exists.
- Technology marks come from Simple Icons and keep their official colours.
