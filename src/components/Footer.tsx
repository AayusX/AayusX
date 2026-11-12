import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PRIMARY_NAV, SITE, mailtoHref } from '../content/site';
import { useLocale } from '../i18n/useLocale';
import { useIntro } from '../features/memory-intro/MemoryIntro';
import { scrollToTop } from '../lib/scroll';
import { ArrowUpRight } from './Icons';
import { MascotToggle } from './MascotToggle';
import { Mascot } from '../features/mascot/Mascot';

export function Footer() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const { replay } = useIntro();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand__top">
              <p className="footer-wordmark" aria-hidden="true">
                AayusX<span className="wordmark-dot" />
              </p>
              <div className="footer-mascot" aria-hidden="true">
                <Mascot />
              </div>
            </div>
            <p>{t('footer.statement')}</p>
            <div className="footer-actions">
              <Link className="button button--small" to={lp('/contact')}>
                {t('home.contactCta')}
              </Link>
              <button type="button" className="button button--small button--ghost" onClick={replay}>
                {t('footer.replayIntro')}
              </button>
            </div>
          </div>

          <nav className="footer-col" aria-label={t('nav.footerLabel')}>
            <h2>{t('footer.navigationLabel')}</h2>
            <ul>
              {PRIMARY_NAV.map((item) => (
                <li key={item.key}>
                  <Link to={lp(item.path)}>{t(`nav.${item.key}`)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h2>{t('footer.elsewhereLabel')}</h2>
            <ul>
              {SITE.socials.map((social) => (
                <li key={social.href}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.label}
                    <ArrowUpRight
                      style={{ display: 'inline', width: '0.75rem', height: '0.75rem', marginLeft: '0.2rem' }}
                    />
                    <span className="sr-only"> ({t('common.external')})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h2>{t('footer.contactLabel')}</h2>
            <ul>
              <li>
                <a href={mailtoHref()}>{SITE.email}</a>
              </li>
              <li>
                <span style={{ fontSize: 'var(--text-sm)', color: 'rgba(246, 239, 231, 0.7)' }}>
                  {t('contact.locationValue')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('footer.copyright', { year })}</p>
          <p>{t('footer.builtWith')}</p>
          <div className="footer-bottom__right">
            <MascotToggle />
            <span>{t('footer.sourceNote')}</span>
            <button type="button" className="text-button" onClick={() => scrollToTop(false)}>
              {t('footer.backToTop')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
