

# AayusX Design System

**File:** `docs/DESIGN_SYSTEM.md`  
**Project:** AayusX Personal Portfolio  
**Status:** Implemented — Ink & Plum refinement  
**Brand:** AayusX  
**Design Direction:** Ink & Plum × Modern Engineering

---

## 1. Purpose

This document establishes the visual and interaction standards for the AayusX website.

The design system should ensure that every page, component, animation, and visual element feels like part of one coherent brand.

The website should communicate:

- Technical ability and engineering curiosity.
- Entrepreneurial ambition.
- Creativity and originality.
- Professional credibility.
- A genuine personal identity.

The result should feel like a carefully art-directed digital experience, not a generic developer portfolio or an AI-generated website template.

## 2. Brand Identity

### 2.1 Brand Structure

**Primary brand:** AayusX

**Person behind the brand:** Aayush Bhandari

AayusX represents a personal technology identity built around creating useful solutions, exploring ideas, and developing digital products.

The identity should be flexible enough to grow beyond a conventional personal portfolio without losing its connection to its creator.

### 2.2 Brand Personality

The visual identity should communicate these qualities:

| Attribute | Visual interpretation |
|---|---|
| Technical | Precise layouts, structured information |
| Creative | Expressive compositions and typography |
| Ambitious | Strong visual hierarchy and memorable moments |
| Trustworthy | Clear content, restrained styling |
| Curious | Experiments, explorations and visual discoveries |
| Professional | Consistency, polish and attention to detail |

### 2.3 Brand Principles

1. Originality over templates.
2. Clarity over unnecessary decoration.
3. Quality over visual complexity.
4. Authenticity over exaggerated presentation.
5. Purposeful interactions over animation for its own sake.
6. Performance over excessive visual effects.

---

## 3. Overall Visual Direction

> **Direction update — 9 November 2026.** The current implementation is **Ink & Plum**, a refinement of Liquid Atlas. It keeps the opening drop/ripple and Changa, but removes the lilac/electric-violet template, the glass lens, the gradient display type, pill labels, numbered mono eyebrows, and continuous decorative motion. See section 24. The structural, accessibility, SEO, and testing rules remain in force.

The primary website uses a **warm bone, ink, aubergine, and rust design language with modern engineering precision**.

### 3.1 Main Visual Characteristics

- Warm bone paper and quiet surface fields, with darker sand section bands.
- Near-black aubergine cinematic chapters, including the opening and footer.
- Wine-plum as the primary signal colour.
- Dusty rose and warm bone for highlights and metadata.
- A restrained rust accent for dates and secondary signals.
- Dark ink typography on light surfaces; warm bone typography on dark surfaces.
- Confident Bricolage Grotesque headlines with an editorial character.
- DM Sans body and interface typography.
- IBM Plex Mono for dates, identifiers, and technical metadata.
- Rectangular portrait photography, not circular glass lenses.
- Staggered, non-uniform project presentation rather than repeated card grids.
- Subtle borders, flat fields, and controlled depth.
- Meaningful motion and transitions.

### 3.2 Signature Systems

- **Changa** — an original Nepali kite mascot. A lightweight SVG follows the cursor with a dotted tether, reacts to interactive elements, and has an explicit off switch. It is replaced by a static mascot for coarse pointers and reduced motion.
- **LiquidText (retired)** — the SVG-filtered gradient display material was removed in the Ink & Plum refinement. The opening and homepage now use solid display type. The solid text layer remains the accessibility baseline.
- **Liquid Atlas opening** — a dark violet drop/ripple chapter that resolves into the light site. Skip and enter controls are always present.

### 3.3 Visual Balance

The website should not look overly minimal, empty, corporate, or decorative.

Every section should have its own visual character while following the same underlying design language.

Avoid:

- Generic AI-generated gradients.
- Excessive rounded cards.
- Unnecessary glassmorphism.
- Random floating decorative objects.
- Emoji-based interface elements.
- Excessive shadows.
- Dark backgrounds dominating the entire website.
- Repetitive section layouts.
- Decorative elements without a purpose.

---

