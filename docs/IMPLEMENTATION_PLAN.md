

# AayusX Implementation Plan

**File:** `docs/IMPLEMENTATION_PLAN.md`  
**Project:** AayusX Personal Portfolio  
**Status:** Proposed implementation roadmap  
**Approach:** Audit → Design → Prototype → Build → Validate → Deploy

---

## 1. Purpose

This document defines how the AayusX redesign will be implemented.

It converts the requirements in the following documents into an ordered development plan:

- `docs/PRD.md`
- `docs/TECHNICAL_SPECIFICATION.md`
- `docs/DESIGN_SYSTEM.md`

The goal is to build a distinctive, high-quality personal technology portfolio without sacrificing performance, accessibility, maintainability, or authenticity.

This is a phased plan, not permission to immediately rebuild everything.

Each phase must be inspected, implemented, tested, and reviewed before moving to the next major phase.

---

## 2. Implementation Principles

Every development decision must follow these principles.

### 2.1 Audit Before Changing

- Inspect the existing source code.
- Understand the current application architecture.
- Identify reusable components and assets.
- Review existing dependencies.
- Identify technical debt.
- Preserve working functionality unless there is a justified reason to change it.

Do not assume the repository structure matches the proposed documentation.

### 2.2 Design Before Implementation

- Establish visual direction.
- Validate typography and colors.
- Prototype important layouts.
- Test interaction concepts.
- Review mobile behavior.
- Approve the visual direction before extensive implementation.

### 2.3 Build Incrementally

- Implement one logical feature at a time.
- Keep components modular.
- Avoid unnecessary dependencies.
- Test after meaningful changes.
- Keep the production build functional throughout development.

### 2.4 Maintain Authenticity

- Do not invent projects, testimonials, achievements, statistics, or experience.
- Use real project screenshots and actual functionality.
- Use authentic technology logos.
- Keep experimental work clearly labeled.
- Avoid generic AI-generated content and design patterns.

### 2.5 Performance First

- Optimize images and fonts.
- Keep JavaScript usage controlled.
- Lazy-load noncritical assets.
- Avoid unnecessary 3D rendering.
- Maintain smooth interactions on mobile devices.
- Never sacrifice basic usability for visual effects.

---

## 3. Phase Overview

| Phase | Name | Priority |
|---|---|---|
| 0 | Codebase Audit | Critical |
| 1 | Design Research and Direction | Critical |
| 2 | Visual Prototyping | Critical |
| 3 | Foundation and Design System | Critical |
| 4 | Cinematic Memory Introduction | High |
| 5 | Main Website and Navigation | Critical |
| 6 | Portfolio Sections | Critical |
| 7 | Internationalization | High |
| 8 | Writing and Case Studies | High |
| 9 | Contact and Backend | High |
| 10 | SEO, Privacy and Analytics | High |
| 11 | Responsive and Accessibility Refinement | Critical |
| 12 | Testing and Optimization | Critical |
| 13 | Deployment and Launch | Critical |

---

# Phase 0 — Existing Codebase Audit

**Priority:** Critical  
**Goal:** Understand the current application before making architectural or visual changes.

### Tasks

#### 0.1 Repository Inspection

- Inspect the complete repository structure.
- Identify application entry points.
- Inspect all major pages and components.
- Review existing assets and fonts.
- Review stylesheets and design tokens.
- Inspect routing, if present.
- Inspect current build and deployment configuration.

#### 0.2 Technology Audit

Verify:

- Framework and version.
- React and TypeScript versions.
- Build tooling.
- Styling approach.
- Animation libraries.
- 3D dependencies.
- Routing approach.
- Internationalization dependencies.
- Testing tools.

Do not replace dependencies without identifying an actual problem.

#### 0.3 Quality Audit

Inspect:

- Code quality.
- Component reuse.
- Responsive behavior.
- Accessibility.
- Performance.
- SEO metadata.
- Image optimization.
- Existing bugs.
- Console errors.

#### 0.4 Asset Audit

Identify:

- Existing logo files.
- Animated logo GIF.
- Selected color palette reference.
- Personal photographs.
- Project screenshots.
- Technology logos.
- Existing 3D assets.
- Fonts and illustrations.

