

# AayusX Project Structure

**File:** `docs/PROJECT_STRUCTURE.md`  
**Project:** AayusX Personal Portfolio  
**Status:** Proposed architecture — pending full source-code audit  
**Framework:** Vite + React + TypeScript (verified in the previously inspected repository configuration)

---

## 1. Purpose

This document defines the recommended organization of the AayusX codebase.

It establishes conventions for:

- Application structure.
- Components.
- Pages and routing.
- Styling and design tokens.
- Assets and media.
- Content management.
- Internationalization.
- Animations.
- 3D experiences.
- Backend functionality.
- Testing.

The objective is to maintain a clean, modular, scalable application without unnecessary abstraction.

**Important:** This is a proposed target structure, not a description of the current repository. Inspect the existing source tree before moving, deleting, or renaming files.

---

## 2. Architecture Principles

The codebase must follow these principles:

1. **Modularity:** Components should have clear responsibilities.
2. **Reusability:** Shared interface elements should not be duplicated.
3. **Separation of concerns:** Content, presentation, logic, and configuration should remain distinguishable.
4. **Maintainability:** Developers should be able to locate files easily.
5. **Performance:** Avoid unnecessary dependencies and oversized components.
6. **Accessibility:** Shared components should support accessibility by default.
7. **Scalability:** New sections and languages should be easy to add.
8. **Simplicity:** Do not introduce complex architecture without a real requirement.

---

## 3. Existing Technology Foundation

The previously inspected repository configuration confirmed:

| Technology | Purpose |
|---|---|
| Vite | Development server and build tooling |
| React 18 | UI framework |
| TypeScript | Type safety |
| Three.js | 3D rendering |
| React Three Fiber | React-based Three.js integration |
| Drei | Three.js helpers |
| Rapier | Physics capabilities |
| Framer Motion | Animation |
| Lenis | Smooth scrolling |

Verify installed versions and actual usage before changing dependencies.

Do not migrate to another framework merely to achieve a particular visual style.

---

## 4. Proposed Folder Structure

The following structure is a recommended target architecture.

