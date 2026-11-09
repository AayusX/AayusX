# SEO and Metadata Guidelines

## 1. Purpose

This document defines the search engine optimization (SEO), metadata, indexing, and social-sharing standards for the AayusX portfolio.

The objective is to make AayusX discoverable, accurately represented, and technically accessible to search engines while maintaining a consistent professional identity.

SEO should support the website's actual content and credibility. It must never rely on misleading descriptions, keyword stuffing, fabricated achievements, or search-engine manipulation.

### Primary objectives

- Establish AayusX as a recognizable personal technology brand.
- Improve discoverability through relevant search queries.
- Represent AayusX and Aayush accurately.
- Ensure project pages can be discovered and understood.
- Support English and Nepali content.
- Generate attractive and accurate social previews.
- Maintain technically correct indexing and canonical URLs.
- Preserve performance and accessibility.

---

## 2. SEO Principles

Every SEO implementation must follow these principles:

1. **Accuracy:** All metadata must describe real website content.
2. **Relevance:** Optimize for meaningful topics rather than excessive keywords.
3. **Consistency:** Maintain a consistent AayusX identity across pages.
4. **Discoverability:** Ensure important pages can be crawled and indexed.
5. **Multilingual support:** Provide correct language metadata and indexing signals.
6. **Performance:** SEO improvements must not unnecessarily increase page weight.
7. **Structured information:** Use valid structured data where appropriate.
8. **User-first content:** Write for people before search engines.

---

## 3. Brand and Search Positioning

AayusX should be positioned as a personal technology identity representing an ambitious technology builder who creates useful digital products and explores engineering solutions.

### Brand identity

- Brand: AayusX
- Person: Aayush Bhandari
- Positioning: Technology entrepreneur and Computer Engineering student.
- Website: `https://aayusx.dev`

### Primary content themes

- Software development.
- Technology and engineering.
- Digital product building.
- Application development.
- Technical experiments.
- Personal learning and development.
- Entrepreneurship and problem-solving.

These themes should appear naturally throughout relevant content.

Do not claim professional experience, qualifications, products, or business achievements that cannot be verified.

---

## 4. Page-Level Metadata

Every indexable page must have appropriate metadata.

### Required metadata

- Page title.
- Meta description.
- Canonical URL.
- Document language.
- Relevant Open Graph metadata.
- Appropriate social-sharing image where applicable.

### Title requirements

Page titles should:

- Clearly describe the page.
- Include AayusX where appropriate.
- Be unique across indexable pages.
- Use natural language.
- Avoid excessive keyword repetition.
- Communicate the page's actual subject.

Recommended starting format:

`Page Subject | AayusX`

Example:

`Projects and Digital Products | AayusX`

### Description requirements

Meta descriptions should:

- Summarize the page accurately.
- Be unique where possible.
- Use natural language.
- Explain why the page is useful.
- Avoid generic promotional statements.
- Avoid keyword stuffing.

Descriptions should be written for each important page rather than copied across the entire website.

### Example

```html
<title>Projects and Digital Products | AayusX</title>

<meta
  name="description"
  content="Explore software projects, digital products, and engineering experiments by Aayush Bhandari."
/>
```

The final wording should be refined using the actual published content.

---

## 5. Page-Specific SEO

Different sections require different metadata.

| Section | SEO focus |
|---|---|
| Home | AayusX brand and personal introduction |
| About | Aayush Bhandari and professional background |
| Journey | Learning, development, and milestones |
| Projects | Real software projects and their functionality |
| Experiments | Technical explorations and prototypes |
| Capabilities | Technologies, engineering skills, and solutions |
| Writing | Articles, tutorials, and technical insights |
| Contact | Professional enquiries and collaboration |

### Homepage

The homepage should introduce AayusX clearly.

Its metadata should communicate:
- The AayusX identity.
- The person behind the brand.
- The website's technology and product-building focus.

### Project pages

Important projects should receive dedicated pages when they provide meaningful content.

Each indexable project page should include:
- Project name.
- Accurate description.
- Project purpose.
- Relevant technologies.
- Aayush's actual role.
- Project status.
- Relevant visual assets.
- Links to available demonstrations or repositories.

Do not index empty case-study pages or pages containing only placeholder content.

### Writing pages

Each published article should have:
- A unique title.
- A meaningful description.
- An author.
- A publication date.
- An updated date when relevant.
- Appropriate categories or tags.
- A canonical URL.
- Relevant social preview metadata.

