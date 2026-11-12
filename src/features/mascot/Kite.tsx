import { useEffect, useId, useRef, type CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  KITE_EXPRESSIONS,
  type KiteExpression,
  type KiteEyeState,
  type KiteMouth,
} from './kiteData';

const BODY = 'M100 18 L156 84 L100 150 L44 84 Z';
const EYE_LEFT_X = 84;
const EYE_RIGHT_X = 116;
const EYE_Y = 75;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function Eye({
  side,
  state,
  uid,
}: {
  side: 'left' | 'right';
  state: KiteEyeState;
  uid: string;
}) {
  const clipId = `kite-eye-${side}-${uid}`;
  const x = side === 'left' ? EYE_LEFT_X : EYE_RIGHT_X;
  const closed = state.closed === 'happy';
  const scaleY = state.scaleY ?? 1;

  return (
    <g
      className={`kite__eye${closed ? ' kite__eye--closed' : ''}`}
      transform={`translate(${x} ${EYE_Y})`}
    >
      <ellipse className="kite__eye-socket" cx="0" cy="0" rx="10.4" ry="11.4" />
      {closed ? (
        <path className="kite__eye-arc" d="M-7.6 2 Q0 -7 7.6 2" />
      ) : (
        <g
          className="kite__eye-open"
          style={{ transform: `scaleY(${scaleY})` } as CSSProperties}
        >
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <ellipse cx="0" cy="0" rx="8.4" ry="9.8" />
          </clipPath>
          <g className="kite__eye-inner" clipPath={`url(#${clipId})`}>
            <ellipse className="kite__sclera" cx="0" cy="0" rx="8.4" ry="9.8" fill={`url(#kite-sclera-${uid})`} />
            <g
              className="kite__pupil"
              style={
                {
                  '--pupil-x': `${state.pupilX}px`,
                  '--pupil-y': `${state.pupilY}px`,
                } as CSSProperties
              }
            >
              <circle r={state.pupilR} fill="#201a1b" />
              <circle
                cx={-state.pupilR * 0.34}
                cy={-state.pupilR * 0.44}
                r={state.pupilR * 0.3}
                fill="#f6efe7"
                opacity="0.9"
              />
            </g>
            <path
              className="kite__lid"
              d="M-12 -16 H12 V-4 Q0 1 -12 -4 Z"
              fill={`url(#kite-lid-${uid})`}
              style={{ '--lid-y': `${state.lid}px` } as CSSProperties}
            />
            <path
              className="kite__lash"
              d="M-12 -4 Q0 1 12 -4"
              style={{ '--lid-y': `${state.lid}px` } as CSSProperties}
            />
          </g>
        </g>
      )}
    </g>
  );
}

