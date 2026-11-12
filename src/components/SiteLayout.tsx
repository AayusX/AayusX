import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { Footer } from './Footer';
import { ReleaseBar } from './ReleaseBar';
import { PageTransition } from './PageTransition';
import { SmoothScroll } from './SmoothScroll';
import { ScrollManager } from './ScrollManager';

export function SiteLayout() {
  const { t } = useTranslation();

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t('common.skipToContent')}
      </a>
      <SmoothScroll />
      <ScrollManager />
      <div className="site">
        <ReleaseBar />
        <Header />
        <main id="main-content" tabIndex={-1}>
          <PageTransition />
        </main>
        <Footer />
      </div>
    </>
  );
}