```text
AayusX/
│
├── public/
│   ├── favicon/
│   ├── fonts/
│   ├── images/
│   ├── logo/
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   │
│   ├── app/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── routes/
│   │   └── providers/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── videos/
│   │   ├── icons/
│   │   ├── technologies/
│   │   └── models/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── media/
│   │   └── feedback/
│   │
│   ├── sections/
│   │   ├── home/
│   │   ├── about/
│   │   ├── journey/
│   │   ├── projects/
│   │   ├── experiments/
│   │   ├── capabilities/
│   │   ├── writing/
│   │   └── contact/
│   │
│   ├── features/
│   │   ├── memory-intro/
│   │   ├── language-switcher/
│   │   ├── project-filter/
│   │   ├── project-preview/
│   │   └── contact-form/
│   │
│   ├── content/
│   │   ├── projects/
│   │   ├── experiments/
│   │   ├── articles/
│   │   ├── case-studies/
│   │   └── translations/
│   │       ├── en/
│   │       └── ne/
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │   ├── analytics/
│   │   ├── seo/
│   │   ├── validation/
│   │   └── utilities/
│   │
│   ├── services/
│   │   ├── contact/
│   │   └── external/
│   │
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── typography.css
│   │   ├── global.css
│   │   └── utilities.css
│   │
│   ├── types/
│   │
│   └── config/
│
├── functions/
│   └── api/
│       └── contact.ts
│
├── docs/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

This structure should be adapted to the actual application. Do not create empty folders simply to match the diagram.

---

## 5. Application Architecture

### 5.1 App Entry

The application entry point should initialize:

- React.
- Global styles.
- Application providers.
- Routing, if implemented.
- Global configuration.

Keep application initialization separate from individual website sections.

### 5.2 App Component

`App.tsx` should coordinate the overall application.

It should not contain the complete implementation of every section.

Its responsibilities may include:

- Application layout.
- Route rendering.
- Global providers.
- Shared navigation.
- Global experience orchestration.

### 5.3 Providers

Use providers only where shared application state is genuinely necessary.

Possible providers:

- Internationalization.
- Theme, if required.
- Application-level context.

Avoid creating global state for values that can remain local to individual components.

---

## 6. Components Architecture

Components should be divided according to responsibility.

### 6.1 UI Components

Location:

`src/components/ui/`

Examples:

- Button.
- Link.
- Heading.
- Container.
- Badge.
- Input.
- Textarea.
- Modal.
- Icon.
- Section heading.

These should be reusable, visually consistent, and accessible.

### 6.2 Layout Components

Location:

`src/components/layout/`

Examples:

- Main layout.
- Header.
- Footer.
- Section wrapper.
- Content container.

These components establish the common page structure.

### 6.3 Navigation Components

Location:

`src/components/navigation/`

Examples:

- Desktop navigation.
- Mobile navigation.
- Navigation menu.
- Active section indicator.

### 6.4 Media Components

Location:

`src/components/media/`

Examples:

- Optimized image.
- Video preview.
- Technology logo.
- Project media gallery.

### 6.5 Feedback Components

Location:

`src/components/feedback/`

Examples:

- Loading state.
- Error message.
- Success message.
- Empty state.

### Component Rules

- Keep components focused.
- Avoid excessively large component files.
- Extract repeated behavior.
- Avoid unnecessary wrapper components.
- Do not abstract one-off elements without a reason.
- Keep styling consistent with the design system.

---

## 7. Section Architecture

Each major website section should have its own directory.

Example:

```text
sections/
  projects/
    ProjectsSection.tsx
    ProjectGallery.tsx
    ProjectCard.tsx
    project-section.css
    index.ts
```

The same principle applies to Home, About, Journey, Experiments, Capabilities, Writing, and Contact.

Section-specific components should remain inside their section directory unless they become genuinely reusable elsewhere.

---

## 8. Feature Architecture

Features represent more complex user-facing functionality.

### 8.1 Memory Introduction

Location:

`src/features/memory-intro/`

Possible structure:

```text
memory-intro/
  MemoryIntro.tsx
  MemorySequence.tsx
  MemoryImage.tsx
  IntroControls.tsx
  intro-animation.ts
  intro-types.ts
  intro.css
```

Responsibilities:

- Manage the introduction sequence.
- Display personal imagery.
- Coordinate transitions.
- Support skipping and replay.
- Respect reduced-motion settings.
- Provide a reliable fallback.

Keep this feature isolated from the main portfolio sections.

### 8.2 Language Switcher

Location:

`src/features/language-switcher/`

Responsibilities:

- Display the current language.
- Allow English/Nepali selection.
- Preserve the current page where possible.
- Communicate language changes accessibly.

### 8.3 Project Filtering

Location:

`src/features/project-filter/`

Responsibilities:

- Display project categories.
- Filter available projects.
- Maintain predictable selection behavior.
- Support keyboard and touch interaction.

### 8.4 Contact Form

Location:

`src/features/contact-form/`

Responsibilities:

- Manage form inputs.
- Validate data.
- Display submission states.
- Communicate with the backend service.

Keep server-side security logic outside client-side form components.

---

## 9. Routing Architecture

Routing requirements should be selected based on the actual content and deployment strategy.

Possible routes:

```text
/
 /about
 /journey
 /projects
 /projects/:slug
 /experiments
 /capabilities
 /writing
 /writing/:slug
 /contact