#### Deliverables

- `docs/audits/CODEBASE_AUDIT.md`
- Current architecture overview.
- Reusable component inventory.
- Asset inventory.
- Technical debt list.
- Recommended changes.

### Completion Criteria

- [ ] Existing architecture is understood.
- [ ] Important functionality is documented.
- [ ] Existing assets are identified.
- [ ] Technical risks are recorded.
- [ ] Rebuild versus selective improvement decision is documented.

**Do not begin destructive refactoring before this phase is reviewed.**

---

# Phase 1 — Design Research and Direction

**Priority:** Critical  
**Goal:** Establish a consistent visual direction before implementation.

### Tasks

#### 1.1 Reference Analysis

Study selected visual references for:

- Editorial layouts.
- Typography.
- Navigation.
- Project presentations.
- Interactive storytelling.
- Cinematic transitions.
- Mobile experiences.

References should inspire original design decisions, not be copied directly.

#### 1.2 Brand Asset Review

- Inspect the selected AayusX palette.
- Inspect the animated logo.
- Review logo proportions and variants.
- Identify suitable technology logo sources.
- Review available personal and project photography.

#### 1.3 Visual Direction

Validate:

- Warm ivory and paper surfaces.
- Dark ink typography.
- Botanical green and clay accents.
- Editorial serif and readable sans-serif pairing.
- Asymmetric layout direction.
- Section-specific visual identities.

#### 1.4 Typography Validation

Test the selected fonts with:

- Large English headlines.
- Long paragraphs.
- Navigation labels.
- Technical content.
- Nepali translations.

### Deliverables

- Confirmed visual references.
- Approved palette.
- Typography selection.
- Logo usage direction.
- Initial visual moodboard.

### Completion Criteria

- [ ] Visual direction is approved.
- [ ] Palette is grounded in the selected reference.
- [ ] Typography works in English and Nepali.
- [ ] Logo assets are inspected.
- [ ] No major visual decisions remain based on guesses.

---

# Phase 2 — Visual Prototyping

**Priority:** Critical  
**Goal:** Validate the most important experiences before full development.

### 2.1 Homepage Prototype

Prototype:

- Hero composition.
- Main headline.
- Personal introduction.
- Primary navigation.
- Initial project presentation.
- Transition into the rest of the site.

### 2.2 Cinematic Introduction Prototype

Prototype:

- Memory image composition.
- Purple/lavender visual treatment.
- Slideshow behavior.
- Image transitions.
- Acceleration sequence.
- Final reveal.
- Skip and replay controls.

### 2.3 Navigation Prototype

Prototype:

- Main menu.
- Active section indication.
- Navigation transitions.
- Mobile navigation.
- Language switcher.

### 2.4 Project Presentation Prototype

Prototype:

- Editorial project gallery.
- Project previews.
- Filtering and categories.
- Expandable project information.
- Case-study navigation.

### 2.5 Responsive Prototype

Review the main concepts at:

- Desktop.
- Tablet.
- Mobile.

### Deliverables

- Homepage prototype.
- Cinematic introduction prototype.
- Navigation prototype.
- Project presentation prototype.
- Responsive prototype.

### Completion Criteria

- [ ] Main visual direction is validated.
- [ ] Navigation is understandable.
- [ ] Cinematic experience has a clear purpose.
- [ ] Mobile layouts are intentionally designed.
- [ ] Major interaction problems are identified before implementation.

---

# Phase 3 — Foundation and Design System

**Priority:** Critical  
**Goal:** Establish a reliable technical and visual foundation.

### 3.1 Project Foundation

- Preserve the verified existing framework unless audit findings justify a change.
- Configure project structure.
- Establish reusable component conventions.
- Configure shared styling.
- Organize assets.
- Review dependency usage.

The repository audit previously confirmed a Vite + React 18 + TypeScript setup. Verify the current repository again before making changes.

### 3.2 Design Tokens

Implement centralized tokens for:

- Colors.
- Typography.
- Spacing.
- Layout.
- Borders.
- Shadows.
- Motion.
- Responsive breakpoints.

Use the approved visual references for actual values.

### 3.3 Shared Components

