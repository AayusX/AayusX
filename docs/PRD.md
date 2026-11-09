# AayusX Portfolio — Product Requirements Document

**Project:** AayusX Personal Portfolio  
**Website:** https://aayusx.dev  
**GitHub:** https://github.com/AayusX/AayusX  
**Document status:** Requirements consolidated; technical audit pending  
**Version:** 1.0

---

## 1. Product Overview

AayusX is a personal digital identity and portfolio representing an ambitious technology builder who identifies real-world problems and turns ideas into useful digital products through engineering, creativity and entrepreneurial thinking.

The website must be more than a conventional developer résumé. It should communicate the person's identity, demonstrate actual engineering capabilities, document their journey and create meaningful professional connections.

The experience should combine:

- Personal storytelling.
- High-quality visual design.
- Real project demonstrations.
- Technical credibility.
- Entrepreneurial thinking.
- Meaningful interactions.
- Strong performance and accessibility.

The website should leave visitors with a memorable understanding of who is behind AayusX and what they are capable of building.

## 2. Objectives

### Primary objective

Build a memorable personal brand and online presence.

### Secondary objectives

1. Establish AayusX as a recognizable personal technology identity.
2. Showcase polished software products and engineering capabilities.
3. Communicate the development journey and entrepreneurial ambitions.
4. Demonstrate technical curiosity through experiments and writing.
5. Attract collaboration opportunities, clients and professional connections.
6. Provide an accessible way to explore projects and contact the developer.
7. Build a foundation that can grow with future professional ambitions.

### Success criteria

- Visitors can understand the identity and purpose of AayusX quickly.
- Important projects are easy to discover and explore.
- The website feels distinctive, credible and professionally designed.
- Navigation and interactions work reliably across devices.
- The experience remains fast and accessible.
- Visitors can contact the developer without unnecessary friction.

## 3. Audience

The primary audiences are:

1. **Developers and technical communities** — Interested in engineering, projects, experiments and technical knowledge.
2. **Potential clients and businesses** — Looking for someone capable of building useful digital solutions.
3. **Startup founders and entrepreneurs** — Interested in collaboration, product development and entrepreneurial thinking.

The experience should communicate technical competence without assuming every visitor has a technical background.

## 4. Brand Positioning

**Positioning:** The technology entrepreneur who builds useful solutions.

AayusX represents an ambitious technology builder who explores ideas, identifies practical problems and develops digital products.

### Brand characteristics

- Builder
- Problem solver
- Entrepreneurial
- Technical
- Curious
- Creative
- Forward-thinking

The website must communicate ambition without exaggerating experience, achievements or business maturity.

AayusX should be the primary brand identity, with Aayush Bhandari introduced as the person behind it.

The identity should have room to grow beyond a personal portfolio while remaining connected to its founder.

## 5. Visual Identity and Design Direction

### Main visual direction: Warm editorial

The main website should use a warm, editorial design language.

**Visual characteristics:**

- Warm ivory and paper-inspired backgrounds.
- Dark ink typography.
- Restrained botanical green and clay accents.
- Expressive editorial serif headlines.
- Readable modern sans-serif body typography.
- Spacious layouts.
- Asymmetric but structured compositions.
- Carefully composed imagery.
- Clear visual hierarchy.

The design should feel professionally art-directed rather than generated from a generic website template.

### Cinematic introduction

The homepage may begin with a separate cinematic visual chapter featuring the existing purple memory-introduction concept.

The introduction should transition into the warm editorial identity of the main website.

The two visual directions must feel intentional and connected rather than like unrelated websites.

### Design restrictions

Avoid:

- Generic AI-generated website aesthetics.
- Excessive dark or black-heavy backgrounds.
- Generic gradients used as decoration.
- Glitch effects.
- Excessive glassmorphism.
- Emoji-based interface elements.
- Unnecessary animations.
- Inflated marketing language.
- Decorative elements that reduce readability.

Visual creativity must serve the identity and content.

## 6. Website Structure

The website should contain the following sections.

### 6.1 Home

Purpose: Create a memorable introduction and provide an overview of AayusX.

Requirements:

- Cinematic introduction for first-time visitors.
- Clear introduction to the AayusX identity.
- Strong introductory message.
- Selected project highlights.
- Links to important sections.
- Clear path toward exploring the portfolio.
- Responsive design.