```

### Routing Principles

- Use readable URLs.
- Keep important project case studies independently accessible.
- Give articles dedicated URLs.
- Support browser navigation.
- Preserve expected navigation behavior.
- Handle unknown routes appropriately.

### Multilingual Routing

The final strategy must be decided during implementation.

Possible approaches:

- Language prefixes such as `/en/` and `/ne/`.
- A default-language route with an alternative language prefix.
- Another architecture compatible with the chosen i18n and SEO strategy.

The selected approach must support:

- Direct page access.
- Language switching.
- Canonical URLs.
- `hreflang`.
- Search-engine indexing.

Do not implement multiple routing strategies simultaneously.

---

## 10. Content Architecture

Keep content separate from presentation.

### 10.1 Projects

Suggested data structure:

```ts
export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string[];
  technologies: string[];
  role?: string;
  status: "completed" | "in-development" | "archived";
  featured: boolean;
  coverImage?: string;
  demoUrl?: string;
  repositoryUrl?: string;
}
```

Only include fields that the application actually needs.

### 10.2 Experiments

```ts
export interface Experiment {
  slug: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  status: "experimental" | "in-development" | "completed";
  coverImage?: string;
  demoUrl?: string;
}
```

### 10.3 Articles

```ts
export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  coverImage?: string;
  readingTime?: number;
  featured?: boolean;
}
```

### Content Rules

- Use consistent types.
- Validate content where appropriate.
- Avoid duplicated project information.
- Store translations systematically.
- Keep unavailable URLs absent rather than inventing them.
- Do not treat optional fields as mandatory.

---

## 11. Internationalization Architecture

Location:

`src/content/translations/`

Suggested structure:

```text
translations/
  en/
    common.json
    navigation.json
    home.json
    about.json
    journey.json
    projects.json
    experiments.json
    capabilities.json
    writing.json
    contact.json

  ne/
    common.json
    navigation.json
    home.json
    about.json
    journey.json
    projects.json
    experiments.json
    capabilities.json
    writing.json
    contact.json
```

### Requirements

- English and Nepali must use matching translation keys.
- Missing translations should be detectable.
- Avoid hardcoded interface text.
- Preserve technical names.
- Support localized metadata.
- Use proper Nepali font rendering.

Select the i18n library after checking compatibility with the current Vite application.

---

## 12. Asset Architecture

### 12.1 Brand Assets

Keep the primary logo, variants, and animated assets organized.

### 12.2 Technology Assets

Use authentic SVG technology logos.

Preserve official colors and proportions.

### 12.3 Image Assets

Organize project images, personal photography, and editorial imagery by purpose.

### 12.4 3D Assets

Keep models and textures separate from ordinary interface assets.

Load heavy 3D assets only when necessary.

### Asset Rules

- Use descriptive filenames.
- Avoid duplicate assets.
- Optimize images.
- Prefer suitable modern image formats.
- Preserve sharpness.
- Add meaningful alternative text.
- Do not remove source assets without checking references.

---

## 13. Styling Architecture

Location:

`src/styles/`

Suggested files:

| File | Responsibility |
|---|---|
| `tokens.css` | Colors, spacing, borders and shared values |
| `typography.css` | Font declarations and text hierarchy |
| `global.css` | Global reset and application defaults |
| `utilities.css` | Small shared utility classes |

Section-specific styles should remain close to their components unless the existing styling system suggests otherwise.

### Styling Rules

- Use semantic tokens.
- Avoid arbitrary hardcoded values.
- Avoid duplicated styles.
- Keep responsive behavior predictable.
- Do not introduce a second styling framework without justification.

---

## 14. Animation Architecture

Use a consistent motion system.

Shared animation utilities may include:

- Section entrance transitions.
- Fade and reveal patterns.
- Navigation transitions.
- Hover feedback.
- Image transitions.

Use Framer Motion where it provides genuine value.

Avoid:

- Duplicating animation logic.
- Excessive scroll listeners.
- Animating expensive properties unnecessarily.
- Running unnecessary continuous animations.
- Creating motion that interferes with reading.

Reduced-motion behavior must be considered from the beginning.

---

## 15. 3D Architecture

Three.js and React Three Fiber should be used selectively.

### Rules

- Keep 3D scenes isolated.
- Load them only where necessary.
- Separate scene components from ordinary UI.
- Use appropriate asset optimization.
- Provide fallback content.
- Adapt complexity for mobile.
- Monitor rendering performance.

A 3D experience must contribute meaningfully to the story or functionality.

Do not add 3D simply because the dependencies already exist.

---

## 16. Backend and Services

The primary website should remain mostly static.

Use backend functionality only where required.

### Contact Service

Possible structure:

```text
functions/
  api/
    contact.ts
