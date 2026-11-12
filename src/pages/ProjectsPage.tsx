import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { ProjectCover } from '../components/ProjectCover';
import { StatusBadge } from '../components/StatusBadge';
import { YugsReleaseCard } from '../components/YugsRelease';
import { ArrowUpRight } from '../components/Icons';
import {
  ARCHIVE_PROJECTS,
  CASE_STUDIES,
  PROJECT_STATUSES,
  type ProjectStatus,
} from '../content/projects';
import { useLocale } from '../i18n/useLocale';

type Filter = 'all' | ProjectStatus;

export function ProjectsPage() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const seo = t('seo.projects', { returnObjects: true }) as { title: string; description: string };
  const [filter, setFilter] = useState<Filter>('all');

  const counts = useMemo(() => {
    const result: Record<Filter, number> = {
      all: CASE_STUDIES.length + ARCHIVE_PROJECTS.length,
      production: 0,
      shipped: 0,
      iterating: 0,
      archived: 0,
      classified: 0,
    };
    [...CASE_STUDIES, ...ARCHIVE_PROJECTS].forEach((project) => {
      result[project.status] += 1;
    });
    return result;
  }, []);

  const visibleCases = filter === 'all' ? CASE_STUDIES : CASE_STUDIES.filter((p) => p.status === filter);
  const visibleArchive =
    filter === 'all' ? ARCHIVE_PROJECTS : ARCHIVE_PROJECTS.filter((p) => p.status === filter);
  const empty = visibleCases.length === 0 && visibleArchive.length === 0;

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/projects" />
      <PageHero eyebrow={t('projects.eyebrow')} title={t('projects.title')} lede={t('projects.lede')} />

      <section className="section">
        <div className="container">
          <YugsReleaseCard />

          <div className="filters" role="group" aria-label={t('projects.filterLabel')}>
            {(['all', ...PROJECT_STATUSES] as Filter[]).map((status) => (
              <button
                type="button"
                className="filter"
                key={status}
                aria-pressed={filter === status}
                onClick={() => setFilter(status)}
              >
                {status === 'all' ? t('projects.filterAll') : t(`common.statuses.${status}`)}
                <span className="filter__count">{counts[status]}</span>
              </button>
            ))}
          </div>

          {empty ? (
            <p className="empty-state">{t('projects.noResults')}</p>
          ) : (
            <>
              {visibleCases.length > 0 && (
                <div>
                  <p className="eyebrow">{t('projects.featuredLabel')}</p>
                  <div className="project-grid">
                    {visibleCases.map((project) => (
                      <ProjectCover key={project.slug} project={project} />
                    ))}
                  </div>
                </div>
              )}

              {visibleArchive.length > 0 && (
                <div style={{ marginTop: 'var(--space-section)' }}>
                  <div className="section-head">
                    <div>
                      <p className="eyebrow">{t('projects.archiveLabel')}</p>
                      <h2 className="section-title">{t('projects.archiveTitle')}</h2>
                    </div>
                    <p className="section-lede">{t('projects.archiveIntro')}</p>
                  </div>

                  <div className="archive">
                    {visibleArchive.map((project, index) => (
                      <a
                        className="archive-row"
                        key={project.title}
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="archive-row__index">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="archive-row__title">{project.title}</span>
                        <span className="archive-row__tech">{project.tech.join(' · ')}</span>
                        <span className="archive-row__end">
                          <StatusBadge status={project.status} />
                          <ArrowUpRight />
                          <span className="sr-only"> ({t('common.external')})</span>
                        </span>
                      </a>
                    ))}
                  </div>
                  <p className="archive-note">{t('projects.archiveStatusNote')}</p>
                </div>
              )}
            </>
          )}

          <div style={{ marginTop: 'var(--space-10)' }}>
            <Link className="button button--ghost button--small" to={lp('/contact')}>
              {t('home.contactCta')}
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