### 6.2 About

Purpose: Introduce the person behind AayusX.

Requirements:

- Personal story and background.
- Personality and interests.
- Educational background.
- Technical interests and ambitions.
- Relevant professional profiles.
- Subtle downloadable résumé PDF.

### 6.3 Journey

Purpose: Communicate personal and technical development.

Presentation: Visual milestone gallery rather than a conventional résumé timeline.

Possible content:

- Important projects.
- Learning experiences.
- Technical breakthroughs.
- Hackathons and collaborations.
- Achievements.
- Leadership and community involvement.

Each milestone should explain why it mattered.

Only genuine achievements and verified dates may be published.

### 6.4 Projects

Purpose: Demonstrate actual engineering ability through real products.

Presentation: Editorial project showcase with varied layouts.

Requirements:

- Main gallery featuring polished, completed projects.
- Prominent project visuals.
- Short, meaningful descriptions.
- Technologies used.
- Role and contribution.
- Project categories and filtering.
- Interactive previews where useful.
- Clear project destinations.

Each project may use an appropriate destination:

- Dedicated case-study page.
- Expandable information overlay.
- Live demonstration.
- GitHub repository.
- Combination of these formats.

Important projects should receive detailed case studies when useful.

Do not present unfinished experiments as completed products.

Do not display unavailable demos or inaccessible repositories as working destinations.

### 6.5 Experiments

Purpose: Demonstrate curiosity, technical exploration and creative thinking.

The section should combine:

- **Creative playground:** Interactive visuals, animations and unusual interfaces.
- **Engineering lab:** Algorithms, technical challenges and performance explorations.
- **Research journal:** Discoveries, technical notes and learning.
- **Prototypes:** Early-stage product and interface concepts.

Experimental work must be clearly distinguished from finished products.

### 6.6 Capabilities

Purpose: Explain what AayusX can build rather than simply listing technologies.

Presentation: Hybrid capability overview.

Requirements:

- Organized technology categories.
- Authentic technology logos.
- Descriptions of practical capabilities.
- Connections between technologies and relevant projects.
- Selected interactive technical demonstrations.
- No fabricated skill percentages or proficiency ratings.

#### Technology logo requirements

This is an important visual requirement.

- Use authentic, recognizable technology brand logos.
- Prefer official or trustworthy high-quality SVG assets.
- Preserve original brand colors.
- Maintain correct proportions.
- Ensure consistent visual sizing and alignment.
- Support light and dark logo variants where necessary.
- Optimize assets without reducing sharpness.
- Do not replace recognizable technology logos with generic icons or AI-generated approximations.

### 6.7 Writing

Purpose: Share technical knowledge and personal insights.

The writing section should combine:

- Technical articles.
- Tutorials.
- Engineering explanations.
- Technical discoveries.
- Personal insights.
- Experiences and lessons.
- Learning notes.

Discovery requirements:

- Featured editorial articles.
- Chronological archive.
- Search.
- Categories and tags.
- Dedicated article pages.
- Shareable URLs.
- SEO-friendly metadata.

Content management:

- Start with locally managed Markdown or MDX files.
- Support richer content and custom components where useful.
- Keep publishing manageable through Git.
- Structure content so a CMS can be introduced later.
- Avoid unnecessary external services or databases initially.

### 6.8 Contact

Purpose: Enable professional enquiries and collaboration.

Provide both:

- Contact form.
- Direct professional contact links.

Form fields:

- Name.
- Email.
- Subject.
- Message.

Requirements:

- Input validation.
- Email validation.
- Basic spam protection.
- Email notifications for submitted enquiries.
- Clear submission success and failure feedback.
- Protect submitted information.
- Do not silently discard enquiries.

The exact email provider and implementation remain technical decisions.

## 7. Cinematic Introduction

The homepage introduction should function as a memorable opening chapter.

### Concept

A personal memory slideshow with a distinctive purple visual identity.

The experience should:

1. Introduce the visitor to the personal story.
2. Display selected personal photographs.
3. Use carefully choreographed slideshow transitions.
4. Build anticipation without unnecessary delay.
5. Transition through the planned lavender-white reveal.
6. Introduce the warm editorial portfolio.

### Visitor controls

