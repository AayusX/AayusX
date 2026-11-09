import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  languageFromPath,
  localePath,
  saveLanguage,
  stripLanguagePrefix,
  type Language,
} from './index';

/**
 * Language derived from the URL, plus helpers that always emit the correct
 * localized path. The URL is the source of truth so links cannot briefly point
 * at the previous language while i18next catches up.
 */
export function useLocale() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const language = languageFromPath(location.pathname);

  useEffect(() => {
    document.documentElement.lang = language;
    if (i18n.resolvedLanguage !== language) {
      void i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  const lp = useCallback((path: string) => localePath(path, language), [language]);

  const switchLanguage = useCallback(
    (next: Language) => {
      saveLanguage(next);
      const canonicalPath = stripLanguagePrefix(location.pathname);
      const nextPath = localePath(canonicalPath, next);
      void i18n.changeLanguage(next);
      navigate(`${nextPath}${location.search}${location.hash}`, { replace: true });
    },
    [i18n, location.hash, location.pathname, location.search, navigate],
  );

  const urlFor = useCallback(
    (path: string, target: Language) => localePath(path, target),
    [],
  );

  return {
    language,
    isNepali: language === 'ne',
    lp,
    switchLanguage,
    urlFor,
  };
}
