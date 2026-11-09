# Accessibility Guidelines

## 1. Purpose

This document defines accessibility requirements and implementation standards for the AayusX portfolio.

The goal is to make the website usable, understandable, and navigable for people with different abilities, devices, input methods, and browsing preferences.

Accessibility must be considered throughout design, development, implementation, and testing—not added as a final visual adjustment.

### Accessibility target

**WCAG 2.2 Level AA**

The website should aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.

All major sections, interactions, navigation systems, forms, and content experiences must be designed with accessibility in mind.

---

## 2. Core Accessibility Principles

Every implementation should follow these principles:

1. **Perceivable:** Users must be able to perceive relevant information through appropriate visual, textual, and alternative representations.
2. **Operable:** Navigation and interactions must work with different input methods, including keyboards and touch.
3. **Understandable:** Content, navigation, feedback, and interactions must remain clear and predictable.
4. **Robust:** The website must work with modern browsers, assistive technologies, and semantic HTML.

Accessibility should improve the experience for everyone, not create a separate simplified experience for certain users.

---

## 3. Semantic HTML and Document Structure

Use semantic HTML elements wherever appropriate.

### Requirements

- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` appropriately.
- Maintain a logical heading hierarchy.
- Use buttons for actions and links for navigation.
- Associate form labels with their corresponding inputs.
- Use lists for groups of related items.
- Avoid unnecessary generic containers when semantic elements are available.
- Ensure interactive elements have accessible names.
- Avoid using HTML elements solely for their default visual appearance.

### Heading hierarchy

Each page should have a logical heading structure.

Example:

```html
<h1>Selected Projects</h1>

<section>
  <h2>Featured Work</h2>
  <article>
    <h3>Project Name</h3>
  </article>
</section>
```

Do not choose heading levels simply because their default font sizes look appropriate.

---

## 4. Keyboard Accessibility

Every essential website interaction must be usable without a mouse.

### Requirements

- All interactive elements must be keyboard accessible.
- Use logical keyboard navigation order.
- Provide visible focus indicators.
- Do not create keyboard traps.
- Support standard keyboard interaction patterns.
- Allow users to activate buttons and links using expected keyboard controls.
- Ensure custom components follow established accessibility patterns.

### Common keyboard interactions

| Key | Expected behaviour |
|---|---|
| Tab | Move to the next interactive element |
| Shift + Tab | Move to the previous interactive element |
| Enter | Activate links and appropriate controls |
| Space | Activate buttons and appropriate controls |
| Escape | Close dismissible menus, dialogs, and overlays |
| Arrow keys | Navigate within components that support arrow-key interaction |

### Focus indicators

Focus must always be visible.

- Use a clear focus outline or equivalent indicator.
- Maintain sufficient contrast.
- Do not remove browser focus styles without providing an accessible replacement.
- Ensure focus indicators are not hidden behind sticky elements or overlays.

### Focus management

When opening a dialog or overlay:
- Move focus into the newly opened interface.
- Keep keyboard focus within modal dialogs when appropriate.
- Return focus to the original trigger when the interface closes.
- Ensure the user can identify and dismiss the interface.

---

## 5. Navigation Accessibility

The navigation system is a central part of the AayusX experience.

Creative navigation must remain predictable and accessible.

### Requirements

- Provide a clear navigation structure.
- Use descriptive link labels.
- Support keyboard navigation.
- Provide visible focus states.
- Indicate the current page or active section where appropriate.
- Ensure menus can be opened and closed using a keyboard.
- Avoid navigation that depends exclusively on hover.
- Provide accessible labels for icon-only controls.

### Mobile navigation

- Use appropriately sized touch targets.
- Ensure the menu can be opened and closed without precise gestures.
- Prevent background content from interfering with an open modal menu.
- Keep navigation labels readable.
- Ensure focus behaviour is predictable.

### Skip navigation

Provide a skip link that allows keyboard users to bypass repeated navigation and move directly to the main content.

Example:

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<main id="main-content">
  <!-- Main page content -->
</main>
```