Implement reusable components such as:

- Buttons.
- Links.
- Navigation elements.
- Section containers.
- Headings.
- Labels.
- Project previews.
- Image wrappers.
- Form controls.
- Footer elements.

### 3.4 Asset Management

- Organize logo variants.
- Organize technology logos.
- Prepare optimized images.
- Establish font-loading strategy.
- Create appropriate fallbacks.

### Completion Criteria

- [ ] Design tokens are centralized.
- [ ] Reusable components are established.
- [ ] Assets are organized.
- [ ] Typography is working.
- [ ] Build and type checks pass.
- [ ] Foundation works at different screen sizes.

---

# Phase 4 — Cinematic Memory Introduction

**Priority:** High  
**Goal:** Build the signature opening experience.

### Tasks

1. Implement the introductory sequence.
2. Integrate selected personal photographs.
3. Implement image transitions.
4. Integrate the animated logo where appropriate.
5. Implement the final lavender-white reveal.
6. Transition into the main portfolio.
7. Add visible skip functionality.
8. Add replay functionality.
9. Implement first-visit and returning-visitor behavior.
10. Add reduced-motion alternatives.
11. Optimize image loading and animation performance.

### Important Rules

- Never make the introduction a mandatory loading screen.
- Do not block access to portfolio content.
- Do not repeatedly force the experience on returning visitors.
- Do not make the introduction unnecessarily long.
- Provide a reliable fallback if media or animation fails.

### Completion Criteria

- [ ] Full introduction works.
- [ ] Skip works immediately.
- [ ] Replay works.
- [ ] Returning-visitor behavior works.
- [ ] Reduced-motion experience works.
- [ ] Mobile experience is optimized.
- [ ] Main portfolio remains accessible if the intro fails.

---

# Phase 5 — Main Website and Navigation

**Priority:** Critical  
**Goal:** Build the main website experience after the introduction.

### Tasks

#### 5.1 Navigation

- Implement main navigation.
- Add active section indicators.
- Add responsive navigation.
- Add accessible keyboard controls.
- Add the language switcher.
- Implement section transitions.

#### 5.2 Homepage

Implement:

- Main introduction.
- Brand statement.
- Personal identity.
- Featured projects.
- Selected capabilities.
- Clear navigation into other sections.

#### 5.3 About

Implement:

- Personal story.
- Background.
- Current direction.
- Education.
- Relevant personal information.
- Résumé download.

#### 5.4 Journey

Implement:

- Milestone gallery.
- Verified dates.
- Project and learning milestones.
- Relevant imagery.
- Short contextual descriptions.

### Completion Criteria

- [ ] Main navigation works.
- [ ] Homepage communicates the brand clearly.
- [ ] About content is authentic.
- [ ] Journey content uses verified information.
- [ ] Navigation works on desktop and mobile.

---

# Phase 6 — Portfolio Sections

**Priority:** Critical  
**Goal:** Present actual work and capabilities clearly.

### 6.1 Projects

- Create project data structure.
- Build editorial project gallery.
- Add category filtering.
- Add project visuals.
- Add descriptions and technology information.
- Add user role and contribution details.
- Add case-study routes for important projects.
- Add expandable previews where appropriate.
- Add live demo and GitHub links where available.

Only sufficiently polished completed projects should appear in the main gallery.

### 6.2 Experiments

- Create a separate experiment structure.
- Add interactive prototypes.
- Add engineering explorations.
- Add research notes.
- Clearly label unfinished work.
- Avoid presenting experiments as completed products.

### 6.3 Capabilities

- Group capabilities meaningfully.
- Add authentic technology logos.
- Use official brand colors.
- Explain what each capability enables.
- Connect technologies to relevant projects.
- Avoid unsupported proficiency ratings.

### Completion Criteria

- [ ] Projects display correctly.
- [ ] Filtering works.
- [ ] Project destinations are valid.
- [ ] Experiments are clearly separated.
- [ ] Technology logos are authentic.
- [ ] Capabilities communicate practical building ability.

---

# Phase 7 — Internationalization

**Priority:** High  
**Goal:** Support English and Nepali throughout the website.

### Tasks