Only published, useful articles should be indexable.

---

## 6. URL Structure

URLs should be readable, consistent, and predictable.

Recommended structure:

```text
https://aayusx.dev/
https://aayusx.dev/about
https://aayusx.dev/journey
https://aayusx.dev/projects
https://aayusx.dev/experiments
https://aayusx.dev/capabilities
https://aayusx.dev/writing
https://aayusx.dev/contact
```

Potential detail pages:

```text
/projects/project-name
/writing/article-name
```

### URL requirements

- Use lowercase paths.
- Use hyphens between words.
- Avoid unnecessary query parameters.
- Avoid duplicate routes.
- Keep URLs stable.
- Use meaningful page names.
- Redirect changed URLs where necessary.

Do not change established URLs without reviewing existing links and search indexing implications.

---

## 7. Canonical URLs

Canonical tags should identify the preferred URL for each indexable page.

Example:

```html
<link
  rel="canonical"
  href="https://aayusx.dev/projects"
/>
```

Requirements:

- Use absolute HTTPS URLs.
- Ensure canonical destinations are valid.
- Use self-referencing canonicals for preferred pages.
- Avoid conflicting canonical declarations.
- Ensure canonical URLs match the intended language and page version.
- Do not canonicalize unrelated pages to the homepage.

Canonical URLs must be generated from the actual routing and localization architecture.

---

## 8. Multilingual SEO

AayusX is intended to support English and Nepali.

The website should be structured so that search engines can identify and understand each language version.

**Implementation note:** The external open-source i18n solution under consideration must be evaluated before integration. Multilingual SEO requirements should be implemented using the actual routing and localization architecture, not assumed library behaviour.

### Language requirements

- English is the default language.
- Nepali is an additional language.
- Language-specific page content must be genuinely translated.
- Metadata must match the selected language.
- Document language attributes must be correct.
- Search engines must be able to discover each language version.

### Language attributes

English:

```html
<html lang="en">
```

Nepali:

```html
<html lang="ne">
```

### Hreflang

Where separate indexable language URLs exist, provide appropriate alternate-language references.

Example:

```html
<link
  rel="alternate"
  hreflang="en"
  href="https://aayusx.dev/en/projects"
/>

<link
  rel="alternate"
  hreflang="ne"
  href="https://aayusx.dev/ne/projects"
/>

<link
  rel="alternate"
  hreflang="x-default"
  href="https://aayusx.dev/en/projects"
/>
```

These URLs are illustrative. The final structure must match the implemented routing strategy.

### Important multilingual rules

- Each language version should have its own appropriate canonical URL.
- Alternate-language references should be reciprocal.
- Do not identify an untranslated page as a complete translation.
- Do not translate proper names unnecessarily.
- Preserve meaningful technical terminology.
- Ensure Nepali text displays correctly.
- Keep language switching accessible.

If the final implementation uses language selection without distinct indexable URLs, evaluate its SEO limitations before launch.

---

## 9. Open Graph and Social Sharing

Pages should produce accurate, attractive previews when shared on social platforms.

### Required metadata

- Open Graph title.
- Open Graph description.
- Open Graph image.
- Open Graph URL.
- Open Graph type.
- Website or page locale where appropriate.
- Twitter/X card metadata.

### Example

```html
<meta property="og:type" content="website" />

<meta
  property="og:title"
  content="AayusX | Technology and Digital Products"
/>

<meta
  property="og:description"
  content="Explore the work, ideas, and engineering journey behind AayusX."
/>

<meta
  property="og:url"
  content="https://aayusx.dev/"
/>

<meta
  property="og:image"
  content="https://aayusx.dev/assets/brand/social-preview.webp"
/>

<meta name="twitter:card" content="summary_large_image" />
```

### Social preview requirements

- Use high-quality branded imagery.
- Keep text readable at preview sizes.
- Avoid unnecessary visual clutter.
- Use appropriate image dimensions.
- Ensure images are publicly accessible.
- Provide relevant page-specific images where useful.
- Test previews after deployment.

Do not assume that a browser favicon is an appropriate social preview image.

---

## 10. Structured Data

Structured data should help search engines understand the identity and content of the website.

Use JSON-LD where appropriate.

### Person

Represent Aayush as the person behind AayusX.

Potential properties:

- `@type`
- `name`
- `url`
- `image`
- `jobTitle`, when accurate
- `description`
- `sameAs`, for verified public profiles

