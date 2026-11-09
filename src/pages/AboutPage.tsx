import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { SectionHead } from '../components/SectionHead';
import { ArrowUpRight } from '../components/Icons';
import { SITE } from '../content/site';
import { profilePageSchema } from '../content/schema';
import { useLocale } from '../i18n/useLocale';

interface ValueCopy {
  title: string;
  body: string;
}

interface FactCopy {
  label: string;
  value: string;
}

export function AboutPage() {
  const { t } = useTranslation();
  const { language, lp } = useLocale();
  const seo = t('seo.about', { returnObjects: true }) as { title: string; description: string };
  const story = t('about.story', { returnObjects: true }) as string[];
  const values = t('about.values', { returnObjects: true }) as ValueCopy[];
  const facts = t('about.facts', { returnObjects: true }) as FactCopy[];

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path="/about"
        type="profile"
        jsonLd={profilePageSchema({
          title: seo.title,
          description: seo.description,
          url: `${SITE.url}${lp('/about')}`,
          language,
        })}
      />

      <PageHero
        eyebrow={t('about.eyebrow')}
        title={t('about.title')}
        lede={t('about.lede')}
        meta={
          <>
            <span>{t('contact.locationValue')}</span>
            <span>{t('common.available')}</span>
          </>
        }
      />

      <section className="section">
        <div className="container about-intro">
          <figure className="about-portrait">
            <img
              src="/me.jpg"
              alt={t('about.portraitAlt')}
              width={1000}
              height={1000}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span>{t('about.portraitCaption')}</span>
              <span>AayusX</span>
            </figcaption>
          </figure>

          <div>
            <div className="about-story">
              {story.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <div className="about-facts">
              <p className="about-facts__title">{t('about.factsLabel')}</p>
              <dl>
                {facts.map((fact) => (
                  <div className="about-fact" key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="connect-card">
              <p className="eyebrow">{t('about.connectLabel')}</p>
              <h2>{t('about.connectTitle')}</h2>
              <p>{t('about.connectBody')}</p>
              <Link className="button button--small" to={lp('/contact')}>
                {t('about.connectCta')}
                <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHead label={t('about.valuesLabel')} title={t('about.valuesTitle')} />
          <div className="values">
            {values.map((value) => (
              <div className="value" key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-quote">
        <div className="container">
          <blockquote>{t('about.quote')}</blockquote>
          <cite>{t('about.quoteSource')}</cite>
        </div>
      </section>

      <section className="section--tight">
        <div className="container cta-band">
          <div>
            <p className="eyebrow">{t('home.contactLabel')}</p>
            <h2>{t('home.contactTitle')}</h2>
            <p>{t('home.contactBody')}</p>
          </div>
          <Link className="button" to={lp('/contact')}>
            {t('home.contactCta')}
            <ArrowUpRight />
          </Link>
        </div>
      </section>
    </>
  );
}