1. Select an i18n solution compatible with the existing application.
2. Centralize translations.
3. Implement English as the default language.
4. Implement Nepali translations.
5. Add language detection on first visit.
6. Respect manually selected language preferences.
7. Add a visible language switcher.
8. Preserve the current page or section during language changes.
9. Add appropriate document language attributes.
10. Implement language-specific SEO metadata.
11. Validate Nepali font rendering and layout.

### Language Behavior

- Detect browser preference on first visit.
- Choose Nepali when it is the preferred supported language.
- Otherwise default to English.
- Remember manual selection.
- Do not override saved preferences with future browser-language changes.

### Completion Criteria

- [ ] English works throughout.
- [ ] Nepali works throughout.
- [ ] No important interface text is hardcoded outside the translation system.
- [ ] Language switching works.
- [ ] Saved preference is respected.
- [ ] Layout works with both languages.

---

# Phase 8 — Writing and Case Studies

**Priority:** High  
**Goal:** Establish a content experience for deeper technical and personal storytelling.

### 8.1 Writing System

- Implement local Markdown or MDX content.
- Organize articles.
- Add categories and tags.
- Add featured article presentation.
- Add chronological archive.
- Add search and discovery.
- Build dedicated article pages.

### 8.2 Article Experience

- Readable editorial typography.
- Clear heading hierarchy.
- Code block styling.
- Image and media support.
- Responsive reading width.
- Article metadata.
- SEO metadata.

### 8.3 Project Case Studies

Important projects may include:

- Overview.
- Problem.
- Goals.
- Approach.
- Technical implementation.
- Challenges.
- Decisions.
- Results, when verified.
- Screenshots and demonstrations.
- Relevant links.

Do not fabricate outcomes or performance numbers.

### Completion Criteria

- [ ] Writing archive works.
- [ ] Article pages render correctly.
- [ ] Markdown/MDX content is supported.
- [ ] Case-study pages work.
- [ ] Code blocks are readable.
- [ ] Content is searchable and discoverable.

---

# Phase 9 — Contact and Backend

**Priority:** High  
**Goal:** Enable reliable professional enquiries.

### Tasks

#### 9.1 Contact Interface

Implement fields:

- Name.
- Email.
- Subject.
- Message.

#### 9.2 Form Validation

- Validate required fields.
- Validate email format.
- Display useful error messages.
- Prevent accidental duplicate submissions.
- Provide clear submission feedback.

#### 9.3 Backend

Use a minimal server-side solution for contact submissions.

Possible Cloudflare-compatible options:

- Cloudflare Pages Functions.
- Cloudflare Workers.
- A suitable external email delivery provider.

Choose the final provider after checking cost, reliability, security, and deployment compatibility.

#### 9.4 Security

- Keep credentials in environment variables.
- Never expose private API keys.
- Implement basic spam protection.
- Validate submitted data server-side.
- Avoid collecting unnecessary personal information.

#### 9.5 Submission Feedback

Provide:

- Loading state.
- Success state.
- Failure state.
- Retry guidance.

A failed submission must never appear successful.

### Completion Criteria

- [ ] Form validation works.
- [ ] Server-side validation works.
- [ ] Enquiries reach the configured email.
- [ ] Spam protection is implemented.
- [ ] Environment variables are secure.
- [ ] Success and failure states are tested.

---

# Phase 10 — SEO, Privacy and Analytics

**Priority:** High  
**Goal:** Make the website discoverable while respecting visitor privacy.

### 10.1 SEO

Implement:

- Unique page titles.
- Meta descriptions.
- Canonical URLs.
- XML sitemap.
- `robots.txt`.
- Open Graph metadata.
- Social preview images.
- Structured data.
- Semantic headings.
- Internal links.
- Optimized image descriptions.

### 10.2 Multilingual SEO

- Correct language metadata.
- English and Nepali page metadata.
- Appropriate `hreflang` implementation.
- Language-specific canonical strategy.
- Search-engine-friendly content.

### 10.3 Structured Data

Use relevant schema types:

- Person.
- WebSite.
- CreativeWork or SoftwareApplication where appropriate for individual projects.

Only include accurate, supported information.

### 10.4 Privacy