The skip link should become visible when focused.

---

## 6. Typography and Readability

Typography must remain readable across the entire portfolio.

### Requirements

- Use readable font sizes.
- Maintain appropriate line height.
- Avoid excessively long text lines.
- Provide sufficient spacing between paragraphs.
- Avoid low-contrast text.
- Ensure text remains readable when users zoom in.
- Do not communicate essential information through font weight or color alone.
- Support browser text scaling.

### Editorial typography

The website uses expressive serif headlines paired with readable sans-serif body typography.

This visual direction must not compromise readability.

- Decorative typography should not be used for long paragraphs.
- Body text should remain comfortably readable.
- Small metadata should not become excessively small.
- Text must not overlap or become clipped at different viewport sizes.

### Text resizing

The website should remain functional at 200% browser zoom without loss of essential content or functionality.

---

## 7. Color and Contrast

The warm editorial identity must maintain accessible contrast.

### WCAG contrast targets

| Content | Minimum contrast ratio |
|---|---:|
| Normal text | 4.5:1 |
| Large text | 3:1 |
| Meaningful interface components | 3:1 |
| Important graphical elements | 3:1 |

### Requirements

- Check text against its actual background.
- Verify botanical green and clay accents before using them for text.
- Do not use color as the only way to communicate status.
- Provide additional visual indicators for errors and success states.
- Ensure links remain distinguishable from surrounding text.
- Check contrast in hover, focus, active, and disabled states.

The final palette must be tested after implementation. A visually attractive color combination is not automatically accessible.

---

## 8. Animation and Motion Accessibility

The portfolio includes a cinematic introduction, scrolling effects, transitions, and selected interactive experiences.

Motion must remain purposeful and optional where possible.

### Requirements

- Respect `prefers-reduced-motion`.
- Provide simplified alternatives for motion-heavy experiences.
- Avoid unnecessary continuous animation.
- Avoid flashing content that could create accessibility risks.
- Do not communicate essential information only through animation.
- Keep important content accessible without waiting for transitions.
- Ensure animation does not interfere with keyboard interaction.

### Reduced-motion support

Example:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This is a starting example, not a universal solution.

JavaScript-driven animations, Framer Motion transitions, Lenis scrolling, and Three.js scenes must also account for reduced-motion preferences.

Avoid globally disabling every animation without checking whether the resulting interface still works correctly.

### Cinematic introduction

The purple memory introduction must:

- Offer a visible skip option.
- Avoid forcing visitors to wait.
- Support a reduced-motion presentation.
- Remain understandable without animation.
- Provide a way to replay it when appropriate.
- Never block access to the main website.
- Avoid relying on rapid flashes for visual transitions.

### Scroll experiences

- Do not trap users in scroll-controlled animations.
- Preserve normal scrolling behaviour.
- Avoid scroll effects that make reading difficult.
- Provide alternatives when an interaction depends on precise scrolling.

---

## 9. Image and Media Accessibility

Visual assets must communicate information accessibly.

### Images

- Provide meaningful alternative text for informative images.
- Use empty alt text for decorative images.
- Avoid repeating nearby text unnecessarily.
- Provide descriptions for complex diagrams.
- Maintain appropriate contrast around important visual content.

Example:

```tsx
<img
  src="/assets/projects/project-preview.webp"
  alt="Dashboard showing the project's main application interface"
/>
```

Decorative image:

```tsx
<img
  src="/assets/decoration/pattern.svg"
  alt=""
/>
```

### Video

- Provide captions for videos containing meaningful speech or sound.
- Provide transcripts where appropriate.
- Avoid autoplay with sound.
- Provide accessible playback controls.
- Do not rely exclusively on video to communicate important information.
- Respect reduced-motion preferences.

### 3D content

- Provide an alternative to essential information displayed through a 3D scene.
- Ensure interactive controls are keyboard accessible.
- Provide appropriate labels and instructions.
- Do not make essential navigation dependent on 3D interaction.
- Provide static fallbacks when 3D rendering is unavailable.

---

## 10. Internationalization and Language Accessibility

