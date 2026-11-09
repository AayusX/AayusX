# AayusX Portfolio — Technical Specification

**Document:** `docs/TECHNICAL_SPECIFICATION.md`  
**Status:** Initial Draft — Pending Full Source Audit  
**Version:** 1.0

---

## 1. Purpose

This document defines the technical architecture and implementation standards for the AayusX personal portfolio.

It translates the requirements in `PRD.md` into practical technical decisions.

The implementation must prioritize:

1. Performance and reliability.
2. Maintainable, understandable architecture.
3. High-quality visual execution.
4. Accessibility and responsive behavior.
5. Meaningful interactions instead of unnecessary complexity.
6. Future extensibility without premature overengineering.

## 2. Existing Repository Audit

### 2.1 Verified technology stack

The repository currently contains:

| Technology | Verified version / configuration |
|---|---|
| React | 18.2.0 |
| React DOM | 18.2.0 |
| Vite | 5.2.0 |
| TypeScript | 5.2.2 |
| Three.js | 0.164.0 |
| React Three Fiber | 8.16.2 |
| React Three Drei | 9.105.6 |
| React Three Rapier | 1.3.1 |
| Framer Motion | 13.1.1 |
| Lenis | 1.3.26 |

The project uses:

- Vite for development and production builds.
- TypeScript with strict mode enabled.
- React with the automatic JSX runtime.
- ES modules.
- A manual Rollup chunk for Three.js-related dependencies.

### 2.2 Existing scripts

The current package configuration includes:

- `npm run dev`
- `npm run build`
- `npm run preview`

The production build runs TypeScript checking before Vite builds the application.

### 2.3 Initial observations

The existing project already has a foundation for interactive 3D experiences.

However, the following areas still require a full source audit:

- Existing component hierarchy.
- Current routing strategy.
- Styling architecture.
- Existing animation implementation.
- Existing 3D scenes and assets.
- Current image and font optimization.
- Existing content structure.
- Deployment configuration.
- Existing tests and accessibility coverage.

**Rule:** Do not replace working architecture or remove existing features until their purpose and dependencies have been understood.

## 3. Technology Stack

### 3.1 Frontend

**Recommended foundation:**

- React
- TypeScript
- Vite

Retain the existing stack unless the source audit reveals a concrete technical reason to change it.

A migration to Next.js is not currently justified simply because the portfolio needs to be dynamic, creative or SEO-friendly.

### 3.2 Styling

The final styling solution must be selected after inspecting the existing stylesheets.

Requirements:

- Centralized design tokens.
- Reusable layout patterns.
- Responsive design.
- Consistent typography.
- Maintainable component styles.
- No unnecessary CSS framework dependencies.

### 3.3 Animation

Existing dependency: Framer Motion.

Use it for:

- Section transitions.
- Navigation interactions.
- Project reveals.
- Micro-interactions.
- Selected storytelling animations.

Animation must remain purposeful and performance-conscious.

### 3.4 Smooth scrolling

Existing dependency: Lenis.

Use smooth scrolling only if testing demonstrates that it improves the experience.

Requirements:

- Preserve native navigation behavior.
- Respect reduced-motion preferences.
- Avoid interfering with keyboard navigation.
- Avoid excessive scroll hijacking.
- Ensure mobile scrolling remains responsive.

### 3.5 3D rendering

Existing dependencies:

- Three.js
- React Three Fiber
- Drei
- Rapier

Use 3D selectively for experiences where it adds meaningful value.

Requirements:

- Lazy-load heavy 3D scenes.
- Avoid loading large scenes on initial page render.
- Provide static alternatives for unsupported or low-performance devices.
- Reduce complexity on mobile.
- Avoid unnecessary physics simulation.
- Optimize geometry, materials, textures and lighting.
- Dispose of resources correctly.

## 4. Application Architecture

The application should use a modular component architecture.

Recommended logical organization:

```text
src/
├── app/
│   ├── App.tsx
│   └── providers/
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── ui/
│   └── shared/
│
├── sections/
│   ├── home/
│   ├── about/
│   ├── journey/
│   ├── projects/
│   ├── experiments/
│   ├── capabilities/
│   ├── writing/
│   └── contact/
│
├── features/
│   ├── memory-intro/
│   ├── language-switcher/
│   ├── project-gallery/
│   └── contact-form/
│
├── scenes/
│   └── 3d/
│
├── content/
│   ├── projects/
│   ├── experiments/
│   ├── journey/
│   └── writing/
│
├── i18n/
│
├── hooks/
├── lib/
├── styles/
├── types/
└── assets/
```

This is a proposed logical structure, not a description of the existing source tree.