## 4. Color System

### 4.1 Primary Palette

The implemented Ink & Plum values live in `src/styles/tokens.css`. The approved palette is warm bone, ink, aubergine, dusty rose, and a restrained rust accent. Section 24 lists the current values.

The following semantic roles define how those colors should be used.

| Token | Purpose |
|---|---|
| `color-paper` | Main website background |
| `color-paper-secondary` | Alternate section background |
| `color-ink` | Primary text and strong contrast |
| `color-ink-secondary` | Supporting text |
| `color-violet` | Primary brand accent |
| `color-violet-soft` | Subtle violet surfaces |
| `color-clay` | Secondary accent |
| `color-border` | Dividers and component borders |
| `color-surface` | Cards and elevated content |
| `color-inverse` | Text or elements on dark surfaces |

### 4.2 Color Usage

**Lilac-white paper**
- Main background.
- Large content areas.
- Editorial section surfaces.

**Ink**
- Headlines.
- Body text.
- Important navigation elements.
- High-contrast interface elements.

**Electric violet**
- Selected navigation states.
- Important links.
- Small visual highlights.
- Interactive indicators.
- Selected project details.

**Deep violet**
- Opening, page chapters, feature panels, footer, and technology wall.
- Used as a deliberate chapter switch, never for the entire site.

**Clay**
- Secondary highlights.
- Dates and small signals.
- Occasional visual contrast.

### 4.3 Color Rules

- Maintain readable contrast.
- Use accents intentionally rather than everywhere.
- Avoid using violet and clay as competing primary accents.
- Never sacrifice accessibility for aesthetic consistency.
- Do not introduce additional colors without a clear reason.
- Keep the visual identity light, violet, and legible.

### 4.4 Cinematic Introduction Palette

The cinematic memory introduction is a separate visual chapter.

It uses the established purple, lavender, and white direction.

This visual chapter should transition into the main lilac-white website.

It must still feel like part of the AayusX experience rather than an unrelated microsite.

### 4.5 Implementation Tokens

Use centralized design tokens instead of hardcoded colors throughout components.

Example structure:

```css
:root {
  --color-paper: /* final reference value */;
  --color-paper-secondary: /* final reference value */;

  --color-ink: /* final reference value */;
  --color-ink-secondary: /* final reference value */;

  --color-botanical: /* final reference value */;
  --color-botanical-soft: /* final reference value */;

  --color-clay: /* final reference value */;

  --color-border: /* final reference value */;
  --color-surface: /* final reference value */;
  --color-inverse: /* final reference value */;
}
```

Replace placeholders only after validating the selected palette reference.

---

## 5. Typography System

### 5.1 Typography Direction

The approved system is **sans-serif-first**, not editorial-serif-led. It combines:

- **Bricolage Grotesque** for display and major headings. Editorial, slightly irregular, and less templated than a geometric default.
- **DM Sans** for body copy, navigation, forms, and interface text. High readability at paragraph length.
- **IBM Plex Mono** for dates, project identifiers, status labels, and technical metadata.
- **Noto Sans Devanagari** for Nepali display and body copy.

The combination should feel contemporary, technical, and calm. It should read as a product builder's site, not a fashion magazine.

### 5.2 Typography Roles

| Role | Family | Usage |
|---|---|---|
| Display | Bricolage Grotesque 700 | Main homepage statement |
| Heading 1 | Bricolage Grotesque 700 | Major page introductions |
| Heading 2 | Bricolage Grotesque 700 | Section titles |
| Heading 3 | Bricolage Grotesque 600–700 | Project and content headings |
| Body Large | DM Sans 400 | Important introductory paragraphs |
| Body | DM Sans 400 | Standard readable content |
| Body Strong | DM Sans 600 | Inline emphasis and UI labels |
| Navigation | DM Sans 500 | Main navigation and controls |
| Label | IBM Plex Mono 500 | Categories, dates, status, metadata |
| Nepali Display | Noto Sans Devanagari 600–700 | Nepali headings |
| Nepali Body | Noto Sans Devanagari 400 | Nepali paragraphs |

