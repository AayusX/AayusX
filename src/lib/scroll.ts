import type Lenis from 'lenis';

let lenis: Lenis | null = null;

/** Registered once by <SmoothScroll />. Null when reduced motion is requested. */
export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToTop(immediate = true) {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

export function scrollToElement(target: string | HTMLElement, immediate = false) {
  const element = typeof target === 'string' ? document.getElementById(target) : target;
  if (!element) return;
  if (lenis) {
    lenis.scrollTo(element, { immediate, offset: -72 });
    return;
  }
  element.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' });
}