Example:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Aayush Bhandari",
  "url": "https://aayusx.dev/",
  "image": "https://aayusx.dev/assets/profile/profile-aayush-main.webp",
  "description": "Technology builder exploring software development and digital products.",
  "sameAs": [
    "https://github.com/AayusX"
  ]
}
```

Only include verified profiles and accurate information.

### WebSite

Represent the overall website.

Example:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AayusX",
  "url": "https://aayusx.dev/",
  "description": "The personal technology portfolio of Aayush Bhandari."
}
```

### CreativeWork and SoftwareApplication

For appropriate projects, consider relevant schema types such as:

- `CreativeWork`
- `SoftwareApplication`
- `Article`
- `BlogPosting`

Choose the type that genuinely represents the content.

Do not add unsupported properties or fabricated ratings, reviews, prices, or user statistics.

### Structured data validation

- Validate JSON-LD syntax.
- Confirm all URLs are correct.
- Ensure structured data matches visible page content.
- Avoid duplicate or conflicting entities.
- Revalidate after significant content changes.

Structured data does not guarantee rich search results.

---

## 11. Sitemap

Provide an XML sitemap listing important indexable URLs.

Recommended location:

`https://aayusx.dev/sitemap.xml`

### Sitemap requirements

- Include canonical, indexable URLs.
- Include important project and article pages.
- Include language-specific URLs when applicable.
- Exclude private, duplicate, and irrelevant routes.
- Remove deleted or redirected pages.
- Keep the sitemap updated when content changes.

Example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  <url>
    <loc>https://aayusx.dev/</loc>
  </url>

  <url>
    <loc>https://aayusx.dev/about</loc>
  </url>

  <url>
    <loc>https://aayusx.dev/projects</loc>
  </url>
</urlset>
```

This is an illustrative structure. The production sitemap should be generated from actual published routes.

---

## 12. Robots.txt and Indexing Controls

Provide a valid `robots.txt` file at the website root.

Recommended location:

`https://aayusx.dev/robots.txt`

Example:

```text
User-agent: *
Allow: /

Sitemap: https://aayusx.dev/sitemap.xml
```

### Indexing requirements

- Allow search engines to crawl public content.
- Prevent accidental blocking of important pages.
- Avoid indexing private or unfinished content.
- Use `noindex` where appropriate.
- Do not rely on robots.txt alone to prevent a URL from appearing in search results.
- Check deployment environments before launch.

Preview deployments should not accidentally become competing indexed versions of the production website.

---

## 13. Search-Friendly Content

SEO must reflect the actual quality and usefulness of the content.

### Writing requirements

- Use clear and descriptive headings.
- Write meaningful page introductions.
- Explain technical topics accurately.
- Use relevant internal links.
- Avoid keyword stuffing.
- Avoid duplicated descriptions.
- Use descriptive link text.
- Organize longer content into logical sections.

### Project content

Project descriptions should explain:
- What the project is.
- What problem it addresses.
- Why it was built.
- What technologies were used.
- What was actually implemented.

### Writing content

Technical articles should provide genuine information and original explanations.

Do not publish thin articles created only to target search terms.

---

## 14. Internal Linking

Internal links should help visitors and search engines discover related content.

Examples:

- Connect projects to relevant capabilities.
- Connect experiments to related technical articles.
- Link Journey milestones to actual projects.
- Link articles to relevant projects or technologies.
- Provide navigation between related case studies.

Requirements:

- Use descriptive anchor text.
- Avoid unnecessary repeated links.
- Ensure links work.
- Avoid broken routes.
- Keep navigation understandable.
- Do not use misleading link labels.

---

## 15. Image SEO

Images should be optimized for both usability and discoverability.

Requirements:

- Use descriptive filenames.
- Provide meaningful alt text.
- Optimize image formats and sizes.
- Specify dimensions.
- Use responsive image delivery.
- Avoid unnecessary large files.
- Provide captions where useful.
- Ensure important project images are included in crawlable page content.

Example:

```text
project-statlite-nepal-map.webp
project-sanjog-dashboard.webp
profile-aayush-main.webp
```

Do not fill alt text with repetitive keywords.

---

## 16. Technical SEO and Rendering

The current project uses Vite, React, and TypeScript.

SEO implementation must account for the actual rendering architecture.

### Requirements

