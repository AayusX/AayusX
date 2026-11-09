import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PRIMARY_NAV, SITE } from '../content/site';
import { useLocale } from '../i18n/useLocale';
import { useBodyScrollLock, useFocusTrap } from '../lib/focus';
import { ArrowUpRight, CloseIcon, MailIcon, MenuIcon } from './Icons';
import { LanguageSwitcher } from './LanguageSwitcher';

function isCurrent(pathname: string, path: string): boolean {
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

function MobileMenu({
  canonicalPath,
  onClose,
}: {
  canonicalPath: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, true, onClose);
  useBodyScrollLock(true);

  return createPortal(
    <motion.div
      id="site-mobile-menu"
      className="mobile-menu"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t('a11y.menuDialog')}
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mobile-menu__top">
        <Link className="wordmark" to={lp('/')} onClick={onClose}>
          AayusX<span className="wordmark-dot" aria-hidden="true" />
        </Link>
        <button type="button" className="menu-toggle" onClick={onClose}>
          <CloseIcon />
          {t('common.closeMenu')}
        </button>
      </div>

      <div className="mobile-menu__body">
        <nav aria-label={t('nav.primaryLabel')}>
          <div className="mobile-menu__nav">
            {PRIMARY_NAV.map((item) => (
              <Link
                className="mobile-menu__link"
                key={item.key}
                to={lp(item.path)}
                onClick={onClose}
                aria-current={isCurrent(canonicalPath, item.path) ? 'page' : undefined}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>
        </nav>

        <LanguageSwitcher variant="menu" />

        <div className="mobile-menu__meta">
          <a href={`mailto:${SITE.email}`}>
            <MailIcon
              style={{ display: 'inline', width: '0.9rem', height: '0.9rem', marginRight: '0.3rem' }}
            />
            {SITE.email}
          </a>
          {SITE.socials.map((social) => (
            <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer">
              {social.label}
              <ArrowUpRight
                style={{ display: 'inline', width: '0.8rem', height: '0.8rem', marginLeft: '0.2rem' }}
              />
              <span className="sr-only"> ({t('common.external')})</span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}

export function Header() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const canonicalPath = location.pathname.replace(/^\/ne/, '') || '/';

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="wordmark" to={lp('/')} aria-label={`${SITE.name} — ${t('common.goHome')}`}>
          AayusX<span className="wordmark-dot" aria-hidden="true" />
        </Link>

        <nav className="desktop-nav" aria-label={t('nav.primaryLabel')}>
          {PRIMARY_NAV.map((item) => (
            <Link
              className="nav-link"
              key={item.key}
              to={lp(item.path)}
              aria-current={isCurrent(canonicalPath, item.path) ? 'page' : undefined}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageSwitcher />
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls={open ? 'site-mobile-menu' : undefined}
            aria-haspopup="dialog"
            aria-label={t('common.openMenu')}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
            {t('common.menu')}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && <MobileMenu canonicalPath={canonicalPath} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}
