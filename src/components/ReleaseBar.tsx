import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { YUGS } from '../content/yugs';
import { ArrowUpRight, CloseIcon } from './Icons';

const STORAGE_KEY = 'aayusx.yugs-release-dismissed';

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function ReleaseBar() {
  const { t } = useTranslation();
  const [dismissed, setDismissed] = useState(readDismissed);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* Storage can be unavailable; dismissal still applies for this visit. */
    }
  };

  return (
    <aside className="release-bar" aria-label={t('release.barLabel')}>
      <div className="container release-bar__inner">
        <span className="release-bar__tag">
          <span className="release-bar__pulse" aria-hidden="true" />
          {t('release.badge')}
        </span>

        <p className="release-bar__text">
          <strong>{t('release.barTitle')}</strong>
          <span>{t('release.barBody')}</span>
        </p>

        <a
          className="release-bar__link"
          href={YUGS.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('release.barCta')}
          <ArrowUpRight />
          <span className="sr-only"> ({t('common.external')})</span>
        </a>

        <button
          type="button"
          className="release-bar__close"
          onClick={dismiss}
          aria-label={t('release.dismiss')}
        >
          <CloseIcon />
        </button>
      </div>
    </aside>
  );
}
