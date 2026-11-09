import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { CaseStudy } from '../content/projects';
import { useLocale } from '../i18n/useLocale';
import { ArrowUpRight } from './Icons';
import { StatusBadge } from './StatusBadge';

interface ProjectCopy {
  title: string;
  subtitle: string;
  category: string;
  summary: string;
}

export function ProjectCover({ project }: { project: CaseStudy }) {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const copy = t(`projects.items.${project.slug}`, { returnObjects: true }) as ProjectCopy;

  return (
    <Link className="project-card" to={lp(`/projects/${project.slug}`)}>
      <div className={`project-card__cover project-card__cover--${project.tone}`}>
        <div className="cover-top">
          <span>{copy.category}</span>
          <span>{project.year}</span>
        </div>
        <div className="cover-title">{copy.title}</div>
        <div className="cover-bottom">
          <StatusBadge status={project.status} />
          <span className="cover-arrow" aria-hidden="true">
            <ArrowUpRight />
          </span>
        </div>
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{copy.title}</h3>
        <p className="project-card__summary">{copy.summary}</p>
        <div className="project-card__meta">
          {project.tech.slice(0, 4).map((tech) => (
            <span className="tag" key={tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
