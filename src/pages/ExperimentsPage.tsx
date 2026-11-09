import { lazy, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { ArrowUpRight } from '../components/Icons';
import Terminal from '../components/Terminal';
import type { PhysicsBlock } from '../components/PhysicsScene';
import { FEATURED_CASE_STUDIES } from '../content/projects';
import { SITE } from '../content/site';
import { useLocale } from '../i18n/useLocale';
import { isSmallScreen, isWebGLAvailable } from '../lib/webgl';

const PhysicsCanvas = lazy(() => import('../components/PhysicsScene'));

const BLOCK_LABELS: Record<string, string> = {
  'mother-school': 'MOTHER SCHOOL',
  'loan-management': 'LOAN MANAGEMENT',
  'failfirst-engine': 'FAILFIRST ENGINE',
};

const BLOCK_COLORS = ['#7d9a6b', '#b5764f', '#8a5a6b'];

export function ExperimentsPage() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const seo = t('seo.experiments', { returnObjects: true }) as {
    title: string;
    description: string;
  };

  const [physicsOpen, setPhysicsOpen] = useState(false);
  const [webgl] = useState(() => isWebGLAvailable());
  const [compact] = useState(() => isSmallScreen());

  const physicsBlocks: PhysicsBlock[] = FEATURED_CASE_STUDIES.slice(0, 3).map(
    (project, index) => ({
      title: BLOCK_LABELS[project.slug] ?? project.slug.toUpperCase(),
      color: BLOCK_COLORS[index] ?? '#8a5a6b',
      link:
        project.live ??
        project.code ??
        `${SITE.url}${lp(`/projects/${project.slug}`)}`,
    }),
  );

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/experiments" />

      <PageHero
        eyebrow={t('experiments.eyebrow')}
        title={t('experiments.title')}
        lede={t('experiments.lede')}
        meta={<span>{t('experiments.statusExperimental')}</span>}
        className="page-hero--violet"
      />

      <section className="section">
        <div className="container">
          <p className="journey-note" style={{ marginBottom: 'var(--space-8)' }}>
            {t('experiments.note')}
          </p>

          <div className="experiment-list">
            <article className="experiment experiment--feature">
              <div className="experiment__head">
                <span className="experiment__index">01</span>
                <div>
                  <h2 className="experiment__title">{t('experiments.physicsTitle')}</h2>
                  <p className="experiment__body">{t('experiments.physicsBody')}</p>
                  <div className="experiment__badges">
                    <span className="tag">{t('experiments.statusExperimental')}</span>
                  </div>
                </div>
                <div className="experiment__actions">
                  <button
                    type="button"
                    className="button button--small"
                    aria-expanded={physicsOpen}
                    aria-controls={physicsOpen ? 'physics-stage' : undefined}
                    onClick={() => setPhysicsOpen((open) => !open)}
                  >
                    {physicsOpen ? t('experiments.closePhysics') : t('experiments.launchPhysics')}
                  </button>
                </div>
              </div>

              {physicsOpen ? (
                <div className="experiment__stage" id="physics-stage">
                  <div className="experiment__stage-bar">
                    <p>{t('experiments.physicsTitle')}</p>
                    <button
                      type="button"
                      className="stage-close"
                      onClick={() => setPhysicsOpen(false)}
                    >
                      {t('experiments.closePhysics')}
                    </button>
                  </div>

                  {!webgl ? (
                    <p className="experiment__fallback">{t('experiments.physicsNoWebgl')}</p>
                  ) : compact ? (
                    <p className="experiment__fallback">{t('experiments.physicsMobile')}</p>
                  ) : (
                    <div className="physics-frame">
                      <Suspense
                        fallback={<p className="experiment__fallback">{t('common.loading')}…</p>}
                      >
                        <PhysicsCanvas
                          blocks={physicsBlocks}
                          active={physicsOpen}
                          onReady={() => undefined}
                        />
                      </Suspense>
                    </div>
                  )}

                  <p className="experiment__hint">{t('experiments.physicsHint')}</p>
                </div>
              ) : null}
            </article>

            <article className="experiment">
              <div className="experiment__head">
                <span className="experiment__index">02</span>
                <div>
                  <h2 className="experiment__title">{t('experiments.terminalTitle')}</h2>
                  <p className="experiment__body">{t('experiments.terminalBody')}</p>
                  <div className="experiment__badges">
                    <span className="tag">{t('experiments.statusOngoing')}</span>
                  </div>
                </div>
                <div className="experiment__actions">
                  <span className="mono">{t('experiments.terminalLabel')}</span>
                </div>
              </div>
              <div className="experiment__stage">
                <Terminal />
              </div>
            </article>

            <article className="experiment">
              <div className="experiment__head">
                <span className="experiment__index">03</span>
                <div>
                  <h2 className="experiment__title">{t('experiments.gestureTitle')}</h2>
                  <p className="experiment__body">{t('experiments.gestureBody')}</p>
                  <div className="experiment__badges">
                    <span className="tag">{t('experiments.statusExperimental')}</span>
                  </div>
                </div>
                <div className="experiment__actions">
                  <a
                    className="button button--small"
                    href="https://aayusxat7.github.io/Gesture-Solar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('experiments.gestureCta')}
                    <ArrowUpRight />
                    <span className="sr-only"> ({t('common.external')})</span>
                  </a>
                </div>
              </div>
              <div className="experiment__stage">
                <video
                  controls
                  muted
                  preload="none"
                  playsInline
                  poster="/media/gesture-solar-poster.jpg"
                  aria-label={t('experiments.gestureTitle')}
                >
                  <source src="/media/gesture-solar-demo.mp4" type="video/mp4" />
                </video>
                <p className="experiment__media-note">{t('experiments.gestureMediaNote')}</p>
              </div>
            </article>

            <article className="experiment">
              <div className="experiment__head">
                <span className="experiment__index">04</span>
                <div>
                  <h2 className="experiment__title">{t('experiments.aiTitle')}</h2>
                  <p className="experiment__body">{t('experiments.aiBody')}</p>
                  <div className="experiment__badges">
                    <span className="tag">{t('experiments.statusOngoing')}</span>
                  </div>
                </div>
                <div className="experiment__actions">
                  <a
                    className="button button--small button--ghost"
                    href="https://github.com/AayusX/AayushAI-Core"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('experiments.aiCta')}
                    <ArrowUpRight />
                    <span className="sr-only"> ({t('common.external')})</span>
                  </a>
                </div>
              </div>
              <div className="experiment__stage experiment__stage--core" aria-hidden="true">
                <div className="core-map">
                  <span className="core-map__hub">AayushAI</span>
                  <span className="core-map__node core-map__node--nw">memory</span>
                  <span className="core-map__node core-map__node--ne">journaling</span>
                  <span className="core-map__node core-map__node--sw">reminders</span>
                  <span className="core-map__node core-map__node--se">tool calling</span>
                </div>
              </div>
            </article>

            <article className="experiment">
              <div className="experiment__head">
                <span className="experiment__index">05</span>
                <div>
                  <h2 className="experiment__title">{t('experiments.memoryGameTitle')}</h2>
                  <p className="experiment__body">{t('experiments.memoryGameBody')}</p>
                  <div className="experiment__badges">
                    <span className="tag">{t('experiments.statusExperimental')}</span>
                  </div>
                </div>
              </div>
              <div className="experiment__stage">
                <video
                  controls
                  muted
                  preload="none"
                  playsInline
                  poster="/media/memory-game-poster.jpg"
                  aria-label={t('experiments.memoryGameTitle')}
                >
                  <source src="/media/memory-game-demo.mp4" type="video/mp4" />
                </video>
                <p className="experiment__media-note">{t('experiments.memoryGameNote')}</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
