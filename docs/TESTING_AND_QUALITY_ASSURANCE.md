

# Testing & Quality Assurance

**Project:** AayusX Portfolio  
**Document:** Testing and Quality Assurance  
**Status:** Approved Guidelines

## 1. Purpose

Ensure the AayusX portfolio works reliably, looks polished, performs efficiently, and provides a consistent experience across devices and browsers.

Testing must happen throughout development, not only before deployment.

## 2. Quality Principles

- Functionality must take priority over decorative effects.
- Every interactive element must work as expected.
- Visual consistency must be maintained across all pages and sections.
- Performance must not be sacrificed for visual complexity.
- Accessibility must be considered throughout implementation.
- No unfinished features, broken links, placeholder content, or misleading information should reach production.

## 3. Automated Testing

### 3.1 Code Quality

Run the following checks before merging or deploying:

- TypeScript type checking.
- Production build.
- Linting, if configured.
- Automated tests for important application logic.
- Dependency and build-error checks.

All critical errors must be resolved before production deployment.

### 3.2 Functional Testing

Test important functionality, including:

- Navigation and section transitions.
- Intro animation, skip, and replay controls.
- Project filters and project details.
- Interactive previews and external links.
- Language switching and translation loading.
- Contact form validation and submission.
- Theme or interface controls, if implemented.
- Downloadable résumé.
- Writing article navigation and categories.

### 3.3 Browser Automation

Use browser automation where practical to verify essential user journeys.

At minimum, test:

1. Opening the website.
2. Completing or skipping the introduction.
3. Navigating between main sections.
4. Opening a project and following its links.
5. Switching between English and Nepali.
6. Submitting the contact form.
7. Accessing the website on a mobile viewport.

## 4. Manual Visual Testing

Review the website at multiple viewport sizes.

| Device | Suggested viewport |
|---|---|
| Small mobile | 360 × 800 |
| Standard mobile | 390 × 844 |
| Large mobile | 430 × 932 |
| Tablet | 768 × 1024 |
| Laptop | 1366 × 768 |
| Desktop | 1440 × 900 |
| Large desktop | 1920 × 1080 |

Check:

- Layout alignment and spacing.
- Typography and readability.
- Image quality and cropping.
- Navigation behavior.
- Responsive interactions.
- Animation timing and smoothness.
- Horizontal overflow.
- Footer and contact layout.

The design should feel intentional at every size, not simply scaled down from desktop.

## 5. Performance Testing

Use Google Lighthouse to evaluate:

- Performance.
- Accessibility.
- Best Practices.
- SEO.

Test both desktop and mobile.

Pay particular attention to:

- Initial page loading.
- Largest Contentful Paint.
- Cumulative Layout Shift.
- Interaction responsiveness.
- Image and font optimization.
- JavaScript bundle size.
- Lazy loading of heavy content.
- Three.js and 3D scene performance.
- Animation smoothness.

### Performance Requirements

- Keep the initial experience lightweight.
- Load expensive 3D assets only when needed.
- Avoid unnecessary JavaScript and dependencies.
- Prevent layout shifts.
- Optimize images without visibly reducing quality.
- Provide simplified experiences for lower-powered devices.
- Respect reduced-motion preferences.

Lighthouse scores should be treated as indicators for improvement, not as a substitute for real-device testing.

## 6. Accessibility Testing

Verify that:

- Semantic HTML is used appropriately.
- All functionality is keyboard accessible.
- Focus indicators are visible.
- Text has sufficient contrast.
- Images have meaningful alternative text.
- Forms have accessible labels and error messages.
- Interactive elements have clear accessible names.
- Animations respect `prefers-reduced-motion`.
- Navigation remains understandable without animation.
- Nepali text renders correctly and remains readable.

Test the website using keyboard navigation and, where practical, a screen reader.

## 7. Multilingual Testing

Test both English and Nepali.

Verify:

- Every required interface element has a translation.
- No missing translation keys appear.
- The language switcher works consistently.
- Switching languages preserves the current page or section.
- Browser language detection works on the first visit.
- Manual language selection is respected on later visits.
- Nepali fonts and line wrapping render correctly.
- Page titles and metadata update appropriately.
- Language attributes and multilingual SEO metadata are correct.

The selected open-source i18n library must be evaluated and tested after integration.

## 8. Contact Form Testing

Verify:

- Required fields are validated.
- Invalid email addresses are rejected.
- Empty submissions are prevented.
- Spam protection works.
- Submission feedback is clear.
- Success and failure states are handled correctly.
- Email notifications reach the intended destination.
- Sensitive credentials remain server-side.

Never expose API keys, email service credentials, or other secrets in client-side code.

## 9. Cross-Browser Testing

Test the latest stable versions of:

- Chrome.
- Firefox.
- Safari.
- Microsoft Edge.

Pay particular attention to animation, typography, WebGL support, scrolling, and responsive behavior.

Where browser capabilities differ, provide a graceful fallback rather than allowing the experience to break.

## 10. Content and SEO Verification

Before launch, verify:

- All personal information is accurate.
- No invented achievements, testimonials, statistics, or experience claims exist.
- Project descriptions reflect actual work.
- External links work and point to the intended destinations.
- Page titles and descriptions are correct.
- Canonical URLs are correct.
- Open Graph and social preview images display properly.
- Sitemap and robots.txt are configured.
- Structured data contains accurate information.
- English and Nepali metadata are correctly configured.

## 11. Deployment Testing

After deployment to the production domain:

- Confirm HTTPS works.
- Verify the production build loads correctly.
- Check all routes and direct page URLs.
- Test contact form submission.
- Verify images, fonts, and other assets load.
- Confirm GitHub deployment integration works.
- Check that no development-only content or debugging messages remain.
- Review browser console errors.
- Verify the website on a real mobile device.

## 12. Release Acceptance Criteria

A release is ready only when:

- [ ] Production build succeeds.
- [ ] No critical runtime errors remain.
- [ ] All primary navigation works.
- [ ] Intro can be skipped and replayed.
- [ ] Main sections render correctly.
- [ ] Project links and details work.
- [ ] English and Nepali switching works.
- [ ] Contact form works and provides feedback.
- [ ] Responsive layouts have been reviewed.
- [ ] Accessibility issues have been reviewed.
- [ ] Performance issues have been investigated.
- [ ] SEO metadata has been verified.
- [ ] No placeholder or misleading content remains.
- [ ] Production deployment has been checked.

## 13. Testing Workflow

Follow this sequence during development:

1. Test individual components while building.
2. Test interactions after integrating sections.
3. Run type checks and production builds regularly.
4. Test responsive layouts throughout implementation.
5. Run automated and manual accessibility checks.
6. Test multilingual functionality after integration.
7. Run Lighthouse before release.
8. Perform complete browser and device testing.
9. Verify the production deployment.

## 14. Final Quality Standard

The AayusX portfolio should feel like a carefully engineered, professionally designed digital experience.

It must be visually distinctive without becoming difficult to use, technically impressive without becoming unnecessarily complex, and immersive without sacrificing accessibility or performance.

A feature should not be considered complete simply because it looks correct. It must also function reliably, communicate clearly, and work across supported devices.