The final directory structure must be reconciled with the actual repository before implementation.

## 5. Design System Architecture

Create a centralized design system.

### 5.1 Visual foundations

The main portfolio uses:

- Warm ivory and paper-inspired backgrounds.
- Dark ink typography.
- Restrained botanical green.
- Clay-inspired accent colors.
- Editorial serif headlines.
- Readable sans-serif body typography.

The cinematic memory introduction remains a separate purple visual chapter.

### 5.2 Design tokens

Centralize:

- Color palette.
- Typography.
- Font weights.
- Spacing.
- Layout widths.
- Border radii.
- Shadows.
- Breakpoints.
- Animation durations.
- Z-index layers.

Avoid hardcoding repeated visual values across unrelated components.

### 5.3 Technology logos

Technology logos must use authentic brand assets.

Requirements:

- Prefer official SVG assets or trustworthy brand resources.
- Preserve original brand colors.
- Maintain correct proportions.
- Use consistent visual sizing.
- Provide accessible labels.
- Optimize assets without reducing visual sharpness.
- Never generate approximate replacement logos.

## 6. Cinematic Introduction

The memory introduction should be implemented as an independent feature.

Requirements:

- Support first-visit presentation.
- Provide an immediately visible skip control.
- Allow replay.
- Respect reduced-motion settings.
- Avoid blocking access to the main portfolio.
- Keep heavy assets from delaying the primary page.
- Provide a graceful fallback if animation or media fails.

The introduction must not become a mandatory loading screen.

## 7. Internationalization (i18n)

### 7.1 Supported languages

- English — default fallback.
- Nepali — additional language.

### 7.2 Architecture

Use centralized translation resources.

All user-facing text must be translatable, including:

- Navigation.
- Section headings.
- Buttons.
- Forms.
- Project descriptions.
- Experiment descriptions.
- Journey content.
- Writing metadata.
- SEO metadata.
- Accessibility labels.

Avoid embedding important user-facing strings directly inside components.

### 7.3 Language selection

Implement the agreed language-selection behavior:

1. Detect the browser's preferred language on the first visit.
2. Use Nepali when the browser preference supports Nepali.
3. Otherwise use English.
4. Respect manually selected language preferences on subsequent visits.
5. Provide a visible language switcher.
6. Preserve the current page or section when switching languages.

### 7.4 Nepali typography

Verify proper Nepali Unicode rendering, line height, font coverage and text wrapping.

Do not assume that English typography settings will work correctly for Nepali.

### 7.5 SEO

Provide appropriate language metadata and multilingual indexing support.

The exact URL strategy and translation library remain pending architecture validation.

## 8. Content Architecture

Content should initially remain local and Git-managed.

### 8.1 Projects

Each project should support:

- Title.
- Short description.
- Detailed description.
- Category.
- Technologies.
- Role and contribution.
- Cover image.
- Additional screenshots or media.
- Project status.
- Relevant external links.
- Optional case study.

### 8.2 Experiments

Experiments should support:

- Title.
- Description.
- Experiment category.
- Technologies.
- Visual media.
- Current status.
- Technical notes.
- Relevant demonstrations.

Experimental work must not be presented as a finished commercial product.

### 8.3 Journey

Journey entries should support:

- Milestone title.
- Date, when verified.
- Description.
- Relevant project or experience.
- Supporting media.

Never invent achievements or dates.

### 8.4 Writing

Use local Markdown or MDX initially.

Support:

- Dedicated article pages.
- Categories and tags.
- Publication dates.
- Reading-friendly typography.
- SEO metadata.
- Custom components when genuinely useful.

Keep the architecture suitable for a future CMS without implementing one prematurely.

## 9. Contact Form

The website requires a functional contact form.

### 9.1 Fields

- Name.
- Email.
- Subject.
- Message.

### 9.2 Submission behavior

1. Validate required fields.
2. Validate email format.
3. Apply basic spam protection.
4. Submit through a secure server-side endpoint.
5. Deliver enquiries to the configured professional email.
6. Display clear success or failure feedback.

### 9.3 Security

- Never expose private API keys in frontend code.
- Use environment variables for secrets.
- Validate submissions server-side.
- Avoid unnecessary personal-data collection.
- Protect against spam and abuse.

The email delivery provider and server-side implementation remain undecided.

## 10. SEO Architecture

Implement:

- Unique page titles.
- Meaningful meta descriptions.
- Canonical URLs.
- XML sitemap.
- Robots directives.
- Open Graph metadata.
- Social sharing previews.
- Structured data.
- Semantic HTML.
- Search-engine-friendly rendering.
- Internal links.
- Image alternative text.
- English and Nepali language metadata.

