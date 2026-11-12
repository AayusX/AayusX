import { lazy, Suspense, type ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SiteLayout } from '../components/SiteLayout';
import { HomePage } from '../pages/HomePage';

const AboutPage = lazy(() =>
  import('../pages/AboutPage').then((module) => ({ default: module.AboutPage })),
);
const ArticlePage = lazy(() =>
  import('../pages/ArticlePage').then((module) => ({ default: module.ArticlePage })),
);
const CapabilitiesPage = lazy(() =>
  import('../pages/CapabilitiesPage').then((module) => ({ default: module.CapabilitiesPage })),
);
const CaseStudyPage = lazy(() =>
  import('../pages/CaseStudyPage').then((module) => ({ default: module.CaseStudyPage })),
);
const ContactPage = lazy(() =>
  import('../pages/ContactPage').then((module) => ({ default: module.ContactPage })),
);
const ExperimentsPage = lazy(() =>
  import('../pages/ExperimentsPage').then((module) => ({ default: module.ExperimentsPage })),
);
const JourneyPage = lazy(() =>
  import('../pages/JourneyPage').then((module) => ({ default: module.JourneyPage })),
);
const KiteLabPage = lazy(() =>
  import('../pages/KiteLabPage').then((module) => ({ default: module.KiteLabPage })),
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);
const ProjectsPage = lazy(() =>
  import('../pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })),
);
const WritingPage = lazy(() =>
  import('../pages/WritingPage').then((module) => ({ default: module.WritingPage })),
);

function RouteFallback({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  return (
    <Suspense
      fallback={
        <div className="container" style={{ paddingBlock: 'var(--space-section)' }} role="status">
          {t('common.loading')}…
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

/**
 * The same page tree is mounted under `/` and `/ne`. Declaring both keeps the
 * real location in the router context, so `useLocale` can derive the language
 * from the actual address instead of a rewritten one.
 */
function localizedTree(prefix: '' | '/ne') {
  return (
    <Route key={prefix || 'en'} path={prefix || '/'} element={<SiteLayout />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<RouteFallback><AboutPage /></RouteFallback>} />
      <Route path="journey" element={<RouteFallback><JourneyPage /></RouteFallback>} />
      <Route path="projects" element={<RouteFallback><ProjectsPage /></RouteFallback>} />
      <Route path="projects/:slug" element={<RouteFallback><CaseStudyPage /></RouteFallback>} />
      <Route path="experiments" element={<RouteFallback><ExperimentsPage /></RouteFallback>} />
      <Route path="capabilities" element={<RouteFallback><CapabilitiesPage /></RouteFallback>} />
      <Route path="writing" element={<RouteFallback><WritingPage /></RouteFallback>} />
      <Route path="writing/:slug" element={<RouteFallback><ArticlePage /></RouteFallback>} />
      <Route path="contact" element={<RouteFallback><ContactPage /></RouteFallback>} />
      <Route path="*" element={<RouteFallback><NotFoundPage /></RouteFallback>} />
    </Route>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/kite-lab"
        element={
          <RouteFallback>
            <KiteLabPage />
          </RouteFallback>
        }
      />
      {localizedTree('')}
      {localizedTree('/ne')}
    </Routes>
  );
}
