import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';

/**
 * A two-tone page wipe between routes.
 *
 * The incoming page mounts underneath the overlay, so the scroll reset is
 * hidden. A warm paper panel and a deep-plum panel sweep left together, with a
 * thin wine edge, to reveal the new page. The colors come from the site's core
 * Ink & Plum palette, so the transition never feels louder than the pages.
 *
 * The overlay is driven by an actual path change, not the first render, so
 * re-renders such as closing the intro never trigger a wipe.
 */
export function PageTransition() {
  const location = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useReducedMotion();
  const [wipePath, setWipePath] = useState<string | null>(null);
  const previousPath = useRef(location.pathname);

  useLayoutEffect(() => {
    if (previousPath.current === location.pathname) return;
    previousPath.current = location.pathname;

    setWipePath(location.pathname);
    const timer = window.setTimeout(() => setWipePath(null), 720);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <div className="page-transition">{outlet}</div>

      {!reduceMotion && wipePath ? (
        <div className="page-wipe" key={wipePath} aria-hidden="true">
          <motion.span
            className="page-wipe__panel page-wipe__panel--plum"
            initial={{ x: '0%' }}
            animate={{ x: '-100%' }}
            transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.span
            className="page-wipe__panel page-wipe__panel--paper"
            initial={{ x: '0%' }}
            animate={{ x: '-100%' }}
            transition={{ duration: 0.46, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>
      ) : null}
    </>
  );
}
