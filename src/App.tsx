import React, { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import BootScreen from './components/BootScreen';
import Cursor from './components/Cursor';
import {
  Nav,
  Hero,
  Marquee,
  Manifesto,
  Evidence,
  StackWall,
  TerminalSection,
  Contact,
  Footer,
  ProgressRail,
} from './components/Sections';
import { allProjects, marqueeTop, marqueeBottom, STATUS_LABELS } from './projectsData';

/* three.js + rapier live in a separate chunk — loaded behind the boot screen */
const PhysicsCanvas = lazy(() => import('./components/PhysicsScene'));

/* ============================================================
   ERROR BOUNDARY — a crash shows a message, never a void.
   ============================================================ */

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error('[AayusX] crashed:', error);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0b', padding: 24 }}>
          <div style={{ maxWidth: 520, border: '1px solid var(--border)', padding: 32, background: '#121214', borderRadius: 12 }}>
            <h1 style={{ marginTop: 0, fontWeight: 800, fontFamily: "'Inter Tight', sans-serif" }}>SOMETHING EXPLODED.</h1>
            <p style={{ color: '#9c9c90' }}>{this.state.error.message}</p>
            <button
              onClick={() => window.location.reload()}
              style={{ background: '#c6ff3d', color: '#0a0a0b', border: 'none', padding: '12px 24px', fontWeight: 800, cursor: 'pointer', fontSize: 14, borderRadius: 4 }}
            >
              REBOOT ↻
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ============================================================
   ARCHIVE MODAL
   ============================================================ */

function Archive({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="archive-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Project archive"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="archive-head">
        <h2>THE FULL ARCHIVE.</h2>
        <button className="archive-close" onClick={onClose} aria-label="Close archive">&times;</button>
      </div>
      <div className="archive-grid">
        {allProjects.map((p, idx) => (
          <div key={p.title} className="archive-card">
            <span className="mono" style={{ fontSize: 11, color: '#63635a' }}>{String(idx + 1).padStart(2, '0')}</span>
            <h3>{p.title}</h3>
            <p style={{ color: '#9c9c90', fontSize: '.9rem', margin: '0 0 14px' }}>{p.desc}</p>
            <div className="tags">
              {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              <span className={`ev-status st-${p.status}`}>{STATUS_LABELS[p.status]}</span>
            </div>
            <a href={p.link} target="_blank" rel="noopener noreferrer">OPEN RECORD ↗</a>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ============================================================
   NO WEBGL FALLBACK — content survives everywhere.
   ============================================================ */

function NoWebglFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0b', color: '#f2f2ed', padding: '48px 24px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, letterSpacing: '-0.03em', fontSize: 'clamp(2.5rem, 8vw, 5rem)', margin: 0, textTransform: 'uppercase' }}>
          AAYUSH<span style={{ color: '#c6ff3d' }}> BHANDARI</span>
        </h1>
        <p style={{ fontSize: 18, maxWidth: 640, lineHeight: 1.7, color: '#9c9c90' }}>
          Your browser skipped WebGL, so the physics playground stayed home. The evidence still speaks:
        </p>
        <ul style={{ lineHeight: 2.2, paddingLeft: 20 }}>
          {allProjects.map((proj) => (
            <li key={proj.link}>
              <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, borderBottom: '2px solid #c6ff3d' }}>
                {proj.title}
              </a>{' '}
              <span style={{ color: '#63635a' }}>— {proj.tags.join(', ')}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */

const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];

export default function App() {
  const [booted, setBooted] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [toast, setToast] = useState('');
  const [webglOk] = useState<boolean>(() => {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });

  /* smooth scroll */
  useEffect(() => {
    if (!webglOk) return;
    const lenis = new Lenis({ lerp: 0.09 });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, [webglOk]);

  /* lock scroll while booting */
  useEffect(() => {
    document.body.style.overflow = booted ? '' : 'hidden';
  }, [booted]);

  /* toast auto-clear */
  useEffect(() => {
    if (!toast) return;
    const to = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(to);
  }, [toast]);

  /* konami easter egg — acid mode */
  useEffect(() => {
    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      seq = [...seq, e.key.toLowerCase()].slice(-KONAMI.length);
      if (seq.join(',') === KONAMI.join(',')) {
        const root = document.documentElement;
        const on = root.style.filter === 'hue-rotate(90deg)';
        root.style.filter = on ? '' : 'hue-rotate(90deg)';
        setToast(on ? 'ACID MODE OFF.' : 'ACID MODE ON ↑↑↓↓←→←→BA');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const showToast = (msg: string) => setToast(msg);

  if (!webglOk) {
    return <NoWebglFallback />;
  }

  return (
    <ErrorBoundary>
      <Cursor />
      <ProgressRail />

      {/* physics playground lives behind everything — lazy chunk */}
      <Suspense fallback={null}>
        <PhysicsCanvas onReady={() => {}} />
      </Suspense>

      {/* boot gate */}
      <AnimatePresence>
        {!booted && <BootScreen key="boot" onDone={() => setBooted(true)} />}
      </AnimatePresence>

      <Nav />

      {/* hero floats transparently over the canvas */}
      {!booted ? null : <Hero />}

      {/* everything below covers the canvas */}
      <Marquee items={marqueeTop} dur="36s" />
      <Manifesto />
      <Evidence onArchive={() => setShowAll(true)} />
      <StackWall />
      <TerminalSection />
      <Contact onToast={showToast} />
      <Footer />
      <Marquee items={marqueeBottom} reverse dur="44s" />

      <AnimatePresence>
        {showAll && <Archive key="archive" onClose={() => setShowAll(false)} />}
      </AnimatePresence>

      <div className={`toast${toast ? ' show' : ''}`} role="status">
        {toast}
      </div>

      <div className="noise" aria-hidden="true" />
    </ErrorBoundary>
  );
}