# Implementation Status

**Date:** 9 November 2026
**Scope:** Apply the Ink & Plum refinement of the Liquid Atlas direction, including the section-specific compositions, to the existing AayusX portfolio.

This document separates what is verified, what needs owner input, and what is deliberately absent. Nothing below is reported as working unless it was built or exercised in this pass.

## 1. Completed and verified

### Ink & Plum refinement (current)

- Replaced the lilac/electric-violet palette with warm bone paper, ink, aubergine chapters, and restrained rust accents. The signature purple remains as a wine-plum accent rather than the default Tailwind violet.
- Replaced Manrope with **Bricolage Grotesque** for display/headings. DM Sans remains body/UI and IBM Plex Mono remains technical metadata.
- Removed **LiquidText**, the SVG turbulence/displacement filter, and the animated gradient material. The opening and homepage now use solid display type.
- Replaced the circular glass lens and dashed orbital ring with a rectangular 4:5 portrait; removed the fixed dot-field background, sticky-header blur, purple radial glows, cover grid texture, contact rings, and the rotating/floating decorative animations.
- Flattened pill tags, status badges, filters, and language controls into plain text. Page labels are sentence case with a small clay dot; numbered section labels were removed.
- Rewrote the most visible page titles, labels, and supporting copy in plain language, reducing the “not X” constructions and em-dash density.
- Tuned Lenis from `lerp: 0.1` to `0.16`; removed the mascot’s permanent animation frame (it now starts on pointer movement and stops when settled) and its idle float/drop-shadow.
- Reduced the footer top gap and removed the double section padding on About.
- Added a layered route wipe: an ivory flash fades over clay and deep-plum panels, which sweep left with bright leading edges to reveal the new page. Transform-only, about 0.6s, and reduced-motion users get an instant swap.
- Verified: `npm run build`, 26/26 tests, 0 axe WCAG A/AA violations on Home, About, Journey, Projects, Experiments, Capabilities, Writing, Article, and Contact; no horizontal overflow at 320/390/1440px; headless wheel-scroll sample averaged 11.1ms per frame (p95 11.4ms, max 22.5ms, zero frames over 33ms).
- This section supersedes the Liquid Atlas visual bullets below; the opening drop/ripple and Changa remain.

### Liquid Atlas identity (historical)

- Replaced the warm paper/botanical palette with the Liquid Atlas system: lilac-white paper, electric violet, lavender, deep violet chapters, and a warm clay accent.
- Added **Changa**, an original Nepali kite mascot, as a lightweight SVG with a spring-following cursor, a dotted tether, hover/crest reactions, click response, and an off switch in the footer.
- Added a static Changa to the homepage lens and the footer so touch and reduced-motion visitors still meet the character.
- Added **LiquidText**: a solid accessible text layer plus an SVG-filtered gradient material. It is used on the homepage phrase and the opening wordmark. Mobile and reduced-motion modes disable the displacement and strengthen the solid layer.
- Replaced the memory slideshow with a Liquid Atlas opening: dark violet field, falling drop, expanding ripples, Changa, a liquid AayusX wordmark, visible skip/enter controls, first-visit storage, replay, and `inert` page content while open.
- Rebuilt the homepage hero around a circular glass lens portrait, Changa, a tide line, and the liquid phrase.
- Added the dark violet About band, the lens portrait and dark quote on About, a dark lead project cover and staggered gallery on Projects, and a deep-violet footer.
- Updated `theme-color`, the no-JS fallback, and the dark-footer contrast values.
- Verified the opening skip path, first-visit storage, reduced-motion static opening, mascot off/on persistence, hover/click reactions, coarse-pointer fallback, and the static footer/home Changa.
- Re-ran axe WCAG A/AA on Home, About, Journey, Projects, Contact, Article, Experiments, Capabilities, and Writing: **0 violations**. The remaining incomplete checks are contrast checks against gradients/pseudo-elements and video-caption checks that require owner-supplied tracks.
- Checked 320px, 390px, and 1440px layouts with no horizontal overflow.

### Section-specific Liquid Atlas compositions (historical)