- Use privacy-conscious analytics.
- Avoid invasive tracking.
- Avoid unnecessary cookies.
- Protect contact submissions.
- Publish a clear privacy notice.
- Collect only necessary information.

### Completion Criteria

- [ ] SEO metadata is complete.
- [ ] Sitemap is valid.
- [ ] Structured data is accurate.
- [ ] Multilingual metadata works.
- [ ] Analytics respects privacy requirements.
- [ ] No private credentials are exposed.

---

# Phase 11 — Responsive and Accessibility Refinement

**Priority:** Critical  
**Goal:** Ensure the complete experience works across devices and accessibility needs.

### Tasks

#### Responsive Refinement

Review:

- Homepage.
- Navigation.
- Cinematic introduction.
- Projects.
- Experiments.
- Capabilities.
- Writing.
- Contact.
- Footer.

Test desktop, tablet, and mobile layouts.

#### Accessibility Refinement

- Semantic HTML.
- Keyboard navigation.
- Focus indicators.
- Form labels.
- Image alternatives.
- Contrast.
- Reduced motion.
- Touch targets.
- Screen-reader clarity.

#### Interaction Refinement

- Verify hover behavior.
- Verify keyboard behavior.
- Verify touch interactions.
- Check transition consistency.
- Remove confusing or unnecessary interactions.

### Completion Criteria

- [ ] No horizontal overflow.
- [ ] All important interactions work with a keyboard.
- [ ] Focus states are visible.
- [ ] Text is readable.
- [ ] Forms are accessible.
- [ ] Reduced-motion mode works.
- [ ] Desktop, tablet, and mobile layouts are reviewed.

---

# Phase 12 — Testing and Optimization

**Priority:** Critical  
**Goal:** Validate the entire application before production.

### 12.1 Automated Testing

Use appropriate tools for:

- Type checking.
- Production builds.
- Important unit tests.
- Integration tests.
- Browser automation.
- Critical user journeys.

Testing tools should be selected based on the existing architecture.

### 12.2 Manual Testing

Test:

- First-time visitor experience.
- Returning visitor experience.
- Skip and replay behavior.
- Navigation.
- Project links.
- Language switching.
- Writing pages.
- Contact form.
- Social links.
- Responsive layouts.

### 12.3 Browser Testing

Check major modern browsers, including:

- Firefox.
- Chrome.
- Chromium-based browsers.
- Safari where available.

### 12.4 Lighthouse Auditing

Run Google Lighthouse for:

- Performance.
- Accessibility.
- Best Practices.
- SEO.

Test both mobile and desktop.

Record results and investigate regressions.

Do not optimize only for a numerical score while ignoring real usability.

### 12.5 Performance Optimization

Review:

- Image sizes.
- Font loading.
- JavaScript bundles.
- 3D rendering costs.
- Animation performance.
- Lazy loading.
- Layout shifts.
- Unnecessary dependencies.
- Initial page rendering.

### Completion Criteria

- [ ] Production build passes.
- [ ] Type checks pass.
- [ ] Critical tests pass.
- [ ] Primary user journeys work.
- [ ] No critical console errors.
- [ ] Lighthouse audits are reviewed.
- [ ] Major performance issues are addressed.
- [ ] No critical accessibility issues remain.

---

# Phase 13 — Deployment and Launch

**Priority:** Critical  
**Goal:** Deploy the finished website reliably.

### 13.1 Deployment Preparation

Verify:

- Production build.
- Environment variables.
- Domain configuration.
- HTTPS.
- Redirects.
- Sitemap.
- Robots rules.
- Contact form configuration.
- Analytics configuration.

### 13.2 Cloudflare Pages

Preferred hosting:

`aayusx.dev`

Deployment requirements:

- GitHub repository integration.
- Automatic production deployment from the main branch.
- Preview deployments for pull requests.
- HTTPS.
- CDN delivery.
- Secure environment variables.

Use Pages Functions or Workers if server-side functionality is needed.

### 13.3 Launch Verification

After deployment:

- Visit the live website.
- Test the homepage.
- Test navigation.
- Test language switching.
- Test project links.
- Test contact submission.
- Verify mobile behavior.
- Verify SEO metadata.
- Verify analytics behavior.
- Check production console errors.

