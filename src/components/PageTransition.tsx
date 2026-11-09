import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';

/**
 * A fast layered wipe between routes.
 *
 * The incoming page mounts underneath the overlay, so the scroll reset is
 * hidden. A brief ivory flash fades over a clay panel, then the clay and plum
 * panels sweep left with bright leading edges to reveal the new page.
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
    const timer = window.setTimeout(() => setWipePath(null), 700);
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
            transition={{ duration: 0.58, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.span
            className="page-wipe__panel page-wipe__panel--clay"
            initial={{ x: '0%' }}
            animate={{ x: '-100%' }}
            transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.span
            className="page-wipe__flash"
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          />
        </div>
      ) : null}
    </>
  );
}