- First-time visitors can experience the complete introduction.
- Visitors can skip it at any time.
- Returning visitors can choose to replay it.
- The introduction must never force visitors to wait before accessing the website.
- Reduced-motion preferences must be respected.

The introduction must not compromise initial page performance.

## 8. Navigation and Interaction

### Navigation

Use creative navigation with:

- Interactive menu.
- Clear section indicators.
- Expressive but understandable transitions.
- Smooth section navigation.
- Language switcher.
- Predictable mobile navigation.

### Interaction philosophy

Use adaptive levels of interaction:

- Clean foundations throughout the website.
- Immersive interactions in selected sections.
- Interactive project previews.
- Creative scrolling experiences.
- Occasional 3D elements where they provide genuine value.

Interactions must remain accessible, responsive and purposeful.

### Transitions

The chosen direction is cinematic transitions.

Requirements:

- Smooth visual continuity between sections.
- Expressive transitions when entering major sections.
- Carefully choreographed introduction transitions.
- Consistent animation language.
- No unnecessary loading screens.
- No forced waiting.
- Reduced-motion alternatives.

## 9. Project Development Storytelling

Project progress should be communicated through three complementary approaches:

- Completed products in the main Projects gallery.
- Experimental and unfinished work in Experiments.
- Selected development stories explaining challenges, decisions and lessons learned.

The website must distinguish completed products from prototypes and work in progress.

Avoid unnecessary duplication between sections.

## 10. Multilingual Support

The website must support internationalization from the beginning.

### Languages

- English — Default language.
- Nepali — Additional language.

The architecture should support adding more languages later.

### Requirements

- Centralized translation files.
- Translatable navigation, content, buttons and metadata.
- Visible language switcher.
- Preserve the current page or section when switching languages.
- Correct Nepali typography and font rendering.
- Appropriate language attributes and SEO metadata.
- Language-specific indexing and alternate-language references.

### Language selection behaviour

On first visit:

- Detect the visitor's browser language.
- Select Nepali when it is the preferred supported language.
- Otherwise default to English.

After manual selection:

- Save the visitor's preference.
- Respect that preference on subsequent visits.
- Do not override it with later browser-language changes.

Always provide a visible manual language switcher.

## 11. Footer

Use a hybrid footer combining practical information with a distinctive visual ending.

Requirements:

- AayusX brand identity.
- Short personal statement.
- Important website navigation links.
- Professional contact details.
- Social profiles.
- Copyright information.
- Memorable visual element or subtle interaction.
- Consistent warm editorial styling.
- Accessible responsive layout.

## 12. Social Presence

Use a combination of essential and contextual social links.

Essential links:

- GitHub.
- LinkedIn.
- Professional email.

Additional relevant profiles may appear in appropriate sections such as About, Projects or Contact.

Only active and relevant accounts should be displayed.

Use high-quality recognizable social icons with accessible labels.

## 13. Résumé

Provide a downloadable PDF résumé without making it the central focus of the portfolio.

- Place access in the About section.
- Footer access may also be provided.
- Use a descriptive filename.
- Ensure the download works reliably.
- Do not dominate the homepage with a résumé button.

## 14. Performance Requirements

**Highest priority: Performance.**

The website must feel fast on both modern devices and slower connections.

Requirements:

- Fast initial rendering.
- Optimized images and responsive image sizes.
- Optimized fonts and font loading.
- Lazy loading for non-critical content.
- Avoid unnecessary JavaScript.
- Avoid excessive dependencies.
- Efficient animation techniques.
- Prevent layout shifts.
- Optimize video and 3D assets.
- Adapt visual complexity to device capability.
- Maintain smooth interaction on mobile devices.

Performance takes priority over unnecessary visual effects.

## 15. Responsive Design

Use a responsive adaptive approach rather than simply shrinking desktop layouts.

### Desktop

- Spacious editorial layouts.
- Richer visual compositions.
- More advanced interactions where appropriate.

### Tablet

- Balanced layouts.
- Adapted navigation.
- Reduced visual complexity where necessary.

### Mobile

- Simplified compositions.
- Touch-friendly controls.
- Readable typography.
- Appropriate image and media sizes.
- Reduced 3D and animation complexity where necessary.

Every major section must be intentionally designed and tested for mobile.

## 16. Accessibility