function Mouth({ shape }: { shape: KiteMouth }) {
  const stroke = 'rgba(32, 26, 27, 0.72)';

  if (shape === 'o') {
    return <ellipse className="kite__mouth" cx="100" cy="101" rx="3.1" ry="4.3" fill={stroke} />;
  }

  const d = {
    smile: 'M91 99 Q100 105 109 99',
    grin: 'M89 97 Q100 109 111 97',
    open: 'M92 97 Q100 111 108 97 Q100 103 92 97 Z',
    flat: 'M92 101 H108',
    smirk: 'M92 101 Q100 106 108 98',
    small: 'M96 100 Q100 103 104 100',
  }[shape];

  return (
    <path
      className="kite__mouth"
      d={d}
      fill={shape === 'open' ? stroke : 'none'}
      stroke={stroke}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export interface KiteProps {
  expression?: KiteExpression;
  trackPointer?: boolean;
  className?: string;
}

/**
 * The evolved Changa: a dimensional vector rig built from the existing kite.
 * The four panels, two eyes, and ribbon tail remain the identity. The eyelid,
 * pupil, body, and tail states are driven by data-expression, so the same
 * character can be reused across sections without a WebGL scene.
 */
export function Kite({ expression = 'welcome', trackPointer = false, className = '' }: KiteProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const spec = KITE_EXPRESSIONS[expression];

  useEffect(() => {
    if (!trackPointer || reduceMotion) return;
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;

    const root = rootRef.current;
    if (!root) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;
    let running = false;

    const apply = () => {
      root.style.setProperty('--look-x', `${currentX.toFixed(2)}px`);
      root.style.setProperty('--look-y', `${currentY.toFixed(2)}px`);
      root.style.setProperty('--body-rx', `${(-currentY * 1.8).toFixed(2)}deg`);
      root.style.setProperty('--body-ry', `${(currentX * 1.8).toFixed(2)}deg`);
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      apply();

      if (Math.abs(targetX - currentX) < 0.02 && Math.abs(targetY - currentY) < 0.02) {
        currentX = targetX;
        currentY = targetY;
        apply();
        running = false;
        return;
      }

      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      targetX = clamp(((event.clientX - centerX) / Math.max(320, window.innerWidth * 0.32)) * 8, -1.8, 1.8);
      targetY = clamp(((event.clientY - centerY) / Math.max(320, window.innerHeight * 0.32)) * 8, -1.6, 1.6);
      start();
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
      start();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('blur', reset);
    document.documentElement.addEventListener('mouseleave', reset);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('blur', reset);
      document.documentElement.removeEventListener('mouseleave', reset);
    };
  }, [trackPointer, reduceMotion]);

  return (
    <div
      ref={rootRef}
      className={`kite${className ? ` ${className}` : ''}`}
      data-expression={expression}
      aria-hidden="true"
    >
      <div className="kite__look">
        <div className="kite__pose">
          <div className="kite__float">
            <svg
              className="kite__svg"
              viewBox="0 0 200 240"
              focusable="false"
              role="presentation"
            >
              <defs>
                <linearGradient id={`kite-tl-${uid}`} x1="0.1" y1="0" x2="0.9" y2="1">
                  <stop offset="0" stopColor="#f3e9f7" stopOpacity="0.96" />
                  <stop offset="0.55" stopColor="#cdb4dd" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#9a6b9a" stopOpacity="0.82" />
                </linearGradient>
                <linearGradient id={`kite-tr-${uid}`} x1="0.9" y1="0" x2="0.1" y2="1">
                  <stop offset="0" stopColor="#b58cc9" stopOpacity="0.92" />
                  <stop offset="0.58" stopColor="#7a4a70" stopOpacity="0.88" />
                  <stop offset="1" stopColor="#4d2947" stopOpacity="0.92" />
                </linearGradient>
                <linearGradient id={`kite-bl-${uid}`} x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stopColor="#d7a18d" stopOpacity="0.9" />
                  <stop offset="0.55" stopColor="#a56a5f" stopOpacity="0.84" />
                  <stop offset="1" stopColor="#79445f" stopOpacity="0.86" />
                </linearGradient>
                <linearGradient id={`kite-br-${uid}`} x1="0.1" y1="0" x2="0.9" y2="1">
                  <stop offset="0" stopColor="#6f3d63" stopOpacity="0.94" />
                  <stop offset="0.55" stopColor="#4a2542" stopOpacity="0.96" />
                  <stop offset="1" stopColor="#2b1528" stopOpacity="0.98" />
                </linearGradient>
                <linearGradient id={`kite-tail-${uid}`} x1="0" y1="0" x2="0.4" y2="1">
                  <stop offset="0" stopColor="#e6cfe0" stopOpacity="0.88" />
                  <stop offset="0.46" stopColor="#a56a8a" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#b56b4d" stopOpacity="0.56" />
                </linearGradient>
                <radialGradient id={`kite-sclera-${uid}`} cx="0.35" cy="0.3" r="0.9">
                  <stop offset="0" stopColor="#fffaf5" />
                  <stop offset="0.68" stopColor="#f1e5ea" />
                  <stop offset="1" stopColor="#d6c2d0" />
                </radialGradient>
                <linearGradient id={`kite-lid-${uid}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#4a2542" />
                  <stop offset="1" stopColor="#2a1524" />
                </linearGradient>
                <linearGradient id={`kite-edge-${uid}`} x1="0" y1="0" x2="0.6" y2="1">
                  <stop offset="0" stopColor="#3a2033" stopOpacity="0.95" />
                  <stop offset="0.6" stopColor="#1f1120" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#120a12" stopOpacity="0.82" />
                </linearGradient>
                <linearGradient id={`kite-sheen-${uid}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.58" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <radialGradient id={`kite-glass-${uid}`} cx="0.4" cy="0.3" r="0.8">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.34" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
                <radialGradient id={`kite-face-glow-${uid}`} cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="#f6efe7" stopOpacity="0.3" />
                  <stop offset="1" stopColor="#f6efe7" stopOpacity="0" />
                </radialGradient>
                <clipPath id={`kite-body-${uid}`} clipPathUnits="userSpaceOnUse">
                  <path d={BODY} />
                </clipPath>
              </defs>

              <g className="kite__tails">
                <g className="kite__tail kite__tail--left" stroke={`url(#kite-tail-${uid})`}>
                  <path
                    className="kite__tail-underlay"
                    d="M96 140 C82 156 104 166 90 184 C78 200 98 210 88 224"
                  />
                  <path
                    className="kite__tail-core"
                    d="M96 140 C82 156 104 166 90 184 C78 200 98 210 88 224"
                  />
                  <path
                    className="kite__tail-fold"
                    d="M96 140 C82 156 104 166 90 184 C78 200 98 210 88 224"
                  />
                </g>
                <g className="kite__tail kite__tail--right" stroke={`url(#kite-tail-${uid})`}>
                  <path
                    className="kite__tail-underlay"
                    d="M104 140 C118 156 98 168 110 186 C120 200 104 212 112 222"
                  />
                  <path
                    className="kite__tail-core"
                    d="M104 140 C118 156 98 168 110 186 C120 200 104 212 112 222"
                  />
                  <path
                    className="kite__tail-fold"
                    d="M104 140 C118 156 98 168 110 186 C120 200 104 212 112 222"
                  />
                </g>
                <circle className="kite__tail-knot" cx="100" cy="142" r="3.1" />
              </g>

              <g className="kite__body">
                <path
                  className="kite__thickness"
                  d={BODY}
                  transform="translate(3.4 4.8)"
                  fill={`url(#kite-edge-${uid})`}
                />
                <path className="kite__panel kite__panel--tl" d="M100 18 L44 84 L100 84 Z" fill={`url(#kite-tl-${uid})`} />
                <path className="kite__panel kite__panel--tr" d="M100 18 L156 84 L100 84 Z" fill={`url(#kite-tr-${uid})`} />
                <path className="kite__panel kite__panel--bl" d="M44 84 L100 150 L100 84 Z" fill={`url(#kite-bl-${uid})`} />
                <path className="kite__panel kite__panel--br" d="M156 84 L100 150 L100 84 Z" fill={`url(#kite-br-${uid})`} />

                <g clipPath={`url(#kite-body-${uid})`}>
                  <ellipse
                    className="kite__sheen"
                    cx="76"
                    cy="49"
                    rx="42"
                    ry="16"
                    transform="rotate(-28 76 49)"
                    fill={`url(#kite-sheen-${uid})`}
                  />
                  <path className="kite__glass" d="M100 18 L156 84 L100 84 Z" fill={`url(#kite-glass-${uid})`} />
                  <path className="kite__glass" d="M44 84 L100 150 L100 84 Z" fill={`url(#kite-glass-${uid})`} />
                  <path
                    className="kite__edge-highlight"
                    d="M100 18 L156 84"
                    stroke="rgba(246, 239, 231, 0.46)"
                  />
                  <path
                    className="kite__edge-highlight"
                    d="M44 84 L100 150"
                    stroke="rgba(246, 239, 231, 0.18)"
                  />
                </g>

                <path className="kite__outline" d={BODY} />
                <path className="kite__seam" d="M100 18 V150 M44 84 H156" />
              </g>

              <ellipse
                className="kite__face-glow"
                cx="100"
                cy="79"
                rx="37"
                ry="27"
                fill={`url(#kite-face-glow-${uid})`}
              />

              <g className="kite__face">
                <Eye side="left" state={spec.eyes.left} uid={uid} />
                <Eye side="right" state={spec.eyes.right} uid={uid} />
                <Mouth shape={spec.mouth} />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
