import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { Kite } from '../features/mascot/Kite';
import {
  KITE_EXPRESSIONS,
  KITE_EXPRESSION_ORDER,
  KITE_SECTION_LINES,
  type KiteExpression,
} from '../features/mascot/kiteData';
import '../styles/kite.css';
import '../styles/kite-lab.css';

type Mode = 'expressions' | 'sections';
type Surface = 'paper' | 'ink';

const SIZE_CHECKS = [
  { size: 112, label: '112 px' },
  { size: 72, label: '72 px' },
  { size: 44, label: '44 px' },
  { size: 28, label: '28 px' },
];

export function KiteLabPage() {
  const reduceMotion = useReducedMotion();
  const [expression, setExpression] = useState<KiteExpression>('welcome');
  const [line, setLine] = useState(KITE_EXPRESSIONS.welcome.line);
  const [mode, setMode] = useState<Mode>('expressions');
  const [surface, setSurface] = useState<Surface>('paper');
  const [playing, setPlaying] = useState(false);
  const playIndex = useRef(0);

  const spec = KITE_EXPRESSIONS[expression];

  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousRobots = existingRobots?.content ?? null;
    let meta = existingRobots;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.content = 'noindex, nofollow';
    document.documentElement.classList.add('kite-lab-mode');
    document.title = 'Changa — isolated kite prototype';

    return () => {
      if (existingRobots) {
        existingRobots.content = previousRobots ?? '';
      } else {
        meta?.remove();
      }
      document.title = previousTitle;
      document.documentElement.classList.remove('kite-lab-mode');
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) setPlaying(false);
  }, [reduceMotion]);

  useEffect(() => {
    if (!playing || reduceMotion) return;

    const timer = window.setInterval(() => {
      playIndex.current = (playIndex.current + 1) % KITE_EXPRESSION_ORDER.length;
      const next = KITE_EXPRESSION_ORDER[playIndex.current];
      setExpression(next);
      setLine(KITE_EXPRESSIONS[next].line);
      setMode('expressions');
    }, 2800);

    return () => window.clearInterval(timer);
  }, [playing, reduceMotion]);

  const selectExpression = (next: KiteExpression) => {
    setExpression(next);
    setLine(KITE_EXPRESSIONS[next].line);
    setMode('expressions');
    setPlaying(false);
  };

  const selectSection = (id: string) => {
    const section = KITE_SECTION_LINES.find((item) => item.id === id);
    if (!section) return;
    setExpression(section.expression);
    setLine(section.line);
    setMode('sections');
    setPlaying(false);
  };

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    playIndex.current = Math.max(0, KITE_EXPRESSION_ORDER.indexOf(expression));
    setPlaying(true);
  };

  return (
    <main className="kite-lab">
      <div className="kite-lab__inner">
        <div className="kite-lab__top">
          <span>Isolated character prototype · not in navigation</span>
          <Link className="kite-lab__back" to="/">
            Back to AayusX
          </Link>
        </div>

        <header className="kite-lab__hero">
          <div>
            <p className="eyebrow">Changa / character study</p>
            <h1 className="kite-lab__title">The kite, with a face.</h1>
            <p className="kite-lab__lede">
              The same diamond, four panels, two eyes, and ribbon tail — rebuilt as a dimensional
              vector rig with real eyelids, directional gaze, and ten reusable states. This is an
              isolated lab, not the live mascot.
            </p>
          </div>
          <p className="kite-lab__lede">
            Layered SVG panels under CSS perspective give the depth without a WebGL scene. It stays
            sharp at 28 px, costs almost nothing on mobile, and keeps the face fully art-directed.
          </p>
        </header>

        <section aria-labelledby="kite-stage-title">
          <h2 id="kite-stage-title" className="sr-only">
            Expression preview
          </h2>

          <div className="kite-lab__surfaces">
            <span className="kite-lab__tabs-label">Surface</span>
            {(['paper', 'ink'] as Surface[]).map((option) => (
              <button
                type="button"
                className="kite-lab__surface"
                key={option}
                aria-pressed={surface === option}
                onClick={() => setSurface(option)}
              >
                {option === 'paper' ? 'Paper' : 'Aubergine'}
              </button>
            ))}
          </div>

          <div className={`kite-lab__stage kite-lab__stage--${surface}`}>
            <div className="kite-lab__character">
              <Kite expression={expression} trackPointer className="kite-lab__kite" />
              <div
                className="kite-bubble"
                key={`${expression}-${line}`}
                role="status"
                aria-live={playing ? 'off' : 'polite'}
              >
                <p>{line}</p>
                <span className="kite-bubble__name">Changa</span>
              </div>
            </div>

            <div className="kite-lab__readout">
              <p className="kite-lab__readout-label">Current expression</p>
              <p className="kite-lab__state">{spec.label}</p>
              <p className="kite-lab__hint">{spec.note}</p>
              <p className="kite-lab__hint">
                Move the pointer around the stage. The pupils and body follow, but the character
                never blocks a click.
              </p>
            </div>
          </div>
        </section>

        <section className="kite-lab__panel" aria-labelledby="kite-controls-title">
          <h2 id="kite-controls-title" className="sr-only">
            Character states
          </h2>

          <div className="kite-lab__tabs">
            <span className="kite-lab__tabs-label">Browse</span>
            <button
              type="button"
              className="kite-lab__tab"
              aria-pressed={mode === 'expressions'}
              onClick={() => setMode('expressions')}
            >
              Expressions
            </button>
            <button
              type="button"
              className="kite-lab__tab"
              aria-pressed={mode === 'sections'}
              onClick={() => setMode('sections')}
            >
              Section dialogue
            </button>
          </div>

          {mode === 'expressions' ? (
            <>
              <div className="kite-lab__grid">
                {KITE_EXPRESSION_ORDER.map((item) => {
                  const itemSpec = KITE_EXPRESSIONS[item];
                  return (
                    <button
                      type="button"
                      className="kite-lab__chip"
                      key={item}
                      aria-pressed={expression === item}
                      onClick={() => selectExpression(item)}
                    >
                      <strong>{itemSpec.label}</strong>
                      <small>{itemSpec.note}</small>
                    </button>
                  );
                })}
              </div>
              <div className="kite-lab__play">
                <button
                  type="button"
                  className="kite-lab__tab"
                  aria-pressed={playing}
                  onClick={togglePlay}
                  disabled={Boolean(reduceMotion)}
                >
                  {playing ? 'Pause cycle' : 'Play all states'}
                </button>
                <p className="kite-lab__hint">
                  {reduceMotion
                    ? 'Reduced motion is on. The states still change, but the float, blink, and tail animation stay still.'
                    : 'The cycle advances every 2.8 seconds. Selecting a state stops it.'}
                </p>
              </div>
            </>
          ) : (
            <div className="kite-lab__grid kite-lab__grid--sections">
              {KITE_SECTION_LINES.map((section) => (
                <button
                  type="button"
                  className="kite-lab__chip"
                  key={section.id}
                  aria-pressed={line === section.line}
                  onClick={() => selectSection(section.id)}
                >
                  <strong>{section.label}</strong>
                  <small>{section.line}</small>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="kite-lab__sizes" aria-labelledby="kite-sizes-title">
          <div>
            <h2 id="kite-sizes-title">Small-size check</h2>
            <p>
              The eyes and diamond should still read at footer and cursor scale. These previews are
              static and do not track the pointer.
            </p>
          </div>
          <div className="kite-lab__size-row">
            {SIZE_CHECKS.map((item) => (
              <div
                className="kite-lab__size"
                key={item.size}
                style={{ '--kite-size': `${item.size}px` } as CSSProperties}
              >
                <Kite expression="welcome" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="kite-lab__footer">
          <p>Prototype only. The live site still uses the existing intro kite and portrait cursor.</p>
          <p>Next step: review the rig, then wire it into the intro and section-level states.</p>
        </footer>
      </div>
    </main>
  );
}