Accessibility is an essential requirement.

Include:

- Semantic HTML.
- Logical page structure.
- Keyboard-accessible navigation and controls.
- Readable typography.
- Sufficient color contrast.
- Descriptive image alt text.
- Proper form labels.
- Visible focus indicators.
- Touch-friendly controls.
- Reduced-motion support.
- Accessible language switching.

Do not rely exclusively on animation, color or visual position to communicate important information.

## 17. Credibility and Trust

Credibility should come from a combination of:

1. **Project proof:** Real functionality, engineering decisions and outcomes.
2. **Personal credibility:** Educational background and genuine learning journey.
3. **Social proof:** Real collaborations, leadership, testimonials and recognition when available.

The website must not invent:

- Client testimonials.
- Project outcomes.
- User counts.
- Performance statistics.
- Awards.
- Business achievements.
- Professional experience.

The current identity should be communicated honestly as a technology entrepreneur and Computer Engineering student with entrepreneurial ambitions.

Do not imply that AayusX is already a large company or established agency.

## 18. Privacy and Analytics

Use privacy-conscious analytics.

Requirements:

- Collect only necessary information.
- Avoid invasive tracking.
- Avoid unnecessary cookies.
- Do not sell or share visitor information for advertising.
- Protect contact-form submissions.
- Provide a clear privacy notice.
- Choose a privacy-friendly analytics solution during implementation.

## 19. SEO Requirements

Use an advanced SEO foundation.

Requirements:

- Unique page titles and descriptions.
- Canonical URLs.
- XML sitemap.
- Open Graph metadata.
- Social sharing previews.
- Structured data for Person, Website and relevant projects.
- Multilingual SEO.
- Correct `hreflang` implementation.
- Appropriate language metadata.
- Search-engine-friendly rendering.
- Optimized images.
- Logical heading hierarchy.
- Internal links.
- `robots.txt`.
- Appropriate indexing controls.

Metadata must accurately represent the actual content.

## 20. Hosting and Deployment

**Preferred hosting direction:** Cloudflare.

The desired deployment workflow includes:

- GitHub integration.
- Automatic production deployment from the main branch.
- Preview deployments for pull requests.
- Custom domain: `aayusx.dev`.
- HTTPS.
- CDN delivery.
- Secure environment variables.
- Low operational costs.

### Important technical compatibility requirement

The existing repository must be audited before finalizing deployment architecture.

If the application uses Next.js, assess the compatibility of the current version and rendering requirements with Cloudflare.

Cloudflare Pages is suitable for static deployments. Full Next.js functionality may require Cloudflare Workers with an appropriate OpenNext adapter.

Do not force an incompatible deployment configuration merely to preserve the Pages preference.

## 21. Backend Architecture

Use a hybrid architecture.

The portfolio should remain primarily static.

Backend functionality should be introduced only where necessary, such as:

- Contact-form processing.
- Email notifications.
- Basic spam protection.

Requirements:

- Secure environment variables.
- Minimal API surface.
- No unnecessary database.
- No unnecessary backend infrastructure.
- Protect submitted contact information.

## 22. Content Management

Initially, content will be maintained manually.

The owner should be able to update:

- Projects.
- Journey milestones.
- Experiments.
- Capabilities and technologies.
- Articles.
- Translations.
- Social profiles.

The system should remain straightforward to maintain through the existing development workflow.

A CMS is not required initially.

## 23. Testing and Quality Assurance

Use both automated and manual testing.

### Automated testing

- Unit tests for important logic.
- Integration tests for important features.
- Browser automation for key user journeys.
- Build verification.
- Type checking.
- Relevant accessibility checks.

### Manual testing

- Desktop visual inspection.
- Tablet visual inspection.
- Mobile visual inspection.
- Navigation and transitions.
- Cinematic introduction and skip/replay behaviour.
- Contact-form submission.
- Language switching.
- Project links.
- Article navigation.
- Keyboard accessibility.
- Reduced-motion behaviour.

No critical errors or broken primary user journeys should remain before production deployment.

## 24. Performance Auditing

Use Google Lighthouse during development.

Evaluate:

- Performance.
- Accessibility.
- Best Practices.
- SEO.

Run audits on both desktop and mobile.

Investigate regressions and document results.

