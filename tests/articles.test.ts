import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ARTICLE_SLUGS, getArticleBody } from '../src/content/articles';
import { en } from '../src/i18n/en';
import { ne } from '../src/i18n/ne';

const writingDirectory = fileURLToPath(
  new URL('../src/content/writing/', import.meta.url),
);

describe('writing content', () => {
  it('has metadata in both languages for every article', () => {
    for (const slug of ARTICLE_SLUGS) {
      expect(en.articles).toHaveProperty(slug);
      expect(ne.articles).toHaveProperty(slug);
    }
  });

  it('has a non-empty Markdown file in both languages', () => {
    for (const slug of ARTICLE_SLUGS) {
      for (const language of ['en', 'ne']) {
        const path = `${writingDirectory}${language}/${slug}.md`;
        expect(existsSync(path), path).toBe(true);
        expect(readFileSync(path, 'utf8').trim().length, path).toBeGreaterThan(0);
      }
    }
  });

  it('returns localized bodies and falls back to English', () => {
    const slug = ARTICLE_SLUGS[0];
    expect(getArticleBody(slug, 'en')).toContain('spreadsheet');
    expect(getArticleBody(slug, 'ne').length).toBeGreaterThan(0);
  });
});
