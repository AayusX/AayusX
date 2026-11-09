import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { StatusBadge } from '../components/StatusBadge';
import { ArrowLeft, ArrowUpRight, ArrowRight } from '../components/Icons';
import { getAdjacentCaseStudies, getCaseStudy } from '../content/projects';
import { caseStudySchema } from '../content/schema';
import { SITE } from '../content/site';
import { useLocale } from '../i18n/useLocale';
import { NotFoundPage } from './NotFoundPage';

interface CaseCopy {
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  description: string;
  role: string;
  outcomes: string[];
  context: string;
  approach: string;
  result: string;
}

export function CaseStudyPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { language, lp } = useLocale();
  const project = getCaseStudy(slug);

  if (!project) return <NotFoundPage />;

  const copy = t(`projects.items.${project.slug}`, { returnObjects: true }) as unknown as CaseCopy;
  const adjacent = getAdjacentCaseStudies(project.slug);
  const previousTitle = t(`projects.items.${adjacent.previous.slug}.title`) as string;
  const nextTitle = t(`projects.items.${adjacent.next.slug}.title`) as string;
  const canonical = `${SITE.url}${lp(`/projects/${project.slug}`)}`;

  return (
    <>
      <Seo
        title={`${copy.title} — ${SITE.name}`}
        description={copy.summary}
        path={`/projects/${project.slug}`}
        type="article"
        jsonLd={caseStudySchema({
          title: copy.title,
          description: copy.summary,
          url: canonical,
          language,
          year: project.year,
        })}
      />

      <article>
        <header className="case-hero">
          <div className="container">
            <div className="case-hero__top">
              <Link className="back-link" to={lp('/projects')}>
                <ArrowLeft />
                {t('caseStudy.backToProjects')}
              </Link>
              <div className="meta-list">
                <StatusBadge status={project.status} />
                <span>{project.year}</span>
              </div>
            </div>

            <p className="eyebrow">{t('caseStudy.label')}</p>
            <h1 className="case-title">{copy.title}</h1>
            <p className="case-subtitle">{copy.subtitle}</p>
            <p className="case-summary">{copy.summary}</p>

            <div className={`case-cover project-card__cover--${project.tone}`}>
              <div className="cover-top">
                <span>{copy.category}</span>
                <span>{project.year}</span>
              </div>
              <div className="cover-title">{copy.title}</div>
              <div className="cover-bottom">
                <StatusBadge status={project.status} />
                <span className="mono">AayusX</span>
              </div>
            </div>

            <dl className="case-meta">
              <div>
                <dt>{t('common.year')}</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>{t('common.role')}</dt>
                <dd>{copy.role}</dd>
              </div>
              <div>
                <dt>{t('common.status')}</dt>
                <dd>
                  <StatusBadge status={project.status} />
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="container case-layout">
          <aside className="case-side">
            <div>
              <p className="case-side__label">{t('caseStudy.role')}</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-secondary)' }}>
                {copy.role}
              </p>
            </div>

            <div style={{ marginTop: 'var(--space-8)' }}>
              <p className="case-side__label">{t('caseStudy.stack')}</p>
              <div className="case-stack">
                {project.tech.map((tech) => (
                  <span className="tag" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-8)' }}>
              <p className="case-side__label">{t('caseStudy.outcome')}</p>
              <ul className="case-side__outcomes">
                {copy.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>

            <div className="case-side__links">
              {project.live ? (
                <a
                  className="button button--small"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('common.viewLive')}
                  <ArrowUpRight />
                  <span className="sr-only"> ({t('common.external')})</span>
                </a>
              ) : null}
              {project.code ? (
                <a
                  className="button button--small button--ghost"
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('common.viewCode')}
                  <ArrowUpRight />
                  <span className="sr-only"> ({t('common.external')})</span>
                </a>
              ) : null}
            </div>
          </aside>

          <div className="case-body">
            <section className="case-block">
              <h2>{t('caseStudy.context')}</h2>
              <p>{copy.context}</p>
            </section>

            <section className="case-block">
              <h2>{t('caseStudy.approach')}</h2>
              <p>{copy.approach}</p>
            </section>

            <section className="case-block">
              <h2>{t('caseStudy.result')}</h2>
              <p>{copy.result}</p>
            </section>

            {project.media ? (
              <figure className="media case-media">
                <video controls muted preload="metadata" playsInline>
                  <source src={project.media.src} type="video/mp4" />
                </video>
                <figcaption>{t('projects.mediaNote')}</figcaption>
              </figure>
            ) : (
              <p className="case-note">{t('projects.noMediaNote')}</p>
            )}

            <p className="case-note">{t('caseStudy.note')}</p>
          </div>
        </div>

        <div className="container">
          <p className="eyebrow">{t('projects.relatedLabel')}</p>
          <nav className="case-nav" aria-label={t('projects.relatedLabel')}>
            <Link to={lp(`/projects/${adjacent.previous.slug}`)}>
              <span>
                <ArrowLeft style={{ display: 'inline', width: '0.8rem', height: '0.8rem' }} />{' '}
                {t('projects.previousProject')}
              </span>
              <strong>{previousTitle}</strong>
            </Link>
            <Link to={lp(`/projects/${adjacent.next.slug}`)}>
              <span>
                {t('projects.nextProject')}{' '}
                <ArrowRight style={{ display: 'inline', width: '0.8rem', height: '0.8rem' }} />
              </span>
              <strong>{nextTitle}</strong>
            </Link>
          </nav>
        </div>
      </article>
    </>
  );
}