### 5.3 Typography Rules

- Headlines use weights 600–700. Thin display weights are not permitted.
- Body copy stays at 400 and never below 16px; interface text uses 500.
- Metadata uses IBM Plex Mono 500 at 12px or larger.
- Keep body measure between 60 and 75 characters.
- Body line-height is 1.7; long-form prose is 1.8.
- Uppercase is reserved for short technical labels, statuses, and eyebrows. It is not used for navigation, buttons, paragraphs, or long metadata.
- Italic is reserved for genuine body-copy emphasis, such as article blockquotes. Display emphasis uses colour and weight instead.
- Nepali headings use a 1.35 line-height and Nepali body copy 1.75.
- Use balanced heading wraps and pretty paragraph wraps where supported.
- Do not use more than these four families.

### 5.4 Font Selection

Confirmed families and loading:

- **Bricolage Grotesque** variable 400–800 with optical size. Used for display and headings.
- **DM Sans** variable 400–600, with a real italic 400–500. Used for body and interface text.
- **IBM Plex Mono** 400 and 500. Used for technical labels.
- **Noto Sans Devanagari** variable 400–700, served from the Devanagari unicode-range so it downloads only when Nepali text is present.

All four are open-source and loaded through Google Fonts with `display=swap`, preconnected origins, and only the weights and axes the design uses. No decorative serif is loaded.

Font selection has been tested with both English and Nepali content. The comparison lab lives at `docs/typography-comparison.html`.

---

## 6. Logo and Brand Assets

### 6.1 Primary Logo

The AayusX logo is a core part of the visual identity.

Use the user's selected logo asset as the source of truth.

The final logo should:

- Be recognizable at different sizes.
- Remain sharp across screen densities.
- Work in navigation, footer, loading states and other appropriate locations.
- Maintain correct proportions.
- Preserve its intended visual identity.
- Have appropriate spacing around it.

### 6.2 Animated Logo

The supplied animated logo GIF may be used where animation adds value.

Possible applications:

- Cinematic introduction.
- Selected brand moments.
- Loading or transition moments, only when necessary.

Rules:

- Do not autoplay it repeatedly.
- Do not make it a source of unnecessary loading delay.
- Provide a static fallback.
- Respect reduced-motion preferences.
- Optimize file size.
- Avoid placing it everywhere.

### 6.3 Logo Variants

Where necessary, provide:

- Primary logo.
- Compact logo or symbol.
- Light-background version.
- Dark-background version.
- Static fallback for animation.

Do not stretch, recolor, distort, or recreate the logo without approval.

---

## 7. Technology Logo Standards

Technology logos are an important part of the Capabilities section.

They must be authentic, recognizable, and professionally presented.

### 7.1 Source Requirements

Use:

1. Official technology brand assets.
2. Official documentation or trusted brand repositories.
3. Reliable SVG logo libraries when official assets are unavailable.

Do not use AI-generated approximations of technology logos.

### 7.2 Brand Accuracy

Preserve the original identity of each technology.

- Use official brand colors.
- Preserve original proportions.
- Avoid unnecessary recoloring.
- Do not modify recognizable brand marks.
- Use monochrome variants only when officially supported or clearly appropriate.

### 7.3 Presentation

Technology logos should have:

- Consistent visual dimensions.
- Appropriate internal padding.
- Sharp rendering.
- Consistent alignment.
- Accessible names.
- Appropriate contrast against the background.

Different logos have different shapes. Do not force every logo into an identical square appearance.

### 7.4 Implementation

Prefer SVG assets.

Keep technology assets organized and reusable.

Suggested structure:

```text
src/
  assets/
    technologies/
      react.svg
      typescript.svg
      javascript.svg
      python.svg
      java.svg
      cpp.svg
```

This is a suggested structure, not a requirement to duplicate existing project assets.

---

## 8. Layout and Spacing

### 8.1 Layout Philosophy

Use editorial composition rather than repetitive card grids.

Layouts should feel intentionally designed, with clear hierarchy and balanced negative space.

### 8.2 Container Rules

