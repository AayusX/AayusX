# AayusX — Codebase Audit

**Date:** 8 November 2026  
**Auditor:** Implementation pass (read-only audit of the pre-existing repository)  
**Scope:** Repository structure, documentation, source code, assets, configuration, content accuracy, and readiness for the approved warm-editorial redesign.

---

## 1. Executive summary

The repository is a working Vite + React 18 + TypeScript single-page application. It is visually complete on its own terms — a dark “AAYUSX.SYS” laboratory interface with a boot screen, a Rapier physics hero, a terminal, an archive modal, and a custom cursor — but it does not implement the product defined in `docs/`.

Three findings dominate the work:

1. **The current visual and content direction directly conflicts with the approved direction.** The site is dark, neon-accented, uppercase, and system-lab themed. The approved product is warm, paper-like, editorial, and personal.
2. **Most required product capabilities do not exist:** no routing, no internationalisation, no Writing system, no contact backend, no case-study pages, no SEO per route, no tests, and no way to replay a personal introduction.
3. **Several public metadata claims are stronger than the verified source material** (for example “Full-Stack Developer & AI Engineer”, service offerings, a FAQ block, and “works remotely with clients worldwide”). These must be replaced with the honest positioning required by `docs/CONTENT_GUIDELINES.md`.

The existing code is nonetheless useful: project/venture facts, the Rapier physics scene, the terminal interaction, and the original portrait are all genuine, reusable material.

---

## 2. Repository state

| Area | Finding |
|---|---|
| Framework | Vite `^8.3.6`, React `^18.2.0`, TypeScript `^5.2.2` |
| Animation | `framer-motion ^13.5.1`, `lenis ^1.3.26` |
| 3D | `three ^0.164.0`, `@react-three/fiber ^8.16.2`, `@react-three/rapier ^1.3.1` |
| Unused dependency | `@react-three/drei ^9.105.6` — inspected source contains no Drei usage |
| Build tooling | `@vitejs/plugin-react ^4.2.1` declared, but installed `vite@8` is outside that plugin's peer range; installing new packages exposed an `ERESOLVE` failure. Resolved by upgrading the plugin to `^6.2.1`. |
| Routing | None. Single-page anchor navigation only. |
| i18n | None. All copy is hardcoded English. |
| Content system | One hand-written data file, `src/projectsData.ts`. |
| Styling | One 31 KB global stylesheet, `src/index.css`, with dark “lab” tokens. |
| Tests | None. `test/gemini-code-1794110634104.js` is an unrelated scratch file, not a test suite. |
| Git | Last commit `49b590a videos added`. Working tree contains uncommitted README/package changes and untracked `docs/`, `test/`. These were preserved. |
| Node | v24.21.0. `npm` PowerShell shim is blocked by execution policy; `npm.cmd` works. |
| Media tooling | `ffmpeg` is not available, so no video poster/transcode work was performed. |

### Public assets found

| Asset | Notes |
|---|---|
| `public/me.png` | The only authentic personal photograph. The working copy is 1254×1254; the site serves an optimized 1000px `public/me.jpg` (86 KB) plus small favicon assets. |
| `public/og.png` | Existing 1200×630 social image with the old dark branding. Now inconsistent with the new site; should be replaced by the owner. |
| `aama-pathshala.mp4` (root) | Genuine Mother School demo, 3.0 MB. Copied to `public/media/mother-school-demo.mp4`. |
| `gessture.mp4` (root) | Genuine Gesture Solar demo, 18.9 MB. Copied to `public/media/gesture-solar-demo.mp4`, lazy/user-initiated only. |
| `magical-memory-game.mp4` (root) | Short demo, 184 KB. Copied to `public/media/memory-game-demo.mp4`; no matching project record, so not surfaced as a project. |
| `portfolio.mp4` (root) | Existing site demo, 1.2 MB. Copied to `public/media/portfolio-demo.mp4`; not used as project evidence. |
| `public/CNAME`, `.htaccess`, `humans.txt`, `llms.txt` | GitHub Pages-era artifacts referencing the old dark/WebGL identity. Replaced/removed where inaccurate. |
| `public/robots.txt`, `sitemap.xml` | Present but sitemap contains only `/`; rebuilt for all routes and both languages. |

