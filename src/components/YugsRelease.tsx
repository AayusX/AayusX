import { useTranslation } from 'react-i18next';
import { YUGS } from '../content/yugs';
import { ArrowUpRight, SparkIcon } from './Icons';

export function YugsFeature() {
  const { t } = useTranslation();
  const points = t('release.points', { returnObjects: true }) as string[];

  return (
    <section className="section section--release" aria-labelledby="yugs-release-title">
      <div className="container">
        <a
          className="yugs-feature"
          href={YUGS.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="yugs-feature__visual">
            <span className="yugs-flag yugs-feature__status" aria-hidden="true">
              <span className="yugs-flag__dot" aria-hidden="true" />
              {t('release.nowLive')}
            </span>
            <img
              className="yugs-feature__logo"
              src={YUGS.logo}
              alt=""
              width={YUGS.logoWidth}
              height={YUGS.logoHeight}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="yugs-feature__body">
            <p className="eyebrow">{t('release.eyebrow')}</p>
            <h2 className="yugs-feature__title" id="yugs-release-title">
              {t('release.title')}
            </h2>
            <p className="yugs-feature__lede">{t('release.lede')}</p>

            <ul className="yugs-feature__points">
              {points.map((point) => (
                <li key={point}>
                  <SparkIcon aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

            <span className="yugs-feature__cta">
              {t('release.primaryCta')}
              <ArrowUpRight />
            </span>
            <span className="yugs-feature__meta">
              {t('release.meta')}
              <span className="sr-only"> ({t('common.external')})</span>
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}

export function YugsReleaseCard() {
  const { t } = useTranslation();

  return (
    <a className="yugs-release" href={YUGS.url} target="_blank" rel="noopener noreferrer">
      <span className="yugs-release__visual" aria-hidden="true">
        <img
          className="yugs-release__logo"
          src={YUGS.logo}
          alt=""
          width={YUGS.logoWidth}
          height={YUGS.logoHeight}
          loading="lazy"
          decoding="async"
        />
      </span>

      <span className="yugs-release__copy">
        <span className="yugs-flag">{t('release.projectsLabel')}</span>
        <span className="yugs-release__title">{t('release.projectsTitle')}</span>
        <span className="yugs-release__body">{t('release.projectsBody')}</span>
      </span>

      <span className="yugs-release__cta">
        {t('release.projectsCta')}
        <ArrowUpRight />
        <span className="sr-only"> ({t('common.external')})</span>
      </span>
    </a>
  );
}