- Use a consistent maximum content width.
- Maintain predictable horizontal margins.
- Allow selected sections to extend beyond the standard content container.
- Keep text widths comfortable.
- Avoid excessively wide paragraphs.
- Use consistent alignment between related sections.

### 8.3 Spacing Scale

Use a centralized spacing scale.

Suggested token structure:

```css
:root {
  --space-1: /* 4px */;
  --space-2: /* 8px */;
  --space-3: /* 12px */;
  --space-4: /* 16px */;
  --space-6: /* 24px */;
  --space-8: /* 32px */;
  --space-12: /* 48px */;
  --space-16: /* 64px */;
  --space-24: /* 96px */;
  --space-32: /* 128px */;
}
```

Use these as starting points and adapt them to the actual layout.

### 8.4 Grid System

The design may use:

- Asymmetric editorial grids.
- Split-screen layouts.
- Large visual sections.
- Offset image compositions.
- Full-width project presentations.
- Structured technical content grids.

Layouts must remain understandable and consistent.

---

## 9. Component Design

All reusable components should follow the same visual language.

### 9.1 Buttons

Button styles should be minimal and purposeful.

Required variants:

- Primary.
- Secondary.
- Text / link.
- Icon button.

Rules:

- Clear labels.
- Visible focus state.
- Consistent padding.
- Comfortable touch targets.
- Subtle interaction feedback.
- No unnecessary gradients or decorative effects.

### 9.2 Links

Links must be recognizable as interactive elements.

- Use consistent styling.
- Provide hover and focus feedback.
- Keep external links distinguishable where appropriate.
- Avoid ambiguous click targets.

### 9.3 Cards

Cards should be used only when they improve content organization.

Possible applications:

- Project previews.
- Experiment entries.
- Writing previews.
- Journey milestones.

Avoid turning every section into a collection of identical rounded cards.

### 9.4 Input Fields

Form elements should feel clean and accessible.

Required elements:

- Clear labels.
- Helpful placeholder text where appropriate.
- Visible focus states.
- Validation feedback.
- Error messages.
- Success and failure states.

### 9.5 Navigation

Navigation should be expressive but predictable.

Requirements:

- Clear section names.
- Active section indication.
- Accessible menu controls.
- Responsive behavior.
- Visible language switcher.
- Keyboard accessibility.

### 9.6 Language Switcher

The language switcher must support:

- English.
- Nepali.

It should clearly communicate the current language.

Switching languages must preserve the current page or section wherever possible.

---

## 10. Section-Specific Design

### 10.1 Home

The homepage should create a memorable first impression.

Design characteristics:

- Strong editorial headline.
- Clear personal introduction.
- Distinctive composition.
- Carefully chosen visual elements.
- Clear route into the rest of the portfolio.

Avoid overwhelming visitors with too much information.

### 10.2 About

The About section should feel personal and authentic.

Include:

- Personal story.
- Background.
- Current direction.
- Education and interests.
- A way to join the community, collaborate, or work with Yugya.

Use editorial typography and carefully selected imagery.

### 10.3 Journey

Use a milestone-gallery approach rather than a conventional résumé timeline.

Each milestone should have:

- A meaningful title.
- A date where verified.
- A short description.
- Relevant imagery or visual material where available.
- An explanation of why it mattered.

Never invent dates or accomplishments.

Current implementation: a deep-violet chapter, a large year map, and a vertical milestone route with violet nodes. The year map is decorative but still meets large-text contrast, and the “what it changed” note uses a violet-soft surface.

### 10.4 Projects

Projects are the primary evidence of technical ability.

Use:

- Large project visuals.
- Strong project titles.
- Concise descriptions.
- Technology information.
- User's actual role.
- Relevant links.

Important projects may have dedicated case-study pages.

Other projects may use expandable overlays or direct external links.

Only completed and sufficiently polished projects belong in the main Projects gallery.

### 10.5 Experiments

This section should feel like a creative engineering laboratory.

It can include:

- Interactive experiments.
- Technical prototypes.
- Visual explorations.
- Animation studies.
- Engineering challenges.
- Research notes.