- Ensure important content is available to search engines.
- Provide appropriate page titles and descriptions.
- Ensure route changes update metadata correctly.
- Avoid duplicate metadata.
- Handle unknown routes appropriately.
- Ensure canonical URLs remain correct.
- Avoid indexing empty application shells.
- Verify production output rather than relying only on development behaviour.

### Rendering strategy

Evaluate whether the existing application can provide sufficient crawlable content through its current rendering approach.

If necessary, consider:
- Pre-rendering important routes.
- Static generation.
- Server-side rendering where genuinely justified.

Do not migrate to another framework solely for SEO without an evidence-based technical reason.

The solution must remain compatible with the project's deployment and performance requirements.

---

## 17. Search Console and Monitoring

Use Google Search Console to monitor how the website is discovered and indexed.

Recommended checks:

- Verify the production domain.
- Submit the sitemap.
- Inspect important URLs.
- Monitor indexing problems.
- Check canonical selection.
- Review search appearance.
- Investigate crawl errors.
- Review performance trends where useful.

Do not assume that submitting a sitemap guarantees indexing.

Monitoring should be privacy-conscious and should not introduce unnecessary tracking.

---

## 18. SEO and Performance

SEO improvements must not compromise the website's performance.

Requirements:

- Optimize images.
- Minimize unnecessary JavaScript.
- Avoid excessive third-party scripts.
- Load nonessential media lazily.
- Avoid layout shifts.
- Optimize fonts.
- Keep page content responsive.
- Maintain a fast and usable initial experience.

Use Google Lighthouse to audit:

- Performance.
- Accessibility.
- Best Practices.
- SEO.

Audit both desktop and mobile.

Investigate regressions rather than blindly optimizing individual scores.

---

## 19. Existing Metadata Audit

The current repository already contains some SEO-related configuration in `index.html`, including:

- Page title and description.
- Canonical metadata.
- Open Graph and Twitter metadata.
- Structured data.
- Website identity information.

These existing values must be audited before implementation.

Specifically verify:

- Page title and description accuracy.
- Canonical domain and route behaviour.
- Social preview image availability.
- Person information and image paths.
- Structured data accuracy.
- Any outdated location, professional role, or organization claims.
- Whether metadata is updated correctly for individual routes and languages.

Do not blindly duplicate existing metadata or preserve outdated claims.

---

## 20. SEO Implementation Checklist

### Metadata

- [ ] Unique page titles.
- [ ] Accurate descriptions.
- [ ] Valid canonical URLs.
- [ ] Correct document language.
- [ ] No conflicting metadata.

### Multilingual SEO

- [ ] English metadata.
- [ ] Nepali metadata.
- [ ] Correct language attributes.
- [ ] Appropriate language-specific URLs where supported.
- [ ] Valid reciprocal `hreflang` references where applicable.
- [ ] Correct canonical behaviour.

### Social sharing

- [ ] Open Graph metadata.
- [ ] Twitter/X card metadata.
- [ ] High-quality preview images.
- [ ] Valid absolute URLs.
- [ ] Tested social previews.

### Structured data

- [ ] Person schema.
- [ ] WebSite schema.
- [ ] Appropriate project schema.
- [ ] Article schema for published writing.
- [ ] Valid JSON-LD.
- [ ] No fabricated information.

### Technical SEO

- [ ] XML sitemap.
- [ ] Valid robots.txt.
- [ ] Correct indexing controls.
- [ ] Working internal links.
- [ ] Crawlable important content.
- [ ] Appropriate route handling.
- [ ] Production metadata verified.

### Testing

- [ ] Lighthouse SEO audit.
- [ ] Structured data validation.
- [ ] Sitemap validation.
- [ ] Canonical URL inspection.
- [ ] Mobile and desktop checks.
- [ ] Search Console setup.

---

## 21. Definition of Done

SEO implementation is ready for launch when:

1. All important public pages have accurate metadata.
2. Canonical URLs are valid and consistent.
3. Social previews work correctly.
4. Structured data accurately represents the website.
5. Sitemap and robots.txt are available.
6. Multilingual metadata and indexing signals are correct for the implemented routing strategy.
7. Important content is discoverable and crawlable.
8. Existing metadata has been audited.
9. Lighthouse SEO checks have been completed.
10. No known critical indexing or metadata issues remain.

---

## 22. Final Principle

AayusX should be discoverable because it contains genuine work, useful ideas, and meaningful engineering content.

SEO should make that value easier to find—not manufacture an artificial online identity.

**Build something worth discovering, then make it easy to discover.**