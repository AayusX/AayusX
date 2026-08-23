import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { allProjects, marqueeTop, marqueeBottom, stackItems, STATUS_LABELS } from '../projectsData';
import Terminal from './Terminal';

const EASE = [0.2, 0, 0, 1] as const;

/* ---------- helpers ---------- */

export function Reveal({ children, delay = 0, y = 30 }: { children: ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      style={{ display: 'inline-block', transition: 'transform 0.35s cubic-bezier(0.2,0,0,1)' }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        ref.current.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.18}px, ${
          (e.clientY - (r.top + r.height / 2)) * 0.22
        }px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = 'translate(0px, 0px)';
      }}
    >
      {children}
    </div>
  );
}

/* text scramble — the classic terminal decode on hover */
const GLYPHS = '!<>-_\\/[]{}=+*^?#@$%&';

export function Scramble({ text }: { text: string }) {
  const [out, setOut] = useState(text);
  const rafRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <span
      onMouseEnter={() => {
        cancelAnimationFrame(rafRef.current);
        const start = performance.now();
        const dur = 380;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const revealed = Math.floor(p * text.length);
          let s = '';
          for (let i = 0; i < text.length; i++) {
            s += i < revealed ? text[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
          setOut(s);
          if (p < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      }}
    >
      {out}
    </span>
  );
}

/* scroll-velocity skew — strips shear as you flick the page */
function VelocitySkew({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const v = useVelocity(scrollY);
  const smooth = useSpring(v, { stiffness: 140, damping: 45, mass: 0.5 });
  const skew = useTransform(smooth, [-3000, 0, 3000], [-8, 0, 8]);
  const scaleX = useTransform(smooth, [-3000, 0, 3000], [1.04, 1, 1.04]);
  return (
    <motion.div style={{ skewX: skew, scaleX }} className="vel-skew">
      {children}
    </motion.div>
  );
}

/* thin progress rail on the right edge */
export function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  return (
    <div className="rail" aria-hidden="true">
      <motion.div className="rail-fill" style={{ scaleY }} />
    </div>
  );
}

function useKathmanduTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kathmandu',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);
  return time;
}

function GhostNum({ n }: { n: string }) {
  return <span className="ghost-num" aria-hidden="true">{n}</span>;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
  if (lenis?.scrollTo) lenis.scrollTo(el, { offset: -60 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

/* ---------- NAV ---------- */

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="nav-logo" href="#top" onClick={(e) => { e.preventDefault(); scrollToId('top'); }} data-cursor="TOP">
          <i />
          AAYUSX<span style={{ color: 'var(--accent)' }}>.DEV</span>
        </a>
        <ul className="nav-links">
          <li><button onClick={() => scrollToId('manifesto')}><Scramble text="Manifesto" /></button></li>
          <li><button onClick={() => scrollToId('evidence')}><Scramble text="Evidence" /></button></li>
          <li><button onClick={() => scrollToId('stack')}><Scramble text="Stack" /></button></li>
          <li><button onClick={() => scrollToId('terminal')}><Scramble text="Terminal" /></button></li>
          <li><button data-cursor="GO" onClick={() => scrollToId('contact')}><Scramble text="Contact" /></button></li>
        </ul>
        <div className="chip-status"><i />OPEN TO WORK</div>
      </div>
    </nav>
  );
}

/* ---------- HERO ---------- */

export function Hero() {
  const time = useKathmanduTime();
  const ref = useRef<HTMLElement>(null);

  /* cinematic exit — content lifts, dims and shrinks as you leave */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div style={{ y, opacity, scale }} className="hero-exit">
        <motion.div className="hero-row hero-top" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease: EASE }}>
          <div className="hero-meta">
            <span>EXPERIMENT LOG // VOL.07</span>
            <span>KTM <b>{time}</b> NPT</span>
          </div>
          <div className="hero-contact">
            <span>DIRECT LINE</span>
            <a href="mailto:technology457t@gmail.com" data-cursor="MAIL">technology457t@gmail.com</a>
          </div>
        </motion.div>

        <div className="hero-mid">
          <motion.p
            className="mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ fontSize: 11, letterSpacing: '.28em', color: 'var(--dim)', marginBottom: 16 }}
          >
            {'// FULL-STACK DEVELOPER & AI ENGINEER'}
          </motion.p>

          <h1 className="hero-title">
            {['AAYUSH', 'bhandari'].map((w, i) => (
              <span key={w} style={{ display: 'block', overflow: 'hidden' }}>
                <motion.span
                  className={i === 1 ? 'ti' : undefined}
                  style={{ display: 'inline-block' }}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.25 + i * 0.12, duration: 0.85, ease: EASE }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="hero-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7, ease: EASE }}>
            I build systems that think and pages you can throw across the room.
            The cubes behind this text are live physics — go ahead, grab one.
          </motion.p>

          <motion.div className="hero-cta interactive" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7, ease: EASE }}>
            <Magnetic>
              <button className="btn btn-primary" data-cursor="SCROLL" onClick={() => scrollToId('evidence')}>
                SEE THE EVIDENCE ↓
              </button>
            </Magnetic>
            <Magnetic>
              <button className="btn btn-ghost" data-cursor="HACK" onClick={() => scrollToId('terminal')}>
                OPEN TERMINAL
              </button>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div className="hero-row hero-bot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: 0.7 }}>
          <p className="hero-hint">* THE CUBES ARE REAL PHYSICS — DRAG &amp; THROW</p>
          <div className="scroll-cue"><i /></div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- MARQUEE ---------- */

export function Marquee({ items, reverse = false, dur = '32s' }: { items: string[]; reverse?: boolean; dur?: string }) {
  return (
    <div className={`marquee${reverse ? ' reverse' : ''}`} aria-hidden="true">
      <VelocitySkew>
        <div className="marquee-track" style={{ ['--dur' as string]: dur }}>
          {[0, 1].map((g) => (
            <div key={g} className="marquee-group">
              {items.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </VelocitySkew>
    </div>
  );
}

/* ---------- MANIFESTO ---------- */

const RAW =
  "Most portfolios are templates wearing a suit. I would rather ship experiments that break the grid, drag physics into a resume, wire AI into products people actually run, and let the work do the talking.";
const HL = new Set(['experiments', 'physics', 'AI', 'work.', 'templates']);
const WORDS = RAW.split(' ');

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.45'] });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const lit = Math.floor(v * WORDS.length * 1.15);
      wordsRef.current.forEach((el, i) => {
        if (el) el.style.opacity = i < lit ? '1' : '';
      });
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section id="manifesto" className="section">
      <div className="container" style={{ position: 'relative' }}>
        <GhostNum n="01" />
        <Reveal><p className="section-code">// 01 — MANIFESTO</p></Reveal>
        <p className="manifesto-text" ref={ref}>
          {WORDS.map((w, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el; }}
              className={`w${HL.has(w) ? ' hl' : ''}`}
              style={{ display: 'inline-block', marginRight: '0.32em' }}
            >
              {w}
            </span>
          ))}
        </p>
        <Reveal delay={0.1}>
          <p className="manifesto-sign">AAYUSX — SELF-TAUGHT IN KATHMANDU, SHIPPING WORLDWIDE</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- EVIDENCE LOG ---------- */

const PREVIEW = 8;

export function Evidence({ onArchive }: { onArchive: () => void }) {
  return (
    <section id="evidence" className="section">
      <div className="container">
        <div className="section-head" style={{ position: 'relative', display: 'block' }}>
          <GhostNum n="02" />
          <Reveal><p className="section-code">// 02 — EVIDENCE LOG</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">SHIPPED,<br />NOT <span className="ti">shelved.</span></h2>
          </Reveal>
          <Reveal delay={0.1}><p className="section-note" style={{ marginTop: 14 }}>EVERY ROW IS A LIVE REPO. NO CONCEPT ART. NO VAPORWARE.</p></Reveal>
        </div>

        <div className="ev-list">
          {allProjects.slice(0, PREVIEW).map((p, i) => (
            <Reveal key={p.title} delay={Math.min(i * 0.04, 0.2)} y={18}>
              <a className="ev-row" href={p.link} target="_blank" rel="noopener noreferrer" data-cursor="VIEW">
                <span className="ev-idx">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="ev-title">{p.title}</span>
                  <span className="ev-desc" style={{ display: 'block' }}>{p.desc}</span>
                  <span className="ev-meta">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                    <span className={`ev-status st-${p.status}`}>{STATUS_LABELS[p.status]}</span>
                  </span>
                </span>
                <span className="ev-arrow">↗</span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="ev-foot">
          <Magnetic>
            <button className="btn btn-primary" data-cursor="ALL 18" onClick={onArchive}>
              OPEN FULL ARCHIVE — {allProjects.length} RECORDS ↗
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

/* ---------- STACK WALL ---------- */

export function StackWall() {
  const row = (items: typeof stackItems) =>
    items.map((s, i) => (
      <span key={i} className="stack-chip">
        <i aria-hidden="true">{s.icon}</i>
        {s.name}
      </span>
    ));

  return (
    <section id="stack" className="section" style={{ overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div className="section-head" style={{ position: 'relative', display: 'block', marginBottom: 44 }}>
          <GhostNum n="03" />
          <Reveal><p className="section-code">// 03 — STACK WALL</p></Reveal>
          <Reveal delay={0.05}><h2 className="section-title">TOOLS OF<br />the <span className="ti">trade.</span></h2></Reveal>
          <Reveal delay={0.1}><p className="section-note" style={{ marginTop: 14 }}>PICKED PER PROBLEM. NEVER PER HYPE CYCLE.</p></Reveal>
        </div>
      </div>
      <VelocitySkew>
        <div className="stack-wrap">
          <div className="stack-track" style={{ ['--dur' as string]: '42s' }}>
            {[0, 1].map((g) => (
              <div key={g} className="marquee-group" style={{ gap: 14, paddingRight: 14 }}>{row(stackItems)}</div>
            ))}
          </div>
          <div className="stack-track rev" style={{ ['--dur' as string]: '48s' }}>
            {[0, 1].map((g) => (
              <div key={g} className="marquee-group" style={{ gap: 14, paddingRight: 14 }}>{row([...stackItems].reverse())}</div>
            ))}
          </div>
        </div>
      </VelocitySkew>
    </section>
  );
}

/* ---------- TERMINAL ---------- */

export function TerminalSection() {
  return (
    <section id="terminal" className="section">
      <div className="container">
        <div className="section-head" style={{ position: 'relative', display: 'block' }}>
          <GhostNum n="04" />
          <Reveal><p className="section-code">// 04 — DIRECT ACCESS</p></Reveal>
          <Reveal delay={0.05}><h2 className="section-title">TALK TO<br />the <span className="ti">machine.</span></h2></Reveal>
          <Reveal delay={0.1}><p className="section-note" style={{ marginTop: 14 }}>A REAL SHELL. TRY 'WHOAMI', 'PROJECTS', OR 'SUDO HIRE-AAYUSH'.</p></Reveal>
        </div>
        <Reveal y={40}>
          <Terminal />
          <p className="term-hint">
            PRESS <kbd>ENTER</kbd> TO EXECUTE · <kbd>CLEAR</kbd> WIPES THE EVIDENCE
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */

export function Contact({ onToast }: { onToast: (msg: string) => void }) {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('technology457t@gmail.com');
      onToast('EMAIL COPIED → NOW USE IT.');
    } catch {
      onToast('COPY FAILED — IT IS RIGHT THERE THOUGH.');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container" style={{ position: 'relative' }}>
        <GhostNum n="05" />
        <Reveal><p className="section-code">// 05 — TRANSMISSION</p></Reveal>
        <h2 className="contact-big" style={{ marginTop: 18 }}>
          {[
            ['GOT', 'A', 'HARD'],
            ['PROBLEM?', 'good.'],
          ].map((line, li) => (
            <span key={li} style={{ display: 'block', overflow: 'hidden' }}>
              {line.map((w, wi) => (
                <motion.span
                  key={w}
                  className={w === 'good.' ? 'ti' : undefined}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.28em',
                    color: w === 'good.' ? 'var(--accent)' : undefined,
                  }}
                  initial={{ y: '115%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: 0.08 * (li * 3 + wi), duration: 0.8, ease: EASE }}
                >
                  {w}
                </motion.span>
              ))}
            </span>
          ))}
        </h2>
        <Reveal delay={0.15}>
          <button className="contact-email" data-cursor="COPY" onClick={copyEmail}>
            technology457t@gmail.com
          </button>
          <p className="email-hint">[ CLICK TO COPY ]</p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="accept-note">
            <b>ACCEPTING:</b> INTERNSHIPS · CO-FOUNDER ROLES · FREELANCE BUILDS · REMOTE OK
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="link-stack" style={{ textAlign: 'left', marginTop: 30 }}>
            <a className="link-row" href="https://wa.me/9779746944429" target="_blank" rel="noopener noreferrer" data-cursor="CHAT">
              <em>WHATSAPP</em>
              <strong>+977 9746944429 ↗</strong>
            </a>
            <a className="link-row" href="https://github.com/AayusX" target="_blank" rel="noopener noreferrer" data-cursor="FORK">
              <em>GITHUB</em>
              <strong>@AayusX ↗</strong>
            </a>
            <a className="link-row" href="https://www.facebook.com/Aayush457W" target="_blank" rel="noopener noreferrer" data-cursor="WAVE">
              <em>FACEBOOK</em>
              <strong>Aayush457W ↗</strong>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-name"
          aria-hidden="true"
          initial={{ opacity: 0, y: 80, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          AAYUSX
        </motion.div>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} AAYUSH BHANDARI</span>
          <span>BUILT WITH REACT · THREE.JS · RAPIER PHYSICS</span>
          <span>KATHMANDU, NEPAL — 27.7172° N, 85.3240° E</span>
          <span>V7.2 // NO TEMPLATES WERE HARMED</span>
        </div>
      </div>
    </footer>
  );
}