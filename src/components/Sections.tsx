import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity, useReducedMotion, AnimatePresence } from 'framer-motion';
import { allProjects, marqueeTop, marqueeBottom, stackItems, venturesDetail, STATUS_LABELS } from '../projectsData';
import Terminal from './Terminal';

const EASE = [0.2, 0, 0, 1] as const;

/* ---------- helpers ---------- */

export function Reveal({ children, delay = 0, y = 30, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
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
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.18}px, ${
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    /* wait for overlay close before scrolling */
    setTimeout(() => scrollToId(id), open ? 60 : 0);
  };

  const items: Array<[string, string, string]> = [
    ['01', 'manifesto', 'Manifesto'],
    ['02', 'evidence', 'Evidence'],
    ['03', 'ventures', 'Ventures'],
    ['04', 'stack', 'Stack'],
    ['05', 'terminal', 'Terminal'],
    ['06', 'contact', 'Contact'],
  ];

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a className="nav-logo" href="#top" onClick={(e) => { e.preventDefault(); go('top'); }} data-cursor="TOP">
            <i />
            AAYUSX<span style={{ color: 'var(--accent)' }}>.DEV</span>
          </a>
          <ul className="nav-links">
            {items.map(([, id, label]) => (
              <li key={id}><button onClick={() => go(id)}><Scramble text={label} /></button></li>
            ))}
          </ul>
          <div className="chip-status"><i />OPEN TO WORK</div>
          <button
            className={`burger${open ? ' open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {items.map(([n, id, label], i) => (
              <motion.button
                key={id}
                className="menu-link"
                data-cursor="GO"
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: EASE }}
                onClick={() => go(id)}
              >
                <em>{n}</em>
                {label}
              </motion.button>
            ))}
            <motion.div
              className="menu-foot mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              technology457t@gmail.com — KATHMANDU, NP
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- HERO ---------- */

export function Hero() {
  const time = useKathmanduTime();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  /* cinematic exit — content lifts, dims and shrinks as you leave */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.95]);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-glow" aria-hidden="true" />
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
            {'// BUILDER · LEADER · FOUNDER · CURIOUS'}
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
          19 shipped projects. Every link opens.
        </motion.p>

        <motion.div className="hero-roles" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.74, duration: 0.6, ease: EASE }}>
          <span className="tag">PRESIDENT · ICT CLUB</span>
          <a className="tag tag-link" href="https://yugya.com" target="_blank" rel="noopener noreferrer" data-cursor="VISIT">
            CO-FOUNDER · YUGYA.COM ↗
          </a>
        </motion.div>

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
  "Most portfolios are the same resumé in a different template. This one is 19 projects that run, a physics playground in the hero, and code I keep rewriting. Every link opens — nothing here is a screenshot.";
const HL = new Set(['physics', 'rebuilding.', 'projects', 'run,', 'screenshot.']);
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
          <p className="manifesto-sign">AAYUSX — SELF-TAUGHT IN KATHMANDU, WORKING REMOTE</p>
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
          <Reveal delay={0.1}><p className="section-note" style={{ marginTop: 14 }}>ALL 19 ROWS LINK TO LIVE REPOS.</p></Reveal>
        </div>

        <div className="ev-list">
          {allProjects.slice(0, PREVIEW).map((p, i) => (
            <Reveal key={p.title} delay={Math.min(i * 0.04, 0.2)} y={18}>
              <a className="ev-row" href={p.link} target="_blank" rel="noopener noreferrer" data-cursor="VIEW">
                <span className="ev-top">
                  <span className="ev-idx">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`ev-status st-${p.status}`}>{STATUS_LABELS[p.status]}</span>
                  <span className="ev-arrow">↗</span>
                </span>
                <span className="ev-title">{p.title}</span>
                <span className="ev-desc">{p.desc}</span>
                <span className="ev-meta">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="ev-foot">
          <Magnetic>
            <button className="btn btn-primary" data-cursor="ALL 19" onClick={onArchive}>
              OPEN FULL ARCHIVE — {allProjects.length} RECORDS ↗
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

/* ---------- VENTURES ---------- */

export function Ventures() {
  return (
    <section id="ventures" className="section">
      <div className="container">
        <div className="section-head" style={{ position: 'relative', display: 'block' }}>
          <GhostNum n="03" />
          <Reveal><p className="section-code">// 03 — ROLES</p></Reveal>
          <Reveal delay={0.05}><h2 className="section-title">CO-FOUNDER &amp;<br /><span className="ti">president.</span></h2></Reveal>
          <Reveal delay={0.1}><p className="section-note" style={{ marginTop: 14 }}>BOTH ROLES ARE LIVE RIGHT NOW.</p></Reveal>
        </div>

        <div className="ventures-grid">
          {venturesDetail.map((v, i) => (
            <Reveal
              key={v.org}
              delay={0.08 * i}
              y={26}
              className={i === 0 ? 'bento-main' : 'bento-side'}
            >
              <article className={`venture-card ${i === 0 ? 'is-main' : 'is-side'}`}>
                <span className="ghost-word" aria-hidden="true">{v.org.split(' ')[0]}</span>
                <p className="mono venture-tag">{v.tag}</p>
                <h3 className="venture-org">
                  {v.org.toLowerCase().replace(' ', '') === 'yugya' ? (
                    <span>YUGYA<span className="ti">.com</span></span>
                  ) : (
                    <span>{v.org}</span>
                  )}
                </h3>
                <p className="venture-role ti">{v.role}</p>
                <p className="venture-desc">{v.desc}</p>
                {v.metrics && (
                  <div className="venture-metrics" style={{ display: 'flex', gap: 14, marginTop: 14, flexWrap: 'wrap' }}>
                    {v.metrics.map((m, mi) => (
                      <span key={mi} className="mono" style={{ fontSize: 11, letterSpacing: 0, color: 'var(--accent)', background: 'var(--accent-dim)', padding: '3px 8px', borderRadius: 4 }}>
                        {m.value} {m.label}
                      </span>
                    ))}
                  </div>
                )}
                {v.whatIBuilt && (
                  <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: '.85rem', color: 'var(--muted)', lineHeight: 1.8 }}>
                    {v.whatIBuilt.slice(0, 3).map((item, ii) => (
                      <li key={ii}>{item}</li>
                    ))}
                  </ul>
                )}
                {v.techStack && (
                  <div style={{ marginTop: 10, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {v.techStack.map((t, ti) => (
                      <span key={ti} className="tag" style={{ fontSize: 9, padding: '2px 6px' }}>{t}</span>
                    ))}
                  </div>
                )}
                {v.link && (
                  <a className="btn btn-ghost venture-btn" href={v.link} target="_blank" rel="noopener noreferrer" data-cursor="VISIT">
                    {v.cta} ↗
                  </a>
                )}
              </article>
            </Reveal>
          ))}
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
        <i className="mk" aria-hidden="true">{s.mk}</i>
        {s.name}
      </span>
    ));

  return (
    <section id="stack" className="section" style={{ overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div className="section-head" style={{ position: 'relative', display: 'block', marginBottom: 44 }}>
          <GhostNum n="04" />
          <Reveal><p className="section-code">// 04 — STACK WALL</p></Reveal>
          <Reveal delay={0.05}><h2 className="section-title">TOOLS OF<br />the <span className="ti">trade.</span></h2></Reveal>
          <Reveal delay={0.1}><p className="section-note" style={{ marginTop: 14 }}>THE TOOLS BEHIND ALL 19 PROJECTS.</p></Reveal>
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
          <GhostNum n="05" />
          <Reveal><p className="section-code">// 05 — DIRECT ACCESS</p></Reveal>
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
        <GhostNum n="06" />
        <Reveal><p className="section-code">// 06 — TRANSMISSION</p></Reveal>
        <h2 className="contact-big" style={{ marginTop: 18 }}>
          {[
            ['OPEN', 'TO', 'WORK.'],
            ['email', 'is', 'fastest.'],
          ].map((line, li) => (
            <span key={li} style={{ display: 'block', overflow: 'hidden' }}>
              {line.map((w, wi) => (
                <motion.span
                  key={w}
                  className={w === 'fastest.' ? 'ti' : undefined}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.28em',
                    color: w === 'fastest.' ? 'var(--accent)' : undefined,
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
            <b>LOOKING FOR:</b> INTERNSHIPS · CO-FOUNDER ROLES · FREELANCE BUILDS · REMOTE OK
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
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="mono footer-kicker">// END OF LINE</p>
            <h3 className="footer-cta">OPEN TO <span className="ti">internships &amp;</span><br />co-founder roles.</h3>
          </div>
          <a className="btn btn-primary footer-mail" href="mailto:technology457t@gmail.com" data-cursor="MAIL">
            technology457t@gmail.com ↗
          </a>
        </div>

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

        <div className="footer-cols">
          <div className="footer-col">
            <p className="mono footer-h">NAVIGATE</p>
            <button onClick={() => scrollToId('manifesto')}>Manifesto</button>
            <button onClick={() => scrollToId('evidence')}>Evidence</button>
            <button onClick={() => scrollToId('stack')}>Stack</button>
            <button onClick={() => scrollToId('terminal')}>Terminal</button>
          </div>
          <div className="footer-col">
            <p className="mono footer-h">CONNECT</p>
            <a href="mailto:technology457t@gmail.com">Email</a>
            <a href="https://wa.me/9779746944429" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="https://github.com/AayusX" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://yugya.com" target="_blank" rel="noopener noreferrer">Yugya ↗</a>
          </div>
          <div className="footer-col">
            <p className="mono footer-h">ROLES</p>
            <span>Co-Founder · Yugya</span>
            <span>President · ICT Club</span>
          </div>
        </div>

        <div className="footer-meta">
          <span>© {year} AAYUSH BHANDARI</span>
          <span>BUILT WITH REACT · THREE.JS · RAPIER PHYSICS</span>
          <span>KATHMANDU, NEPAL — 27.7172° N, 85.3240° E</span>
        </div>
      </div>
    </footer>
  );
}