Clearly identify experimental and unfinished work.

Current implementation: a lab bento with one full-width violet physics card, a terminal/gesture row, and an AI/memory row. The AI card uses a static local-first architecture diagram; the video cards use poster frames extracted from the supplied demo footage. Heavy experiments stay behind an explicit launch action.

### 10.6 Capabilities

The Capabilities section should explain what can be built, not merely display a list of technologies.

Use a combination of:

- Capability categories.
- Authentic technology logos.
- Short explanations.
- Links between technologies and relevant projects.

Do not use fake proficiency percentages or unsupported skill ratings.

Current implementation: capability rows with a large index, a dark full-bleed technology wall of authentic Simple Icons marks on light tiles, and proof links that point to documented projects. The wall changes from five to four to three to two columns as the viewport narrows.

### 10.7 Writing

The Writing section should use a reading-first editorial layout.

Include:

- Featured articles.
- Chronological archive.
- Categories and tags.
- Search and discovery.
- Dedicated article pages.

Article typography should prioritize readability.

Current implementation: a deep-violet featured-story panel with a light archive rail on the index, and a deep-violet article header followed by lilac-white long-form prose. The featured panel and the article header both use the same chapter colour, not a generic card treatment.

### 10.8 Contact

The Contact section should feel welcoming and professional.

Include:

- Contact form.
- Professional email.
- Relevant social links.
- Clear collaboration message.

Form states must be visually clear.

Current implementation: a deep-violet contact chapter with a large ripple field, then a light contact layout with the form, direct email, and social links. The form keeps its accessible validation, error, success, and mailto fallback states.

### 10.9 Footer

The footer should provide a distinctive ending.

Include:

- AayusX logo.
- Short brand statement.
- Navigation.
- Contact details.
- Social links.
- Copyright information.

Use subtle interactions rather than excessive decoration.

---

## 11. Cinematic Memory Introduction

### 11.1 Visual Identity

The introduction uses a separate purple/lavender visual language.

It should communicate:

- Personal memories.
- Ambition.
- Curiosity.
- Vision.
- Personal growth.
- The person behind AayusX.

### 11.2 Visual Sequence

The experience may include:

1. A quiet opening.
2. Personal photographs appearing through soft transitions.
3. A gradually accelerating memory sequence.
4. Layered imagery and visual storytelling.
5. A lavender-white flash transition.
6. Reveal of the main warm editorial portfolio.

The final implementation should follow the validated prototype.

### 11.3 Interaction Rules

- First-time visitors may experience the full introduction.
- Returning visitors can skip or replay it.
- A visible skip control must always be available.
- Users must never be forced to wait.
- Reduced-motion preferences must be respected.
- The main portfolio must remain accessible if the intro fails.

### 11.4 Performance Rules

- Optimize photographs.
- Preload only critical assets.
- Lazy-load noncritical media.
- Avoid blocking the main website.
- Provide a simplified experience on less capable devices.

---

## 12. Motion and Animation

### 12.1 Motion Philosophy

Motion should communicate relationships, hierarchy, continuity, and feedback.

It must never exist only to make the website look busy.

### 12.2 Approved Motion Patterns

- Subtle page transitions.
- Section entrance animations.
- Text reveals.
- Project image transitions.
- Navigation feedback.
- Hover interactions.
- Scroll-linked effects in selected areas.
- Meaningful 3D interactions.

### 12.3 Animation Rules

- Keep motion smooth and controlled.
- Avoid excessive bouncing.
- Avoid random movement.
- Avoid continuous decorative animation.
- Avoid unnecessary parallax.
- Never delay essential content.
- Avoid layout shifts during animation.

### 12.4 User-Controlled Interaction

The website should prioritize intentional interactions.

Where practical:

- Animate in response to user input.
- Keep controls understandable.
- Avoid surprising visitors.
- Provide static alternatives when motion is disabled.

### 12.5 Reduced Motion

Support:

```css
@media (prefers-reduced-motion: reduce) {
  /* Replace nonessential movement with simpler transitions. */
}
```

Do not rely exclusively on JavaScript for reduced-motion handling.

