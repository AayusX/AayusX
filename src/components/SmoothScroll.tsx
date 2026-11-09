import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { registerLenis } from '../lib/scroll';

/**
 * Purposeful smooth scrolling. Lenis is not created at all when the visitor
 * asks for reduced motion, so native scrolling stays untouched.
 */
export function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      registerLenis(null);
      return;
    }

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.16,
      wheelMultiplier: 1,
      touchMultiplier: 1.35,
      smoothWheel: true,
      anchors: true,
    });
    registerLenis(instance);

    return () => {
      registerLenis(null);
      instance.destroy();
    };
  }, [reduceMotion]);

  return null;
}
