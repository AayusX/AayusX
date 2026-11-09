import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { SectionHead } from '../components/SectionHead';
import { ArticleRow } from '../components/ArticleRow';
import { Changa } from '../features/mascot/Changa';
import { StatusBadge } from '../components/StatusBadge';
import { ArrowUpRight } from '../components/Icons';
import { FEATURED_CASE_STUDIES, type CaseStudy } from '../content/projects';
import { ARTICLE_SLUGS } from '../content/articles';
import { SITE } from '../content/site';
import { profilePageSchema } from '../content/schema';
import { useLocale } from '../i18n/useLocale';

interface ProjectCopy {
  title: string;
  subtitle: string;
  category: string;
  summary: string;
}

interface CapabilityCopy {
  title: string;
  body: string;
  tech: string[];
  proof: string;
  proofSlug: string;
}

export function HomePage() {
  const { t } = useTranslation();
  const { language, lp } = useLocale();
  const seo = t('seo.home', { returnObjects: true }) as { title: string; description: string };
  const categories = t('capabilities.categories', { returnObjects: true }) as CapabilityCopy[];

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path="/"
        type="profile"
        jsonLd={profilePageSchema({
          title: seo.title,
          description: seo.description,
          url: `${SITE.url}${lp('/')}`,
          language,
        })}
      />

      <section className="hero hero--atlas">
        <div className="container hero-grid hero-grid--atlas">
          <div className="hero-copy">
            <p className="hero-eyebrow">{t('home.eyebrow')}</p>
            <h1 className="hero-title">
              {t('home.titleBefore')}{' '}
              <span className="hero-emphasis">{t('home.titleEmphasis')}</span>{' '}
              {t('home.titleAfter')}
            </h1>
            <p className="hero-intro">{t('home.intro')}</p>

            <div className="hero-actions">
              <Link className="button" to={lp('/projects')}>
                {t('home.ctaWork')}
                <ArrowUpRight />
              </Link>
              <Link className="button button--ghost" to={lp('/about')}>
                {t('home.ctaAbout')}
              </Link>
            </div>

            <div className="hero-note">
              <span className="hero-note__dot" aria-hidden="true" />
              <div>
                <strong>{t('home.currentlyLabel')}</strong>
                {t('home.currentlyText')}
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <figure className="hero-lens">
              <div className="hero-lens__frame">
                <img
                  className="hero-lens__image"
                  src="/me.jpg"
                  alt={t('home.portraitAlt')}
                  width={1000}
                  height={1000}
                  decoding="async"
                />
              </div>
              <figcaption className="hero-lens__caption">
                <span>{t('home.portraitCaption')}</span>
                <span>{t('home.portraitNote')}</span>
              </figcaption>
            </figure>

            <div className="hero-changa" aria-hidden="true">
              <Changa />
            </div>

            <p className="hero-mascot-note">
              <strong>{t('home.mascotLabel')}</strong>
              {t('home.mascotNote')}
            </p>
          </div>
        </div>
        <div className="hero-tide" aria-hidden="true" />
      </section>

      <section className="section" id="selected-work">
        <div className="container">
          <SectionHead
            label={t('home.selectedLabel')}
            title={t('home.selectedTitle')}
            lede={t('home.selectedIntro')}
            link={{ to: lp('/projects'), label: t('home.viewAll') }}
          />

          <div className="work-list">
            {FEATURED_CASE_STUDIES.map((project: CaseStudy, index) => {
              const copy = t(`projects.items.${project.slug}`, {
                returnObjects: true,
              }) as unknown as ProjectCopy;

              return (
                <Link
                  className="work-item"
                  key={project.slug}
                  to={lp(`/projects/${project.slug}`)}
                >
                  <span className="work-item__index">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="work-item__title">{copy.title}</h3>
                    <p className="work-item__summary">{copy.summary}</p>
                    <div className="work-item__meta">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span className="tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="work-item__aside">
                    <span className="work-item__year">
                      {project.year} · {copy.category}
                    </span>
                    <StatusBadge status={project.status} />
                    <span className="work-item__arrow">
                      {t('common.readCaseStudy')}
                      <ArrowUpRight />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--violet">
        <div className="container two-col">
          <div>
            <p className="eyebrow">{t('home.aboutLabel')}</p>
            <h2 className="statement">{t('home.aboutTitle')}</h2>
          </div>
          <div className="text-block">
            <p>{t('home.aboutBody')}</p>
            <p style={{ marginTop: 'var(--space-5)' }}>
              <Link className="section-link" to={lp('/about')}>
                {t('home.aboutLink')}
                <ArrowUpRight />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            label={t('home.capabilitiesLabel')}
            title={t('home.capabilitiesTitle')}
            lede={t('home.capabilitiesBody')}
            link={{ to: lp('/capabilities'), label: t('home.capabilitiesLink') }}
          />

          <div className="capability-list">
            {categories.map((category, index) => (
              <div className="capability" key={category.title}>
                <span className="capability__num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="capability__title">{category.title}</h3>
                <div>
                  <p className="capability__body">{category.body}</p>
                  <div className="capability__tech">
                    {category.tech.map((tech) => (
                      <span className="tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHead
            label={t('home.writingLabel')}
            title={t('home.writingTitle')}
            link={{ to: lp('/writing'), label: t('home.writingLink') }}
          />
          <div className="article-list">
            {ARTICLE_SLUGS.map((slug) => (
              <ArticleRow key={slug} slug={slug} />
            ))}
          </div>
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