- **Journey** now opens with a deep-violet chapter, a large year map, and a vertical milestone route with violet nodes. The milestone “what it changed” notes use a violet-soft surface. The year map was deduplicated and tested for WCAG large-text contrast.
- **Experiments** is a lab bento: one full-width violet physics card, a terminal/gesture row, and a diagram/memory row. The AI card carries a static, `aria-hidden` local-first architecture diagram (memory, journaling, reminders, tool calling) instead of an empty card.
- Added real poster frames to the two experiment videos, extracted from the supplied footage, so the cards do not appear as empty black rectangles before playback. The gesture poster is a cropped frame that excludes the demo’s debug overlay; the video still plays intact.
- **Capabilities** closes with a full-bleed dark technology wall using five columns of light tiles, so the authentic Simple Icons marks remain visible against the dark field. Proof links now have sized arrows instead of oversized default SVGs.
- **Writing** uses a deep-violet featured-story panel with a light archive rail; the index closes with the existing article note. **Article** pages use the same violet chapter for the header while leaving the prose on lilac-white paper.
- **Contact** uses a dark ripple hero and keeps the form, validation states, and direct contact details on the light surface.
- Fixed a 600px Capabilities grid bug that had placed the body copy in the 2rem number column.
- Verified all section compositions at 390px and 1440px with no horizontal overflow; re-ran axe on each page with **0 violations**.

### Typography (historical)

- Replaced the decorative serif direction with a sans-first system: Manrope for display and headings, DM Sans for body and interface text, IBM Plex Mono for technical labels, and Noto Sans Devanagari for Nepali.
- Raised the body scale to 17px base / 18px lead copy, with 1.7 body leading and 1.8 long-form leading.
- Set headlines to weights 600–700, removed thin display weights, and replaced the display italic with colour and weight emphasis.
- Reduced uppercase to short technical labels; removed it from navigation, long metadata, captions, and form labels.
- Raised metadata sizes to 12px or larger and increased tag/status/label legibility.
- Reduced the display cap to 6rem after visual review, eliminating the “I build” orphan at 1440px.
- Verified Manrope, DM Sans, IBM Plex Mono, and Noto Sans Devanagari load; Devanagari loads only on Nepali pages via unicode-range.
- Added a comparison lab at `docs/typography-comparison.html`; Combination A was selected.
- Re-ran axe on Home, Article, and Contact: 0 WCAG A/AA violations. Checked 320px, 390px, and 1440px with no horizontal overflow.

### Foundation and architecture

- Kept Vite + React 18 + TypeScript; no framework migration.
- Added a real application shell (`src/app/App.tsx`) and route tree (`src/app/routes.tsx`).
- Removed the obsolete dark implementation (`App.tsx`, `Sections.tsx`, `BootScreen.tsx`, `Cursor.tsx`, `projectsData.ts`, `index.css`).
- Centralised design tokens, base styles, layout, components, page styles, and intro styles under `src/styles/`.
- Production build passes (`tsc && vite build`).
- Non-home routes are code-split; the physics scene is a separate lazy chunk.

### Main website

- Home, About, Journey, Projects, Case Study, Experiments, Capabilities, Writing, Article, Contact, and 404 pages.
- Shared header, mobile menu with focus trap and scroll lock, footer, skip link, and route scroll/focus management.
- Editorial project list, filterable archive, typographic project covers, case-study pages, and real demo footage where supplied.
- Capabilities page with authentic Simple Icons marks and no invented proficiency scores.
- Writing index, Markdown article pages with GFM, related articles, and bilingual bodies.
- Experiments page with a bilingual terminal and an opt-in physics stage.
- Contact page with client validation, accessible errors, honeypot, optional Turnstile, and a mailto fallback.
- Liquid Atlas drop/ripple introduction: first-visit behaviour, skip, replay, returning-visitor storage, and a reduced-motion static variant.

### Internationalisation

- English (default) and Nepali resources in `src/i18n/`.
- Nepali at `/ne`; English unprefixed.
- Browser detection on first visit, manual preference persisted, language switching preserves the current page.
- `lang`, titles, descriptions, Open Graph locale, canonical URLs, and hreflang updated per route.
- Nepali typography uses Noto Sans Devanagari with a sans-first hierarchy; Latin display copy uses Bricolage Grotesque and body copy uses DM Sans.

### SEO and public files

- Per-route metadata and JSON-LD through `src/components/Seo.tsx`.
- Static Person and WebSite schema in `index.html`.
- Multilingual sitemap covering every route, `robots.txt`, `llms.txt`, and `humans.txt`.
- SPA redirects (`public/_redirects`) and security/cache headers (`public/_headers`).
- Removed Google Tag Manager and the old FAQ/service claims.

### Contact backend

- `functions/api/contact.ts` implements server-side validation, honeypot, time trap, optional Turnstile, Resend delivery, and an explicit `503` when delivery is not configured.
- The failure path was exercised in the browser; it shows the failure state and a pre-filled email fallback.
- The success path requires credentials and a Wrangler/Cloudflare runtime.

### Tests and verification

