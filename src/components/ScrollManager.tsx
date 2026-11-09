import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { stripLanguagePrefix } from '../i18n';
import { scrollToElement, scrollToTop } from '../lib/scroll';

/**
 * Keeps scroll position and focus predictable between routes.
 *
 * A language switch changes only the URL prefix, so it must not jump the page
 * back to the top. Real navigations reset scroll and move focus to <main>.
 */
export function ScrollManager() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const canonicalPath = stripLanguagePrefix(location.pathname);
  const previousPath = useRef(canonicalPath);
  const firstRender = useRef(true);

  useEffect(() => {
    const samePage = previousPath.current === canonicalPath;
    previousPath.current = canonicalPath;

    if (firstRender.current) {
      firstRender.current = false;
      if (location.hash) {
        requestAnimationFrame(() => scrollToElement(location.hash.slice(1), true));
      }
      return;
    }

    if (samePage && !location.hash) return;

    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      requestAnimationFrame(() => scrollToElement(id, Boolean(reduceMotion)));
    } else {
      scrollToTop(true);
    }

    if (!samePage) {
      requestAnimationFrame(() => {
        document.getElementById('main-content')?.focus({ preventScroll: true });
      });
    }
  }, [canonicalPath, location.hash, location.key, reduceMotion]);

  return null;
}