---

## 13. Responsive Design

The website must be designed for desktop, tablet, and mobile as distinct experiences.

### 13.1 Desktop

- Spacious editorial compositions.
- Larger typography.
- Richer visual interactions.
- Multi-column layouts where useful.
- Full project presentation.

### 13.2 Tablet

- Balanced content density.
- Adapted typography.
- Simplified navigation where needed.
- Adjusted media proportions.
- Touch-friendly controls.

### 13.3 Mobile

- Simplified cinematic experience.
- Clear vertical content flow.
- Readable typography.
- Touch-friendly interactions.
- Reduced 3D complexity.
- Optimized media.
- No horizontal overflow.
- No tiny navigation controls.

### 13.4 Responsive Principles

- Do not simply shrink desktop layouts.
- Recompose layouts for smaller screens.
- Preserve content hierarchy.
- Avoid hiding important information.
- Keep navigation accessible.
- Test real viewport sizes.

---

## 14. Imagery and Media

### 14.1 Image Quality

All images should be selected and prepared intentionally.

Requirements:

- Appropriate resolution.
- Correct aspect ratio.
- Optimized file size.
- Sharp rendering.
- Descriptive alt text.
- Consistent visual treatment.

### 14.2 Project Images

Project imagery should accurately represent the actual project.

Avoid:

- Misleading mockups.
- Unrelated stock imagery.
- Fake product screenshots.
- Artificially inflated visual claims.

### 14.3 Personal Photography

Use authentic personal photographs where appropriate.

Preserve their original meaning and avoid unnecessary visual manipulation.

### 14.4 Video and 3D

- Load heavy media only when needed.
- Avoid blocking initial rendering.
- Provide fallback content.
- Reduce complexity on mobile.
- Respect reduced-motion preferences.

---

## 15. Icons and Interface Graphics

Use consistent, high-quality icon assets.

Requirements:

- Consistent visual weight.
- Appropriate sizing.
- Clear meaning.
- Accessible labels.
- Proper alignment.

Avoid using emoji as interface icons.

For third-party brand marks, follow the Technology Logo Standards in Section 7.

---

## 16. Accessibility Standards

Accessibility is a core design requirement.

The design system must support:

- Semantic HTML.
- Keyboard navigation.
- Visible focus indicators.
- Sufficient color contrast.
- Readable font sizes.
- Proper form labels.
- Descriptive image alternatives.
- Accessible navigation.
- Reduced-motion preferences.
- Touch-friendly controls.

Interactive elements must communicate their purpose clearly.

Do not rely only on color to communicate status or meaning.

---

## 17. Internationalization and Nepali Typography

The design system must support English and Nepali.

Requirements:

- Correct Unicode rendering.
- Appropriate Nepali font support.
- Comfortable line height for Devanagari.
- Layouts that accommodate longer translated text.
- Flexible button and navigation widths.
- Correct punctuation and spacing.
- No clipped or overlapping text.

Avoid hardcoded dimensions that assume English text lengths.

---

## 18. Design Tokens and Implementation

Keep the design system centralized and reusable.

Suggested token categories:

```text
design-tokens/
  colors
  typography
  spacing
  layout
  borders
  shadows
  motion
  breakpoints
```

The exact implementation location should follow the existing codebase structure.

### 18.1 Token Principles

- Use semantic names.
- Avoid duplicated values.
- Avoid random one-off styles.
- Maintain consistent spacing.
- Keep component styles reusable.
- Document intentional exceptions.

### 18.2 Component Principles

- Build reusable components where repetition exists.
- Avoid overengineering simple elements.
- Keep component responsibilities clear.
- Support responsive behavior.
- Support accessibility by default.

---

## 19. Quality Standards

Every implemented design element should pass the following checks.

| Area | Quality requirement |
|---|---|
| Visual consistency | Follows the established design language |
| Typography | Clear hierarchy and readable content |
| Colors | Uses approved semantic tokens |
| Branding | Preserves authentic AayusX identity |
| Technology logos | Authentic and correctly presented |
| Interaction | Clear and purposeful |
| Responsiveness | Works across device sizes |
| Accessibility | Keyboard and reduced-motion support |
| Performance | Does not introduce unnecessary overhead |
| Content | Accurate and authentic |

