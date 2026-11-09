import { motion, useReducedMotion } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';

/**
 * A quiet cross-dissolve between routes.
 *
 * The outlet is captured with useOutlet so the incoming page is a fresh
 * element on every path change. Only the content area moves; the header and
 * footer stay in place, which keeps navigation feeling continuous.
 */
export function PageTransition() {
  const location = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={location.pathname}
      className="page-transition"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.42,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {outlet}
    </motion.div>
  );
}
