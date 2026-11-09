import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { ArrowUpRight } from '../components/Icons';
import { stripLanguagePrefix } from '../i18n';
import { useLocale } from '../i18n/useLocale';

export function NotFoundPage() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const location = useLocation();
  const seo = t('seo.notFound', { returnObjects: true }) as { title: string; description: string };
  const path = stripLanguagePrefix(location.pathname) || '/';

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path={path}
        noIndex
      />
      <section className="container error-page">
        <p className="eyebrow">{t('notFound.eyebrow')}</p>
        <h1>{t('notFound.title')}</h1>
        <p>{t('notFound.body')}</p>
        <Link className="button" to={lp('/')}>
          {t('notFound.cta')}
          <ArrowUpRight />
        </Link>
      </section>
    </>
  );
}
