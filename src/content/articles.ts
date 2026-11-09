import type { Language } from '../i18n';

export const ARTICLE_SLUGS = [
  'the-spreadsheet-was-the-specification',
  'teach-debugging-not-just-syntax',
  'what-a-school-taught-me-about-boring-software',
] as const;

export type ArticleSlug = (typeof ARTICLE_SLUGS)[number];

export interface ArticleMeta {
  title: string;
  description: string;
  category: string;
  date: string;
  readingTime: number;
}

export const FEATURED_ARTICLE: ArticleSlug = ARTICLE_SLUGS[0];

const markdownFiles = import.meta.glob('./writing/*/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export function getArticleBody(slug: ArticleSlug, language: Language): string {
  const localized = markdownFiles[`./writing/${language}/${slug}.md`];
  const english = markdownFiles[`./writing/en/${slug}.md`];
  return localized ?? english ?? '';
}

export function isArticleSlug(value: string | undefined): value is ArticleSlug {
  return ARTICLE_SLUGS.includes(value as ArticleSlug);
}
