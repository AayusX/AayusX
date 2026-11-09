import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { ArrowUpRight } from '../components/Icons';
import { useLocale } from '../i18n/useLocale';

interface MilestoneCopy {
  year: string;
  title: string;
  body: string;
  why: string;
}

export function JourneyPage() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const seo = t('seo.journey', { returnObjects: true }) as { title: string; description: string };
  const milestones = t('journey.milestones', { returnObjects: true }) as MilestoneCopy[];
  const journeyYears = Array.from(new Set(milestones.map((milestone) => milestone.year)));

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/journey" />
      <PageHero
        eyebrow={t('journey.eyebrow')}
        title={t('journey.title')}
        lede={t('journey.lede')}
        className="page-hero--violet"
      />

      <section className="section">
        <div className="container">
          <div className="journey-map">
            <p className="eyebrow">{t('journey.milestonesLabel')}</p>
            <div className="journey-map__years" aria-hidden="true">
              {journeyYears.map((year) => (
                <span key={year}>{year}</span>
              ))}
            </div>
          </div>
          <div className="milestones">
            {milestones.map((milestone) => (
              <article className="milestone" key={milestone.title}>
                <p className="milestone__year">{milestone.year}</p>
                <div>
                  <h2 className="milestone__title">{milestone.title}</h2>
                  <p className="milestone__body">{milestone.body}</p>
                </div>
                <div className="milestone__why">
                  <span className="milestone__why-label">{t('caseStudy.result')}</span>
                  <p>{milestone.why}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="journey-note">{t('journey.note')}</p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container cta-band">
          <div>
            <p className="eyebrow">{t('journey.closingTitle')}</p>
            <h2>{t('home.selectedTitle')}</h2>
            <p>{t('journey.closingBody')}</p>
          </div>
          <Link className="button" to={lp('/contact')}>
            {t('journey.closingCta')}
            <ArrowUpRight />
          </Link>
        </div>
      </section>
    </>
  );
}