### Documentation found

Ten documents were read in full: `PRD.md`, `TECHNICAL_SPECIFICATION.md`, `DESIGN_SYSTEM.md`, `IMPLEMENTATION_PLAN.md`, `CONTENT_GUIDELINES.md`, `PROJECT_STRUCTURE.md`, `ASSET_GUIDELINES.md`, `ACCESSIBILITY.md`, `SEO_AND_METADATA.md`, `TESTING_AND_QUALITY_ASSURANCE.md`.

The documents are internally consistent about direction, but deliberately leave several decisions open: exact palette values, final fonts, logo assets, personal photographs, résumé, and Nepali content. Those gaps are handled in this implementation as documented limitations, not invented facts.

---

## 3. What exists today (verified source)

### `src/App.tsx`
- Boot gate with a 4-second `BootScreen`, scroll locked until completion.
- WebGL capability check that replaces the entire site with a project list if WebGL is missing.
- Lazy-loaded Rapier physics canvas fixed behind the page.
- Single-page sections: Nav, Hero, Marquee, Manifesto, Evidence, Ventures, StackWall, Terminal, Contact, Footer.
- Archive modal with status filters.
- Custom cursor, progress rail, Konami easter egg, toast.
- Error boundary styled for the old dark theme.

### `src/components/`
- `Sections.tsx` (30.8 KB): all page sections and shared `Reveal` helper.
- `PhysicsScene.tsx`: three physics blocks labelled Mother School / Loan Management / FailFirst. Self-contained, local procedural textures/environment, no network assets.
- `Terminal.tsx`: interactive command shell with command history.
- `BootScreen.tsx`, `Cursor.tsx`: old experience chrome.

### Content accuracy review

| Claim in current site | Status | Action |
|---|---|---|
| “Full-Stack Developer & AI Engineer” | Overstated relative to `docs/` | Reposition as technology entrepreneur / Computer Engineering student who builds useful software |
| “works remotely with clients worldwide” | Not supported by repository evidence | Remove |
| Service list and “available for internships & co-founder roles” | Not documented as current offer | Replace with an honest “what I’m open to” statement or omit |
| FAQ schema and visible FAQ | Invented marketing structure | Remove |
| 200+ students, 50+ teachers, 60+ challenges, 30+ club members, 80 hackathon participants, 12 club projects | Present in `src/projectsData.ts` as documented facts | Retain where used, attributed to the project/period; no new metrics added |
| Yugya metrics (“200+ domains”, “99.9% uptime”) | Present in data but not independently verifiable | Retained only in the venture description without the unverifiable uptime claim |
| “19 shipped projects” | Counts include archived/iterating work | Removed; use accurate status labels |
| Personal email and phone | Publicly present | Email retained; phone/WhatsApp removed from primary UI to reduce exposure (owner can restore) |
| “Kathmandu” | Plausible but not confirmed by docs | Use “Nepal · working remotely”; school location Badganga, Kapilvastu retained where documented |

### Technical risks found

1. **Boot screen blocks content for 4 seconds.** Contradicts “users must never be forced to wait”.
2. **WebGL absence removes the entire portfolio.** Contradicts progressive enhancement.
3. **Custom cursor and Konami filter** add motion/accessibility risk without product value.
4. **No route-level metadata**; `index.html` carries one page's metadata and schema for all URLs.
5. **GTM loads before consent/decision** and is not part of the approved scope. Removed.
6. **`@react-three/drei` unused**, adding install weight. Left installed to avoid unrelated churn; noted for removal.
7. **Large media is not lazy**: videos live at repository root, outside `public/`, and were previously not deployed.
8. **No canonical language strategy or hreflang**, despite a bilingual requirement.
9. **No server-side validation**; the old contact form used a third-party endpoint pattern in `Sections.tsx` and had no spam protection contract.
10. **No test runner**; no way to verify translation parity or validation logic.