The AayusX portfolio is intended to support English and Nepali, with the possibility of additional languages later.

**Important implementation status:** An external open-source i18n project has been identified as a possible solution. It is not assumed to be installed in the AayusX repository.

The actual library must be evaluated and integrated deliberately.

### Requirements

- Set the correct document language.
- Update the document language when users switch languages.
- Provide a clearly identifiable language switcher.
- Ensure the language switcher works with keyboards and screen readers.
- Translate accessible labels and error messages.
- Preserve the current page or section when changing languages where practical.
- Ensure Nepali text renders correctly.
- Use fonts with appropriate Nepali glyph coverage.
- Avoid clipping or overlapping translated text.
- Support longer translated labels and content.

### Language metadata

For English:

```html
<html lang="en">
```

For Nepali:

```html
<html lang="ne">
```

### Language switching

The language selector must:
- Have an accessible name.
- Clearly communicate the currently selected language.
- Be keyboard operable.
- Provide understandable feedback when the language changes.
- Avoid relying only on flags to identify languages.

### Screen-reader announcements

When a language change significantly updates the page, provide appropriate announcements or predictable navigation behaviour.

Do not unnecessarily move focus or interrupt users.

---

## 11. Form Accessibility

The Contact section must be accessible to keyboard and assistive-technology users.

### Requirements

- Provide visible labels for all form fields.
- Associate labels with inputs.
- Identify required fields.
- Explain expected input formats.
- Provide accessible validation messages.
- Clearly communicate submission status.
- Preserve entered information when appropriate after validation errors.
- Avoid relying exclusively on color to indicate errors.

### Example

```html
<label for="email">Email address</label>

<input
  id="email"
  name="email"
  type="email"
  autocomplete="email"
  required
/>
```

### Error handling

When validation fails:

- Identify the field with the problem.
- Explain how to correct it.
- Associate the message with the relevant input.
- Make errors discoverable to screen readers.
- Provide a clear route back to the invalid field.

### Submission feedback

The form must provide understandable feedback for:

- Successful submission.
- Validation failure.
- Network failure.
- Server-side failure.

A successful-looking interface must never imply that a message was delivered when submission actually failed.

---

## 12. Interactive Components

All custom interactive components must have accessible behaviour.

This includes:

- Navigation menus.
- Project filters.
- Project previews.
- Expandable project overlays.
- Dialogs and modals.
- Carousels.
- Language selectors.
- Interactive 3D controls.
- Scroll-triggered interfaces.

### General requirements

- Use native HTML controls where possible.
- Give controls meaningful accessible names.
- Provide keyboard support.
- Maintain visible focus.
- Communicate active and selected states.
- Ensure controls have appropriate touch targets.
- Avoid interactions that depend exclusively on hover.
- Ensure content remains accessible when JavaScript fails where practical.

### Carousels

- Provide controls to move between items.
- Make controls keyboard accessible.
- Communicate the current position where appropriate.
- Avoid automatically moving content without a user benefit.
- Provide understandable pause or stop controls when auto-rotation is used.

### Dialogs and overlays

- Provide an accessible title.
- Support Escape to close where appropriate.
- Manage focus correctly.
- Prevent interaction with obscured background content when modal.
- Return focus to the triggering control when closed.

---

## 13. Responsive Accessibility

Accessibility must work across desktop, tablet, and mobile.

### Requirements

- Prevent horizontal scrolling caused by layout errors.
- Preserve readable typography at different viewport sizes.
- Support touch interaction.
- Maintain appropriate spacing between controls.
- Ensure content remains available when the layout changes.
- Avoid hover-only features on touch devices.
- Test zoom and text resizing.
- Keep essential information visible.

Responsive layouts must not remove important functionality from mobile users.

---

## 14. Screen Reader Compatibility

The website should work with commonly used screen readers.

### Requirements

- Use semantic HTML.
- Maintain logical heading order.
- Provide meaningful link text.
- Label form controls.
- Provide accessible names for icon-only buttons.
- Announce important status changes appropriately.
- Avoid unnecessary ARIA attributes.
- Ensure interactive elements expose their correct roles and states.

