import {
  detectBrowserLanguage,
  languageFromPath,
  NEPALI_PREFIX,
  readSavedLanguage,
  type Language,
} from './index';

/**
 * Normalise the URL before React mounts.
 *
 * Rules, in order:
 * 1. `/en/...` is never a canonical URL; strip the prefix in place.
 * 2. `/ne/...` always wins.
 * 3. An unprefixed path uses the saved manual preference, then browser language.
 *    A Nepali result is redirected to the prefixed URL so the address bar and
 *    shared links always describe the language being read.
 */
export function bootstrapLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const { pathname, search, hash } = window.location;

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const stripped = pathname.slice(3) || '/';
    window.history.replaceState(null, '', `${stripped}${search}${hash}`);
  }

  const currentPath = window.location.pathname;
  if (languageFromPath(currentPath) === 'ne') return 'ne';

  const saved = readSavedLanguage();
  const preference = saved ?? detectBrowserLanguage();

  if (preference === 'ne') {
    const target = currentPath === '/' ? NEPALI_PREFIX : `${NEPALI_PREFIX}${currentPath}`;
    window.location.replace(`${target}${search}${hash}`);
    return 'ne';
  }

  return 'en';
}
