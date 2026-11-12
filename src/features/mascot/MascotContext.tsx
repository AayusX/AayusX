import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useReducedMotion } from 'framer-motion';
import { Changa } from './Changa';

export const MASCOT_STORAGE_KEY = 'aayusx.mascot';

interface MascotContextValue {
  enabled: boolean;
  toggle: () => void;
}

const MascotContext = createContext<MascotContextValue | null>(null);

export function useMascot(): MascotContextValue {
  const value = useContext(MascotContext);
  if (!value) throw new Error('useMascot must be used inside MascotProvider');
  return value;
}

function CursorMascot() {
  const reduceMotion = useReducedMotion();
  const [coarsePointer, setCoarsePointer] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches;
  });
  const mascotRef = useRef<HTMLDivElement>(null);
  const stringRef = useRef<SVGPathElement>(null);
  const active = !reduceMotion && !coarsePointer;

  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse)');
    const onChange = () => setCoarsePointer(query.matches);
    query.addEventListener?.('change', onChange);
    return () => query.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (!active) return;
    const mascot = mascotRef.current;
    const string = stringRef.current;
    const stringLayer = string?.ownerSVGElement;
    if (!mascot) return;

    const offset = { x: 24, y: 20 };
    const center = 32;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let x = pointerX;
    let y = pointerY;
    let hasPointer = false;
    let reactTimer = 0;
    let frame = 0;
    let running = false;

    const tick = () => {
      const dx = pointerX - x;
      const dy = pointerY - y;
      x += dx * 0.16;
      y += dy * 0.16;
      const rotate = Math.max(-14, Math.min(14, (pointerX - x) * 0.28));
      mascot.style.transform = `translate3d(${x + offset.x}px, ${y + offset.y}px, 0) rotate(${rotate}deg)`;
      if (string) {
        const cx = x + offset.x + center;
        const cy = y + offset.y + center;
        const mx = (pointerX + cx) / 2;
        const my = (pointerY + cy) / 2 - 42;
        string.setAttribute('d', `M ${pointerX} ${pointerY} Q ${mx} ${my} ${cx} ${cy}`);
      }

      if (Math.abs(pointerX - x) < 0.08 && Math.abs(pointerY - y) < 0.08) {
        running = false;
        frame = 0;
        return;
      }

      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest('a, button, [data-mascot]'));

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!hasPointer) {
        hasPointer = true;
        x = pointerX;
        y = pointerY;
        mascot.classList.add('is-visible');
        stringLayer?.classList.add('is-visible');
      }
      start();
    };

    const onOver = (event: PointerEvent) => {
      if (isInteractive(event.target)) mascot.dataset.hover = 'true';
    };

    const onOut = (event: PointerEvent) => {
      if (isInteractive(event.target)) mascot.dataset.hover = 'false';
    };

    const onDown = (event: PointerEvent) => {
      if (!isInteractive(event.target)) return;
      mascot.dataset.react = 'true';
      window.clearTimeout(reactTimer);
      reactTimer = window.setTimeout(() => {
        mascot.dataset.react = 'false';
      }, 430);
    };

    const onLeave = () => {
      mascot.classList.remove('is-visible');
      stringLayer?.classList.remove('is-visible');
      mascot.dataset.hover = 'false';
      mascot.dataset.react = 'false';
      hasPointer = false;
      running = false;
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerover', onOver);
    window.addEventListener('pointerout', onOut);
    window.addEventListener('pointerdown', onDown);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(reactTimer);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerout', onOut);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      stringLayer?.classList.remove('is-visible');
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <svg className="mascot-string" aria-hidden="true" focusable="false">
        <path ref={stringRef} d="" />
      </svg>
      <div className="mascot-cursor" ref={mascotRef} aria-hidden="true">
        <Changa />
      </div>
    </>
  );
}

export function MascotProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      return window.localStorage.getItem(MASCOT_STORAGE_KEY) !== 'off';
    } catch {
      return true;
    }
  });

  const toggle = useCallback(() => setEnabled((current) => !current), []);

  useEffect(() => {
    try {
      window.localStorage.setItem(MASCOT_STORAGE_KEY, enabled ? 'on' : 'off');
    } catch {
      /* The preference still applies for this session. */
    }
  }, [enabled]);

  return (
    <MascotContext.Provider value={{ enabled, toggle }}>
      {children}
      {enabled ? <CursorMascot /> : null}
    </MascotContext.Provider>
  );
}