| Check | Result |
|---|---|
| `npm run build` | Passes; type-check clean |
| `npm test` | 26 tests across 4 files pass |
| Translation parity | English/Nepali keys and array lengths match |
| Content integrity | Bilingual case-study copy, valid statuses, https archive links, icon coverage |
| Article files | Both languages exist and are non-empty |
| Accessibility (axe, WCAG A/AA) | 0 violations on Home, About, Journey, Projects, Experiments, Capabilities, Writing, Article, and Contact |
| Scroll frame pacing (headless wheel sample) | 462 frames; average 11.1ms, p95 11.4ms, max 22.5ms; zero frames over 33ms |
| Mobile layout at 390px | No horizontal overflow; menu button visible; desktop nav hidden |
| Desktop layout at 1440px | Reviewed visually |
| Language switch | `/projects` → `/ne/projects` → `/projects`, with preserved page and translated content/metadata |
| Intro | Visible skip control; replays on every full page load; reduced-motion static variant verified |
| Reduced motion | Lenis is not created; intro shows all memories statically |
| Mobile menu | Opens as a dialog, closes on Escape, returns focus to the trigger |
| Terminal | Runs commands and renders translated output |
| Physics experiment | Loads only after the launch button; canvas mounts |
| 404 | Correct page, `noindex, nofollow` |
| Core Web Vitals (dev) | FCP ~172ms, LCP ~236ms, CLS 0.0074, TTFB ~6.4ms |

## 2. Partial — requires owner input

| Item | Current state |
|---|---|
| Contact email delivery | Endpoint implemented; needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` |
| Turnstile | Supported but not configured |
| Nepali copy | Authored in this project; should be reviewed by a native speaker |
| Project screenshots | No screenshots supplied; covers are typographic. Genuine demo videos are used, with poster frames extracted from the footage |
| Social preview image | `public/og.png` is still the previous dark identity |
| Personal imagery | One portrait (`public/me.png`, 1254×1254) exists; the site uses an optimized 1000px `public/me.jpg` (86 KB). No other photographs were invented |
| Social profiles | GitHub and Yugya are shown; other profiles were not verified |

## 3. Deliberately not implemented

- No CMS, database, or message storage.
- No résumé download or hiring request. The About page points visitors to the community, project collaboration, and working with Yugya instead.
- No testimonials, client logos, revenue, or invented metrics.
- No fake skill percentages or star ratings.
- No mandatory loading screen or intro that blocks access.
- No WebGL dependency for the main experience.
- No analytics or advertising; adding either requires a privacy decision.
- No production deployment, DNS change, or credential creation.

## 4. Known limitations

- The initial application chunk is about 523 kB (163 kB gzip). Route-level splitting keeps Markdown, icons, contact, and experiments out of the first load.
- The physics chunk is about 2.9 MB (991 kB gzip). It is loaded only after an explicit user action and is not part of the initial page.
- The bundle-size warning from Vite/Rolldown remains; further vendor splitting is possible but was not necessary for correctness.
- Project demo videos have no caption tracks or transcripts. The Gesture Solar, Memory Game, and case-study videos are flagged as incomplete by axe (WCAG 1.2.2) until captions or transcripts are supplied.
- `public/CNAME` and `public/.htaccess` are legacy GitHub Pages / Apache artifacts. They are inert on Cloudflare Pages.
- The original `public/me.png` (1.9 MB) is retained for the owner; the site serves the optimized `public/me.jpg` (86 KB).
- `docs/README.md` was missing from the original documentation set. It has been added as an index; the pre-existing documents were preserved.
- Typography is served by Google Fonts. The request is limited to the weights and axes in use, but self-hosting the woff2 subsets would remove the third-party request if privacy or performance demands it.
- Rate limiting is not implemented for `/api/contact`; a Cloudflare WAF rule is recommended before public launch.

## 5. Files added in this pass

Key additions:

- `src/app/App.tsx`, `src/app/routes.tsx`
- `src/pages/ContactPage.tsx`, `src/pages/ArticlePage.tsx`, `src/pages/ExperimentsPage.tsx`
- `src/features/mascot/Changa.tsx`, `src/features/mascot/MascotContext.tsx`, `src/components/MascotToggle.tsx`
- `src/components/LiquidText.tsx` (removed in the Ink & Plum pass)
- `src/styles/mascot.css`, `src/styles/liquid.css` (liquid styles removed)
- `functions/api/contact.ts`
- `src/styles/index.css`
- `docs/creative-concepts.html`
- `tests/validation.test.ts`, `tests/i18n.test.ts`, `tests/content.test.ts`, `tests/articles.test.ts`
- `vitest.config.ts`
- `public/_redirects`, `public/_headers`
- `public/media/gesture-solar-poster.jpg`, `public/media/memory-game-poster.jpg`
- `docs/CONTACT_SETUP.md`, `docs/DEPLOYMENT.md`, `docs/IMPLEMENTATION_STATUS.md`, `docs/README.md`