```

This represents a possible Cloudflare Pages Functions endpoint.

### Backend Rules

- Validate input server-side.
- Protect credentials.
- Use environment variables.
- Add basic spam protection.
- Return clear success and failure responses.
- Avoid introducing a database without a real requirement.

Client-side validation must never replace server-side validation.

---

## 17. Configuration and Environment Variables

Keep environment-specific configuration outside source code.

Suggested `.env.example`:

```env
VITE_PUBLIC_SITE_URL=
VITE_PUBLIC_ANALYTICS_ID=

CONTACT_EMAIL_PROVIDER_KEY=
CONTACT_DESTINATION_EMAIL=
```

This is an illustrative template. Only add variables actually used by the application.

### Rules

- Never commit real secrets.
- Do not expose private keys through `VITE_` variables.
- Document required variables.
- Validate production configuration.
- Keep development and production settings separate.

---

## 18. Testing Architecture

Suggested organization:

```text
tests/
  unit/
  integration/
  e2e/
```

### Unit Tests

Test important isolated logic.

Examples:

- Translation helpers.
- Validation.
- Filtering.
- Content utilities.

### Integration Tests

Test connected features.

Examples:

- Language switching.
- Contact form states.
- Project filtering.

### End-to-End Tests

Test important visitor journeys.

Examples:

- First visit and skip introduction.
- Navigate between sections.
- Change language.
- Open a project.
- Read an article.
- Submit a contact enquiry.

Choose testing libraries based on the existing project and actual requirements.

---

## 19. Naming Conventions

Use consistent naming across the project.

### Files

- React components: PascalCase.
- Hooks: `use` prefix.
- Utilities: descriptive camelCase.
- Stylesheets: descriptive kebab-case or consistent existing convention.
- Types: descriptive PascalCase.

### Examples

```text
ProjectCard.tsx
MemoryIntro.tsx
useReducedMotion.ts
formatDate.ts
project-types.ts
```

### Components

Use descriptive component names.

Avoid vague names such as:

- `Thing`
- `Box`
- `Stuff`
- `MainComponent`
- `NewComponent2`

---

## 20. Dependency Management

Before adding a package:

1. Check whether the functionality already exists.
2. Check whether an existing dependency can handle it.
3. Evaluate package maintenance and compatibility.
4. Consider bundle size.
5. Consider accessibility and performance.
6. Document why it is needed.

Do not add libraries simply because they are popular.

Do not remove existing dependencies without checking their usage.

---

## 21. Architecture Review Checklist

Before approving major architecture changes:

- [ ] Existing source structure was inspected.
- [ ] The change solves an actual problem.
- [ ] Responsibilities are clearly separated.
- [ ] Existing functionality is preserved.
- [ ] No unnecessary dependencies were introduced.
- [ ] Content and presentation remain organized.
- [ ] Internationalization is supported.
- [ ] Assets remain traceable.
- [ ] Accessibility is considered.
- [ ] Performance impact is understood.
- [ ] Build and tests pass.
- [ ] Documentation is updated.

---

## 22. Final Architecture Principle

The AayusX codebase should be organized around clarity, maintainability, and actual product requirements.

The proposed structure is a guide, not a reason to overcomplicate the application.

**Build the simplest architecture that supports the complete AayusX experience reliably, and introduce additional complexity only when the project genuinely needs it.**