---

## 4. Reusable material

| Reused | How |
|---|---|
| Project/venture facts | Migrated into typed content modules; descriptions rewritten, not copied wholesale; no new facts added |
| `public/me.png` | Original portrait; the site serves the optimized `public/me.jpg` in the editorial portrait and purple-treated intro frame |
| Root demo videos | Copied into `public/media`; user-initiated playback only |
| Rapier physics scene | Rebuilt as an on-demand Experiments stage, lazy-loaded, desktop-only, with a static fallback |
| Terminal concept | Rebuilt as a bilingual, keyboard-accessible experiment with reduced command surface |
| Framer Motion / Lenis | Retained, but gated on `prefers-reduced-motion` |
| Existing logo-free wordmark | Replaced by a typographic AayusX wordmark (no supplied logo asset existed) |

**Not reused:** boot screen, custom cursor, marquee, Konami easter egg, old dark stylesheet, archive modal, old metadata/schema, GTM, `.htaccess`/CNAME GitHub Pages config.

---

## 5. Decisions taken for this implementation

| Decision | Rationale |
|---|---|
| Keep Vite + React + TypeScript | Explicit requirement; no framework migration |
| `react-router-dom` v7 | Needed for case studies, articles, per-route metadata, language-prefixed URLs |
| `i18next` + `react-i18next` | Mature, Vite-compatible, supports nested resources, interpolation, and language switching while preserving the route |
| English unprefixed, Nepali under `/ne` | Readable canonical URLs, first-class hreflang, no duplicate default-language prefix |
| Typed translation resources (`ne` checked against `en`) | Compile-time parity; avoids silent missing translations |
| `react-markdown` + `remark-gfm` | Safe local Markdown rendering without `dangerouslySetInnerHTML`; standard remark ecosystem |
| `simple-icons` | Authentic, official-style brand SVG paths for technology logos; no AI-drawn approximations |
| Cloudflare Pages Function for contact | Server-side validation, honeypot/time trap, optional Turnstile, secrets kept off client; no database |
| Custom metadata hook | No extra head-management dependency; route-level title, description, canonical, hreflang, OG, JSON-LD |
| Vitest for unit tests | Already compatible with Vite; tests validation, translation parity, content integrity |
| No fake screenshots or photos | Project covers are explicit typographic compositions; real video is used only where the mapping is certain |

---

## 6. Gaps and missing owner inputs

These cannot be completed without the owner and are reported rather than fabricated:

1. **Personal photographs for the memory sequence.** Only one portrait exists. The intro uses that portrait plus typographic memories; it does not pretend other images exist.
2. **Project screenshots.** No screenshots were supplied. Two genuine demo videos are used on case-study pages; remaining covers are typographic.
3. **Logo SVG / animated GIF.** No logo asset exists. A typographic wordmark and provisional favicon are used.
4. **Résumé PDF.** Not present, and no longer requested. The About page now points to the contact page for joining the community, collaborating on a project, or working with Yugya.
5. **Contact delivery credentials.** No email-provider account/key supplied. The Function is implemented and documented; production delivery requires `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and a verified `CONTACT_FROM_EMAIL`.
6. **Nepali review by a native speaker.** All Nepali copy is authored in this pass; it should be reviewed for tone and regional preference.
7. **Social profile verification.** GitHub and Yugya links are carried over from existing data. Facebook/WhatsApp are not presented as primary contact.
8. **OG image refresh.** `public/og.png` still carries the old dark identity.
9. **Analytics decision.** Removed GTM; no analytics installed. If required, add a privacy-respecting tool with consent.

---

## 7. Recommended target implementation (and what was built)

The implemented architecture follows `docs/PROJECT_STRUCTURE.md` without creating empty scaffolding:

```text
src/
  app/            providers, layout, routing
  components/     ui, layout, navigation, media, feedback primitives
  features/       memory-intro, language-switcher, contact-form
  content/        projects, journey, capabilities, writing metadata
  i18n/           en.ts, ne.ts, initialisation, typed helpers
  lib/            seo, validation, formatting
  pages/          Home, About, Journey, Projects, CaseStudy, Experiments,
                  Capabilities, Writing, Article, Contact, NotFound
  styles/         tokens, base, layout, components, page styles
  assets/         technology logos (via simple-icons) and favicon
