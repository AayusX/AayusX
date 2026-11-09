import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  createContext,
  useContext,
} from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useFocusTrap, useBodyScrollLock } from '../../lib/focus';
import { ArrowRight, CloseIcon } from '../../components/Icons';
import { Changa } from '../mascot/Changa';

interface IntroContextValue {
  replay: () => void;
}

const IntroContext = createContext<IntroContextValue | null>(null);

export function useIntro(): IntroContextValue {
  const value = useContext(IntroContext);
  if (!value) throw new Error('useIntro must be used inside MemoryIntroProvider');
  return value;
}

function LiquidIntro({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [leaving, setLeaving] = useState(false);
  const closingRef = useRef(false);

  const finish = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setLeaving(true);
    window.setTimeout(onClose, reduceMotion ? 0 : 460);
  }, [onClose, reduceMotion]);

  useFocusTrap(dialogRef, true, finish);
  useBodyScrollLock(true);

  useEffect(() => {
    const main = document.getElementById('main-content');
    main?.setAttribute('inert', '');
    return () => main?.removeAttribute('inert');
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setTimeout(finish, 3800);
    return () => window.clearTimeout(timer);
  }, [finish, reduceMotion]);

  return (
    <div
      className={`intro intro--atlas${leaving ? ' is-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={t('a11y.introDialog')}
      ref={dialogRef}
    >
      <div className="intro__bar">
        <p className="intro__label">{t('intro.label')}</p>
        <button type="button" className="skip-intro" onClick={finish}>
          <CloseIcon />
          {t('intro.skip')}
        </button>
      </div>

      <div className="intro__stage">
        <div className="intro__drop" aria-hidden="true" />
        <div className="intro__ripples" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="intro__content">
          <p className="intro__eyebrow">{t('intro.eyebrow')}</p>
          <h2 className="intro__title">
            <span className="intro__wordmark">{t('intro.title')}</span>
          </h2>
          <p className="intro__lead">{t('intro.lead')}</p>
        </div>

        <div className="intro__changa" aria-hidden="true">
          <Changa tone="dark" />
        </div>

        <div className="intro__foot">
          <p className="intro__foot-note">{t('intro.finalLine')}</p>
          <button type="button" className="intro__enter" onClick={finish}>
            {t('intro.enter')}
            <ArrowRight />
          </button>
        </div>

        <span className="intro__wash" aria-hidden="true" />
      </div>

      {reduceMotion ? <p className="intro__reduced-note">{t('intro.reducedMotionNote')}</p> : null}
    </div>
  );
}

export function MemoryIntroProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  // In-memory only: resets on every full reload, so the intro plays again.
  // It still prevents replaying when navigating back to the home route.
  const shownThisLoad = useRef(false);

  useEffect(() => {
    const isHome = location.pathname === '/' || location.pathname === '/ne';
    if (!isHome || shownThisLoad.current) return;

    const timer = window.setTimeout(
      () => {
        shownThisLoad.current = true;
        setOpen(true);
      },
      reduceMotion ? 0 : 420,
    );
    return () => window.clearTimeout(timer);
  }, [location.pathname, reduceMotion]);

  const replay = useCallback(() => setOpen(true), []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <IntroContext.Provider value={{ replay }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            key="liquid-intro"
            className="intro-layer"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
          >
            <LiquidIntro onClose={close} />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {open ? t('a11y.introDialog') : ''}
      </span>
    </IntroContext.Provider>
  );
}