Structured data should accurately represent the person, website and relevant projects.

Never include inaccurate professional titles, achievements or business claims.

## 11. Analytics and Privacy

Use privacy-conscious analytics.

Requirements:

- Collect only necessary information.
- Avoid invasive tracking.
- Avoid unnecessary cookies.
- Do not expose personal information in analytics.
- Protect contact-form submissions.
- Provide a clear privacy notice.

The analytics provider remains undecided.

## 12. Hosting and Deployment

### 12.1 Preferred platform

Cloudflare Pages is the preferred hosting platform.

The existing Vite application is compatible with a static deployment model.

### 12.2 Deployment requirements

- Connect the GitHub repository.
- Build automatically from the production branch.
- Generate preview deployments for pull requests.
- Configure `aayusx.dev`.
- Enable HTTPS.
- Configure environment variables where required.
- Verify redirects and SPA fallback behavior.
- Keep deployment configuration documented.

### 12.3 Backend compatibility

If server-side contact functionality is required, evaluate Cloudflare Pages Functions or an appropriate Cloudflare Worker.

Do not introduce a separate backend server unless a real requirement justifies it.

## 13. Performance Engineering

Performance is a primary architectural requirement.

### 13.1 Initial loading

- Minimize initial JavaScript.
- Lazy-load nonessential features.
- Optimize images.
- Avoid loading 3D scenes immediately.
- Minimize font requests.
- Prevent layout shifts.
- Avoid unnecessary dependencies.

### 13.2 Responsive performance

Provide adaptive experiences:

- Desktop: richer visual interactions.
- Tablet: balanced visual complexity.
- Mobile: simplified, touch-friendly interactions.

3D and animation complexity should respond to device capabilities.

### 13.3 Code splitting

Separate heavy features such as:

- 3D scenes.
- Cinematic introduction assets.
- Large project media.
- Nonessential interactive components.

Load them only when appropriate.

## 14. Accessibility

Implement:

- Semantic HTML.
- Keyboard-accessible navigation.
- Visible focus states.
- Proper form labels.
- Descriptive image alternative text.
- Sufficient color contrast.
- Reduced-motion support.
- Accessible interactive controls.
- Responsive layouts.
- Touch-friendly targets.

Accessibility must be considered during component design, not added at the end.

## 15. Testing Strategy

Use both automated and manual testing.

### 15.1 Automated

- TypeScript checks.
- Production build checks.
- Unit tests for important logic.
- Integration tests.
- Browser automation for primary journeys.

### 15.2 Manual

Test:

- Desktop layouts.
- Tablet layouts.
- Mobile layouts.
- Navigation.
- Cinematic introduction.
- Language switching.
- Project interactions.
- Contact form.
- Keyboard navigation.
- Reduced-motion behavior.

No critical errors or broken primary journeys should remain before production deployment.

## 16. Performance Auditing

Use Google Lighthouse.

Run audits for:

- Performance.
- Accessibility.
- Best Practices.
- SEO.

Test both desktop and mobile.

Document significant regressions and investigate them before release.

## 17. Technical Decisions Still Pending

The following must not be treated as finalized until the relevant audit or prototype is complete:

| Decision | Current status |
|---|---|
| Existing source architecture | Pending full audit |
| Routing strategy | Pending audit |
| Styling solution | Pending audit |
| i18n library | Pending evaluation |
| 3D scene architecture | Pending prototype |
| Contact email provider | Undecided |
| Analytics provider | Undecided |
| Automated testing tools | Pending evaluation |
| Final content schema | Pending implementation design |

## 18. Implementation Principles

Every implementation decision should follow these principles:

1. Prefer proven solutions over unnecessary complexity.
2. Preserve working code when possible.
3. Avoid adding dependencies without a clear benefit.
4. Keep components modular and maintainable.
5. Optimize before adding heavy visual features.
6. Make accessibility part of the implementation.
7. Keep content separate from presentation.
8. Test on real mobile-sized viewports.
9. Never fabricate content or technical capabilities.
10. Document important architectural decisions.

## 19. Completion Criteria

The technical specification is ready for implementation when:

- The complete source repository has been audited.
- The proposed architecture matches actual project needs.
- Dependencies and major technical decisions are justified.
- The design system architecture is defined.
- The i18n strategy is established.
- The 3D and animation strategies are validated.
- Contact delivery architecture is established.
- Deployment compatibility is verified.
- Testing and performance requirements are actionable.

---

**Document status:** Initial draft. Complete the source-code audit and resolve pending decisions before treating this specification as final.