Do not sacrifice important accessibility or usability requirements to improve a single audit score.

## 25. Development Approach

Use a design-and-prototype-first process.

### Phase 1: Repository audit

Inspect the existing project before making architectural decisions.

Audit:

- Current framework and version.
- Dependencies.
- Project structure.
- Existing components.
- Code quality.
- Reusable components.
- Performance.
- Accessibility.
- SEO implementation.
- Deployment configuration.
- Technical debt.
- Existing content and assets.

The actual repository is the source of truth.

Do not assume the project uses Vite or Next.js until verified.

### Phase 2: Design system

Define:

- Color tokens.
- Typography.
- Spacing.
- Layout rules.
- Responsive breakpoints.
- Component styling.
- Interaction conventions.
- Animation principles.

### Phase 3: Visual prototypes

Create and validate prototypes for:

- Homepage.
- Cinematic introduction.
- Navigation.
- Project showcase.
- Individual project details.
- Responsive layouts.

### Phase 4: Interaction prototypes

Validate:

- Scrolling experiences.
- Section transitions.
- Project previews.
- Interactive navigation.
- Language switching.
- Responsive interactions.
- Reduced-motion behaviour.

### Phase 5: Technical validation

Evaluate:

- Performance.
- Accessibility.
- Browser compatibility.
- Hosting compatibility.
- Contact-form architecture.
- SEO implementation.

### Phase 6: Implementation

Implement the validated design and architecture.

Prefer reusable, maintainable components.

Avoid unnecessary dependencies and premature abstraction.

### Phase 7: Testing and deployment

Complete automated and manual testing before production deployment.

Verify the live website after deployment.

## 26. Technical Decisions — Pending Audit

The following choices must not be invented before examining the repository.

| Area | Direction | Status |
|---|---|---|
| Frontend framework | Existing framework if suitable | Audit pending |
| React / Next.js architecture | Decide based on actual project | Audit pending |
| Styling system | Existing system or validated improvement | Audit pending |
| Animation library | Select based on requirements | Pending |
| 3D implementation | Only if justified | Pending |
| Internationalization library | Select compatible i18n solution | Pending |
| Content format | Markdown/MDX initially | Confirmed |
| Contact provider | Email notification service | Pending |
| Analytics | Privacy-friendly provider | Pending |
| Hosting | Cloudflare preferred | Compatibility pending |
| Database | Not required initially | Confirmed |
| CMS | Not required initially | Confirmed |

The final stack should prioritize performance, maintainability, compatibility and low operating costs.

## 27. Scope Boundaries

### Included in initial scope

- Cinematic introduction.
- Main editorial portfolio.
- About.
- Journey.
- Projects.
- Experiments.
- Capabilities.
- Writing.
- Contact.
- English and Nepali support.
- Project details and external destinations.
- Downloadable résumé.
- Privacy-conscious analytics.
- SEO.
- Responsive design.
- Accessibility.
- Automated and manual testing.
- Cloudflare-oriented deployment.

### Not required initially

- Full CMS.
- User accounts.
- Visitor dashboards.
- Unnecessary databases.
- Complex backend infrastructure.
- Unnecessary third-party integrations.
- Fake social-proof systems.
- Excessive interactive effects.

Future features should be considered only when they provide genuine value.

## 28. Final Product Principles

Every design and implementation decision should follow these principles:

1. **Authenticity over exaggeration.** Show real work and genuine progress.
2. **Engineering over appearance alone.** Visual quality must be supported by reliable implementation.
3. **Performance over unnecessary effects.** Do not compromise speed for decoration.
4. **Clarity over complexity.** Creative design must remain understandable.
5. **Purposeful interaction.** Every animation and interaction should have a reason.
6. **Accessibility by default.** All visitors should be able to use the website.
7. **Maintainability.** The owner must be able to update content without unnecessary complexity.
8. **Scalability without overengineering.** Build a strong foundation without introducing infrastructure prematurely.
9. **Consistent identity.** Every section should feel like part of AayusX.
10. **Honest credibility.** Never invent achievements, experience or results.

---

## Document Completion

This PRD consolidates the confirmed product, design, content, experience, quality and operational requirements.

Implementation-specific decisions remain subject to the repository audit.

**The next development milestone is the existing codebase audit, followed by the design system and visual prototypes.**