### ARIA principles

Prefer native semantic HTML over custom ARIA implementations.

ARIA should be used only when necessary to communicate information that native HTML cannot adequately express.

Incorrect ARIA can make an interface less accessible.

---

## 15. Accessibility and SEO

Accessibility and search-engine structure should support each other.

Requirements:

- Use meaningful headings.
- Provide descriptive page titles.
- Use semantic links.
- Provide image alternative text.
- Define the correct document language.
- Maintain logical content structure.
- Avoid hiding essential content from assistive technologies.
- Ensure translated content has appropriate language metadata.

SEO enhancements must not interfere with accessibility.

---

## 16. Accessibility Testing

Accessibility must be tested throughout development.

### Automated testing

Use suitable tools such as:

- Lighthouse accessibility audits.
- axe DevTools or axe-core.
- Browser accessibility inspection tools.
- Automated component-level accessibility checks.

Automated tools can detect many issues but cannot establish complete WCAG conformance.

### Manual testing

Test the website using:

- Keyboard-only navigation.
- Browser zoom at 200%.
- Screen-reader navigation.
- Reduced-motion settings.
- Mobile touch interaction.
- Form validation and submission.
- Language switching.
- Interactive menus and dialogs.
- Different viewport sizes.

### Screen-reader testing

Where practical, test with commonly used combinations such as:

- NVDA with Firefox.
- VoiceOver with Safari.

Testing should include both navigation and actual content consumption.

---

## 17. Accessibility Quality Checklist

### Structure and content

- [ ] Semantic HTML is used appropriately.
- [ ] Heading hierarchy is logical.
- [ ] Page language is correctly declared.
- [ ] Links and buttons have meaningful labels.
- [ ] Images have appropriate alternative text.

### Keyboard

- [ ] All essential functionality works using a keyboard.
- [ ] Focus indicators are visible.
- [ ] Navigation order is logical.
- [ ] No keyboard traps exist.
- [ ] Dialogs manage focus correctly.

### Visual accessibility

- [ ] Text contrast meets WCAG AA targets.
- [ ] Text remains readable at 200% zoom.
- [ ] Content does not overlap or become clipped.
- [ ] Color is not the only way information is communicated.

### Motion

- [ ] Reduced-motion preferences are respected.
- [ ] Cinematic introduction can be skipped.
- [ ] Important content does not depend on animation.
- [ ] No unnecessary forced scrolling or waiting exists.

### Internationalization

- [ ] English and Nepali language metadata are correct.
- [ ] Language selector is keyboard accessible.
- [ ] Translated content remains readable.
- [ ] Nepali typography renders correctly.
- [ ] Form errors and accessible labels are translated.

### Forms and interactions

- [ ] Every form field has a visible label.
- [ ] Validation errors are understandable.
- [ ] Submission feedback is accessible.
- [ ] Interactive components expose appropriate states.
- [ ] Mobile touch interaction works correctly.

### Testing

- [ ] Lighthouse accessibility audit completed.
- [ ] Automated accessibility checks completed.
- [ ] Keyboard-only testing completed.
- [ ] Screen-reader testing performed.
- [ ] Desktop and mobile layouts reviewed.
- [ ] Known accessibility issues documented.

---

## 18. Definition of Done

Accessibility work is not complete simply because automated tools report no errors.

A release is ready when:

1. No known critical accessibility blockers remain.
2. Essential journeys work with keyboard navigation.
3. Navigation, forms, and interactive components are understandable.
4. Motion preferences are respected.
5. Content remains usable at different viewport sizes and zoom levels.
6. Language switching and translated content remain accessible.
7. Automated and manual testing have been completed.
8. Remaining minor issues are documented with a plan for resolution.

---

## 19. Final Principle

Accessibility is part of the AayusX product experience, not a separate feature.

The portfolio should be visually distinctive, immersive, and technically impressive while remaining usable by as many people as possible.

**A memorable experience should never come at the cost of accessibility.**