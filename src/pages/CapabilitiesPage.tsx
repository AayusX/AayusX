import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { TechMark } from '../components/TechMark';
import { ArrowUpRight } from '../components/Icons';
import { TECH_WALL } from '../content/tech';
import { useLocale } from '../i18n/useLocale';

interface CapabilityCopy {
  title: string;
  body: string;
  tech: string[];
  proof: string;
  proofSlug: string;
}

export function CapabilitiesPage() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const seo = t('seo.capabilities', { returnObjects: true }) as {
    title: string;
    description: string;
  };
  const categories = t('capabilities.categories', { returnObjects: true }) as CapabilityCopy[];
  const principles = t('capabilities.principles', { returnObjects: true }) as string[];

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/capabilities" />
      <PageHero
        eyebrow={t('capabilities.eyebrow')}
        title={t('capabilities.title')}
        lede={t('capabilities.lede')}
        meta={<span>{t('capabilities.toolsLabel')}</span>}
      />

      <section className="section">
        <div className="container">
          <div className="capability-list">
            {categories.map((category, index) => (
              <article className="capability" key={category.title}>
                <span className="capability__num">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="capability__title">{category.title}</h2>
                <div>
                  <p className="capability__body">{category.body}</p>
                  <div className="capability__tech">
                    {category.tech.map((tech) => (
                      <span className="tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  {category.proofSlug ? (
                    <Link
                      className="capability__proof"
                      to={lp(`/projects/${category.proofSlug}`)}
                    >
                      {t('capabilities.proofLabel')} {category.proof}
                      <ArrowUpRight />
                    </Link>
                  ) : (
                    <a
                      className="capability__proof"
                      href="https://yugya.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('capabilities.proofLabel')} {category.proof}
                      <ArrowUpRight />
                      <span className="sr-only"> ({t('common.external')})</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="principles">
            <h2>{t('capabilities.principlesLabel')}</h2>
            <ol>
              {principles.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section section--violet capabilities-tech">
        <div className="container">
          <p className="eyebrow">{t('capabilities.toolsLabel')}</p>
          <div className="tech-wall">
            {TECH_WALL.map((tech) => (
              <div className="tech-tile" key={tech}>
                <TechMark name={tech} />
                <span className="tech-tile__name">{tech}</span>
              </div>
            ))}
          </div>
          <p className="archive-note">{t('capabilities.note')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="not-listed">
            <h2>{t('capabilities.notListedTitle')}</h2>
            <p>{t('capabilities.notListedBody')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
