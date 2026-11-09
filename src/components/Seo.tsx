import { useEffect } from 'react';
import { SITE } from '../content/site';
import { useLocale } from '../i18n/useLocale';

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'profile' | 'article';
  image?: string;
  publishedTime?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | null;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, attrs: Record<string, string> = {}) {
  const selectorParts = [`link[rel="${rel}"]`, ...Object.entries(attrs).map(([k, v]) => `[${k}="${v}"]`)];
  let element = document.head.querySelector<HTMLLinkElement>(selectorParts.join(''));
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    Object.entries(attrs).forEach(([key, value]) => element!.setAttribute(key, value));
    document.head.appendChild(element);
  }
  element.href = href;
}

export function Seo({
  title,
  description,
  path,
  type = 'website',
  image = `${SITE.url}/og.png`,
  publishedTime,
  noIndex = false,
  jsonLd = null,
}: SeoProps) {
  const { lp, language } = useLocale();
  const canonical = `${SITE.url}${lp(path)}`;
  const englishUrl = `${SITE.url}${path === '/' ? '/' : path}`;
  const nepaliUrl = `${SITE.url}${path === '/' ? '/ne' : `/ne${path}`}`;

  useEffect(() => {
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:site_name', SITE.name);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:image:alt', `${SITE.author} — ${SITE.name}`);
    upsertMeta('property', 'og:locale', language === 'ne' ? 'ne_NP' : 'en_US');
    upsertMeta('property', 'og:locale:alternate', language === 'ne' ? 'en_US' : 'ne_NP');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    if (publishedTime) {
      upsertMeta('property', 'article:published_time', publishedTime);
    }

    upsertLink('alternate', englishUrl, { hreflang: 'en', 'data-seo': 'hreflang-en' });
    upsertLink('alternate', nepaliUrl, { hreflang: 'ne', 'data-seo': 'hreflang-ne' });
    upsertLink('alternate', englishUrl, { hreflang: 'x-default', 'data-seo': 'hreflang-x' });

    const previous = document.getElementById('route-schema');
    if (previous) previous.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'route-schema';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [canonical, description, englishUrl, image, jsonLd, language, nepaliUrl, noIndex, publishedTime, title, type]);

  return null;
}