### Completion Criteria

- [ ] Production deployment succeeds.
- [ ] Custom domain works.
- [ ] HTTPS works.
- [ ] All primary journeys work.
- [ ] Contact submissions work.
- [ ] No broken links or critical errors remain.

---

## 4. Content and Asset Dependencies

Some implementation tasks depend on assets and verified information.

| Dependency | Needed for |
|---|---|
| Selected palette reference | Design tokens |
| AayusX logo and animated GIF | Branding and introduction |
| Personal photographs | Cinematic introduction and About |
| Verified project information | Projects and case studies |
| Project screenshots | Project gallery |
| Authentic technology logos | Capabilities |
| English and Nepali copy | i18n |
| Résumé PDF | About section |
| Professional email configuration | Contact form |
| Social profile links | Footer and contact |

Missing assets must be recorded as dependencies, not replaced with invented material.

---

## 5. Implementation Priority Rules

When deciding what to build first, use this order:

1. Correctness and working functionality.
2. Performance and accessibility.
3. Visual identity and layout.
4. Content clarity and authenticity.
5. Meaningful interactions.
6. Decorative enhancements.

If an animation makes the website significantly slower or less accessible, simplify or remove it.

If a visual effect does not improve the experience, do not implement it.

---

## 6. Development Workflow

Every feature should follow the same workflow:

1. Review the relevant requirement.
2. Inspect existing implementation.
3. Identify dependencies.
4. Plan the change.
5. Implement the smallest coherent unit.
6. Run type checks and builds.
7. Test the feature.
8. Review visual quality.
9. Review responsive behavior.
10. Document completion and known issues.

### Agent Reporting Requirements

After each meaningful development task, report:

- What changed.
- Files created or modified.
- Why the change was necessary.
- Tests performed.
- Build status.
- Remaining issues.
- Any decisions requiring approval.

Do not silently change architecture, remove features, or introduce unnecessary dependencies.

---

## 7. Change Management

Before major changes:

- Explain the reason.
- Identify affected components.
- Identify possible regressions.
- Preserve existing functionality where possible.
- Use Git commits or branches to keep changes reviewable.

Major architectural decisions must be documented before implementation.

The following decisions require explicit review:

- Framework migration.
- Major dependency replacement.
- Routing architecture changes.
- New backend infrastructure.
- New paid services.
- Destructive asset removal.

---

## 8. Definition of Done

The redesign is considered complete only when:

### Brand and Design

- [ ] AayusX has a consistent visual identity.
- [ ] Main website follows the approved warm editorial direction.
- [ ] Cinematic introduction is complete and optional.
- [ ] Typography and colors are consistent.
- [ ] Technology logos are authentic.

### Content

- [ ] All planned sections are implemented.
- [ ] Projects contain accurate information.
- [ ] Experiments are clearly labeled.
- [ ] Writing pages work.
- [ ] Résumé access works.
- [ ] No fabricated claims are present.

### Functionality

- [ ] Navigation works.
- [ ] Language switching works.
- [ ] Project destinations work.
- [ ] Contact form works.
- [ ] Social links work.
- [ ] Skip and replay functionality work.

### Quality

- [ ] Responsive layouts are reviewed.
- [ ] Accessibility requirements are met.
- [ ] Reduced motion is supported.
- [ ] Production build passes.
- [ ] Critical tests pass.
- [ ] Lighthouse audits are reviewed.
- [ ] No critical errors remain.

### Deployment

- [ ] Website is deployed to `aayusx.dev`.
- [ ] HTTPS works.
- [ ] Production configuration is correct.
- [ ] Contact delivery is verified.
- [ ] Final live-site review is complete.

---

## 9. Final Implementation Principle

Build AayusX as a complete, coherent digital identity—not a collection of impressive-looking sections.

Every phase should contribute to a website that is:

- Distinctive.
- Authentic.
- Technically reliable.
- Visually polished.
- Fast.
- Accessible.
- Easy to maintain.
- Ready to grow with its creator.

**The final experience should demonstrate the ability to think, design, engineer, and build useful technology—not merely the ability to create visual effects.**

