export const SITE = {
  url: 'https://aayusx.dev',
  name: 'AayusX',
  author: 'Aayush Bhandari',
  email: 'technology457t@gmail.com',
  location: 'Nepal · working remotely',
  socials: [
    { label: 'GitHub', href: 'https://github.com/AayusX' },
    { label: 'Yugya', href: 'https://yugya.com' },
    { label: 'Yugs Bot', href: 'https://yugs.yugya.com/' },
  ],
} as const;

export type NavKey =
  | 'home'
  | 'about'
  | 'journey'
  | 'projects'
  | 'experiments'
  | 'capabilities'
  | 'writing'
  | 'contact';

export const NAV_ITEMS: ReadonlyArray<{ key: NavKey; path: string }> = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'journey', path: '/journey' },
  { key: 'projects', path: '/projects' },
  { key: 'experiments', path: '/experiments' },
  { key: 'capabilities', path: '/capabilities' },
  { key: 'writing', path: '/writing' },
  { key: 'contact', path: '/contact' },
];

export const PRIMARY_NAV = NAV_ITEMS.filter((item) => item.key !== 'home');

export function mailtoHref(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${SITE.email}${query ? `?${query}` : ''}`;
}
