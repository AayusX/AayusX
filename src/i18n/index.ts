import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './en';
import { ne } from './ne';

export const LANGUAGES = ['en', 'ne'] as const;
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'en';
export const NEPALI_PREFIX = '/ne';
export const LANGUAGE_STORAGE_KEY = 'aayusx.lang';

export function isLanguage(value: unknown): value is Language {
  return value === 'en' || value === 'ne';
}

/** Language encoded in the URL. English is unprefixed. */
export function languageFromPath(pathname: string): Language {
  return pathname === NEPALI_PREFIX || pathname.startsWith(`${NEPALI_PREFIX}/`) ? 'ne' : 'en';
}

/** Remove the Nepali prefix to obtain the canonical, language-neutral path. */
export function stripLanguagePrefix(pathname: string): string {
  if (pathname === NEPALI_PREFIX) return '/';
  if (pathname.startsWith(`${NEPALI_PREFIX}/`)) {
    return pathname.slice(NEPALI_PREFIX.length) || '/';
  }
  return pathname;
}

export function localePath(path: string, language: Language): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (language === 'en') return normalized;
  return normalized === '/' ? NEPALI_PREFIX : `${NEPALI_PREFIX}${normalized}`;
}

export function readSavedLanguage(): Language | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguage(value) ? value : null;
  } catch {
    return null;
  }
}

export function saveLanguage(language: Language): void {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    /* Storage can be unavailable; the URL still carries the language. */
  }
}

export function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;
  const candidates = [
    ...(Array.isArray(navigator.languages) ? navigator.languages : []),
    navigator.language,
  ];
  return candidates.some((value) => typeof value === 'string' && value.toLowerCase().startsWith('ne'))
    ? 'ne'
    : DEFAULT_LANGUAGE;
}

export async function initI18n(language: Language) {
  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      resources: {
        en: { translation: en },
        ne: { translation: ne },
      },
      lng: language,
      fallbackLng: DEFAULT_LANGUAGE,
      supportedLngs: [...LANGUAGES],
      load: 'languageOnly',
      interpolation: { escapeValue: false },
      returnNull: false,
    });
  } else if (i18n.resolvedLanguage !== language) {
    await i18n.changeLanguage(language);
  }

  return i18n;
}

export default i18n;
