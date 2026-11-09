import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { Footer } from './Footer';
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
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
