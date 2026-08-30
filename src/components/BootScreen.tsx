import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LINES = [
  'AAYUSX.SYS v7.2 — initializing',
  'mounting physics playground ......... OK',
  'loading evidence [19 records] ....... OK',
  'calibrating acid levels ............. OK',
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let finished = false;
    const tick = (now: number) => {
      const t = now - start;
      const target = t > 2600 ? 100 : Math.min((t / 2600) * 90, 90);
      setPct(Math.floor(target));
      if (t >= 4000) {
        if (!finished) {
          finished = true;
          onDone();
        }
      } else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        background: '#0a0a0b',
        overflow: 'hidden',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 3,
          width: `${pct}%`,
          background: '#c6ff3d',
          boxShadow: '0 0 18px rgba(198,255,61,.6)',
          transition: 'width .12s linear',
        }}
      />
      <div
        className="mono"
        style={{
          position: 'absolute',
          top: 26,
          left: 28,
          fontSize: 11,
          letterSpacing: '.3em',
          color: '#63635a',
        }}
      >
        AAYUSX.SYS
      </div>
      <div
        className="mono"
        style={{
          position: 'absolute',
          top: 26,
          right: 28,
          fontSize: 11,
          letterSpacing: '.2em',
          color: '#63635a',
        }}
      >
        KTM · NP
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          {LINES.map((l, i) => (
            <motion.div
              key={l}
              className="mono"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.32, duration: 0.4, ease: 'easeOut' }}
              style={{ fontSize: 12, color: i === LINES.length - 1 ? '#c6ff3d' : '#9c9c90', margin: '7px 0', letterSpacing: '.04em' }}
            >
              {l}
            </motion.div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 18,
          right: 26,
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(5rem, 16vw, 13rem)',
          lineHeight: 1,
          color: '#f2f2ed',
          fontVariantNumeric: 'tabular-nums',
          userSelect: 'none',
        }}
      >
        {pct}
        <span style={{ fontSize: '0.35em', color: '#c6ff3d' }}>%</span>
      </div>

      <div
        className="mono"
        style={{
          position: 'absolute',
          bottom: 30,
          left: 28,
          fontSize: 10,
          letterSpacing: '.25em',
          color: '#3a3a40',
        }}
      >
        DRAG THE CUBES WHEN YOU GET IN.
      </div>
    </motion.div>
  );
}