---

## 20. Design Review Checklist

Before approving a section or component:

- [ ] Does it feel like AayusX?
- [ ] Does it follow the Liquid Atlas direction?
- [ ] Is the hierarchy clear?
- [ ] Is the typography readable?
- [ ] Are approved colors used correctly?
- [ ] Are the images relevant and high quality?
- [ ] Are logos authentic?
- [ ] Does the interaction serve a purpose?
- [ ] Does it work on mobile?
- [ ] Does it support keyboard navigation?
- [ ] Does it respect reduced-motion settings?
- [ ] Does it avoid unnecessary performance costs?
- [ ] Does it avoid generic AI-generated design patterns?

---

## 21. Pending Visual Decisions

The following items must be finalized during design prototyping:

1. Exact color values from the selected palette reference.
2. Final spacing and container measurements.
3. Logo variants and usage dimensions.
4. Final component dimensions and states.
5. Cinematic introduction visual details.
6. Animation timing and easing values.
7. Desktop, tablet, and mobile layout specifications.

Typography families and scale are confirmed in section 5 and implemented in `src/styles/tokens.css`.

These decisions should be validated visually rather than invented during implementation.

---

## 22. Final Design Principle

AayusX should look like a distinctive personal technology identity built with intention.

The website should combine editorial storytelling, modern engineering, authentic project evidence, and carefully controlled interaction.

**The goal is not to make the website look complicated. The goal is to make every detail feel considered, recognizable, and worth remembering.**

---

## 23. Liquid Atlas Implementation Addendum

This addendum records the earlier Liquid Atlas implementation. Its palette, glass-lens treatment, liquid display type, and continuous-float motion are superseded by the Ink & Plum refinement in section 24.

### 23.1 Current tokens

Implemented in `src/styles/tokens.css`:

| Token | Value |
|---|---|
| `--color-paper` | `#f4f0ff` |
| `--color-paper-deep` | `#e8dfff` |
| `--color-surface` | `#faf8ff` |
| `--color-ink` | `#1a1029` |
| `--color-ink-secondary` | `#5b4f70` |
| `--color-violet` | `#6d28d9` |
| `--color-violet-deep` | `#4b2a83` |
| `--color-violet-soft` | `#e9e2ff` |
| `--color-purple-deep` | `#1a0b33` |
| `--color-lavender` | `#a78bfa` |
| `--color-clay` | `#b45f3c` |

### 23.2 Section compositions

- **Home:** circular glass lens portrait, Changa, tide line, liquid display phrase, dark violet About band.
- **About:** lens portrait with dashed ring and a deep-violet quote band.
- **Journey:** deep-violet chapter, year map, vertical route, violet-soft change notes.
- **Projects:** dark lead cover, higher-contrast covers, staggered gallery.
- **Experiments:** lab bento, violet physics feature, terminal and video modules, static AI architecture diagram.
- **Capabilities:** indexed capability rows, dark technology wall, proof links.
- **Writing:** violet featured-story panel, light archive rail.
- **Article:** violet chapter header, lilac-white long-form prose, related reading.
- **Contact:** dark ripple chapter, light form and direct details.
- **Footer:** deep-violet bookend, large wordmark, static Changa, mascot toggle.

### 23.3 Media and motion

- Poster frames for the Gesture Solar and Memory Game videos were extracted from the supplied footage and stored as `public/media/gesture-solar-poster.jpg` and `public/media/memory-game-poster.jpg`.
- The Gesture Solar poster is cropped to exclude the demo’s debug overlay; the video itself is unchanged.
- The AI architecture diagram is static, `aria-hidden`, and uses only labels already present in the project copy.
- Liquid text remains limited to the homepage phrase and the opening wordmark. The rest of the site uses solid type.
- Changa remains DOM/SVG/CSS; no WebGL is required for the identity.

### 23.4 Verification