functions/api/contact.ts   Cloudflare Pages Function
tests/                     unit tests (Vitest)
public/                    media, robots, sitemap, redirects, headers
```

Key non-functional targets applied:

- Content is readable before any animation; the intro is dismissible from its first frame and never unmounts the site.
- Reduced motion disables Lenis, intro auto-play, parallax, and transforms.
- All routes render even without WebGL; the physics experiment is opt-in.
- Keyboard focus is visible; skip link is the first focusable element; mobile menu traps focus and restores it.
- Language switch preserves the current page and query, writes the manual preference, and updates `lang`, metadata, and hreflang.
- Sitemap covers all static routes in both languages; canonical URLs follow the prefix strategy.
- No unverified personal achievement or client claim was introduced.

---

## 8. Verification plan

| Check | Tool |
|---|---|
| Types and build | `npm.cmd run build` |
| Unit tests | `npm.cmd run test` (validation, i18n parity, content integrity) |
| Route smoke test | `npm.cmd run dev` + manual navigation in both languages |
| Responsive | 360, 390, 768, 1024, 1280, 1440, 1920 widths |
| Keyboard | Tab order, skip link, menu, filters, form, intro skip/replay |
| Reduced motion | OS setting + DevTools emulation |
| Contact endpoint | `npx wrangler pages dev dist` with test env values (not run without credentials) |
| Lighthouse | Local production preview; results depend on owner-supplied images |

---

## 9. Conclusion

The repository is a strong prototype of a different product. The redesign keeps its genuine assets and evidence, discards its dark lab theatre, and builds the warm editorial, bilingual, routed portfolio described in `docs/`. All remaining gaps are explicit owner inputs, not hidden inventions.

---

## 10. Post-implementation update — 8 November 2026

The implementation pass resumed after the initial audit. The old dark layer described in sections 3 and 4 has been removed, and the target architecture in section 7 is now mounted and verified.

| Area | Verified result |
|---|---|
| Routing | `/` and `/ne` share one page tree; deep links, case studies, articles, and 404 work |
| Build | `npm run build` passes (`tsc && vite build`) |
| Tests | `npm test` passes 26 tests across validation, i18n parity, content integrity, and article files |
| Accessibility | axe WCAG A/AA: 0 violations on Home, Contact, and Experiments |
| Responsive | No horizontal overflow at 390px; desktop reviewed at 1440px |
| Motion | Intro skip/replay/reduced-motion verified; Lenis is not created under reduced motion |
| Language | Switching preserves the page; `lang`, metadata, and hreflang update correctly |
| Contact UI | Validation and failure fallback verified in-browser |
| Contact delivery | Implemented in `functions/api/contact.ts`; success requires owner credentials |
| Physics | Lazy chunk mounts only after the launch control |
| Performance (dev) | FCP ~172ms, LCP ~236ms, CLS 0.0074, TTFB ~6.4ms |

Remaining gaps are recorded in `docs/IMPLEMENTATION_STATUS.md`. In particular, the contact success path, Nepali review, project screenshots, and refreshed Open Graph image still need owner input. Deployment was not performed.
