import { SITE } from './site';

const PERSON_ID = `${SITE.url}/#aayush-bhandari`;
const WEBSITE_ID = `${SITE.url}/#website`;

const KNOWS_ABOUT = [
  'Web development',
  'TypeScript',
  'React',
  'Node.js',
  'PostgreSQL',
  'Python',
  'Desktop applications',
  'Computer vision',
  'Retrieval-augmented generation',
  'Linux server operations',
];

export function personSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.author,
    alternateName: SITE.name,
    url: SITE.url,
    image: `${SITE.url}/me.jpg`,
    email: `mailto:${SITE.email}`,
    jobTitle: 'Computer Engineering student and technology entrepreneur',
    description:
      'Aayush Bhandari builds practical web platforms, desktop tools, and small AI systems from Nepal. Co-founder of Yugya.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NP',
    },
    knowsLanguage: ['en', 'ne'],
    knowsAbout: KNOWS_ABOUT,
    sameAs: SITE.socials.map((social) => social.href),
    worksFor: {
      '@type': 'Organization',
      name: 'Yugya',
      url: 'https://yugya.com',
    },
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: `${SITE.name} — ${SITE.author}`,
    inLanguage: ['en', 'ne'],
    publisher: { '@id': PERSON_ID },
  };
}

export function profilePageSchema({
  title,
  description,
  url,
  language,
}: {
  title: string;
  description: string;
  url: string;
  language: 'en' | 'ne';
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    name: title,
    description,
    inLanguage: language,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': PERSON_ID },
  };
}

export function caseStudySchema({
  title,
  description,
  url,
  language,
  year,
}: {
  title: string;
  description: string;
  url: string;
  language: 'en' | 'ne';
  year: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    url,
    inLanguage: language,
    dateCreated: /^\d{4}$/.test(year) ? year : undefined,
    creator: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

export function articleSchema({
  title,
  description,
  url,
  language,
  date,
}: {
  title: string;
  description: string;
  url: string;
  language: 'en' | 'ne';
  date: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    inLanguage: language,
    datePublished: date,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}