- `npm run build` passes.
- `npm test` passes 26 tests across 4 files.
- axe WCAG A/AA reports 0 violations on Home, About, Journey, Projects, Contact, Article, Experiments, Capabilities, and Writing. Gradient/pseudo-element contrast checks and video-caption checks remain “incomplete” where axe cannot determine a background or captions are not supplied.
- No horizontal overflow at 320px, 390px, or 1440px on the audited pages.
- The physics experiment remains an opt-in lazy chunk.

---

## 24. Ink & Plum Refinement — Humanity and Performance Pass

This section supersedes the Liquid Atlas palette, glass-lens portrait, liquid display type, and continuous-float motion in sections 3 and 23.

### 24.1 Current tokens

| Token | Value |
|---|---|
| `--color-paper` | `#f2eee6` |
| `--color-paper-secondary` | `#eae3d8` |
| `--color-surface` | `#fbf8f2` |
| `--color-ink` | `#201a1b` |
| `--color-ink-secondary` | `#5d5350` |
| `--color-ink-tertiary` | `#6b5f5a` |
| `--color-violet` | `#6b2d4b` |
| `--color-violet-deep` | `#451f33` |
| `--color-violet-soft` | `#eadfe0` |
| `--color-purple-deep` | `#1f171b` |
| `--color-lavender` | `#c3a6ad` |
| `--color-clay` | `#b45f3c` |
| `--color-clay-deep` | `#843d20` |

### 24.2 What changed

- Display type moved from Manrope to **Bricolage Grotesque**; DM Sans remains body/UI, IBM Plex Mono remains technical metadata.
- The home headline is now specific and solid: “I build software for schools and small businesses.” No gradient or SVG-filtered material.
- Removed `LiquidText`, its SVG turbulence/displacement filter, and its animated gradient material. The opening uses a solid warm-bone wordmark.
- Replaced the circular glass lens and dashed rotating ring with a rectangular 4:5 portrait and a caption rule.
- Removed the fixed dot-field background, sticky-header backdrop blur, purple radial glows, project-cover grid texture, contact ripple rings, and the rotating/floating decorative animations.
- Flattened tags and status labels into plain text; removed pill borders and uppercase tracking. Page eyebrows are sentence-case labels with a small clay dot; numbered “01 —” labels were removed.
- Reduced deep-violet sections to flat near-black aubergine fields.
- Rewrote the most visible page titles and labels in plain, specific language; removed the numbered section labels and several em-dash constructions.
- Reduced the footer’s top gap and removed double section padding on About.
- Lenis `lerp` moved from 0.1 to 0.16 for a more responsive wheel feel.
- The Changa cursor no longer runs a permanent animation frame. It starts on pointer movement and stops when settled; its idle float and drop-shadow were removed.

### 24.3 Verification

- `npm run build` passes.
- `npm test` passes 26 tests across 4 files.
- Axe WCAG A/AA reports **0 violations** on Home, About, Journey, Projects, Experiments, Capabilities, Writing, Article, and Contact. Remaining incomplete items are video-caption checks and contrast checks against pseudo/gradient backgrounds.
- No horizontal overflow at 320px, 390px, or 1440px.
- A headless wheel-scroll sample recorded 462 frames: average 11.1ms, p95 11.4ms, max 22.5ms, and zero frames over 33ms.
- The production CSS bundle dropped from ~72.5 kB to ~66.0 kB after deleting the liquid filter/material.

### 24.4 Still needed from the owner

The design can only become more specific with real evidence. The next pass needs:

- Actual project screenshots: Mother School admin, report card, attendance or payment screen; the loan ledger; FailFirst Engine challenge screen; Yugya homepage/dashboard; Gesture Solar and AayushAI if usable.
- One or two candid working photographs, preferably in a real school, office, hackathon, or desk environment.
- A portrait with a neutral or real environment background if available; the current studio portrait is real but its purple backdrop reads as stock.
- Any verified dates/roles that are not already in the journey.
- A short writing sample in Aayush’s own voice so the remaining copy can be edited away from generated-sounding phrasing.
- A logo/favicon source if a real mark exists; otherwise the type wordmark stays.

