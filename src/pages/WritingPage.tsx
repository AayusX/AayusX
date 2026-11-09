import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { ARTICLE_SLUGS, FEATURED_ARTICLE, type ArticleMeta } from '../content/articles';
import { useLocale } from '../i18n/useLocale';
import { formatDate } from '../lib/format';

export function WritingPage() {
  const { t } = useTranslation();
  const { language, lp } = useLocale();
  const seo = t('seo.writing', { returnObjects: true }) as { title: string; description: string };
  const featured = t(`articles.${FEATURED_ARTICLE}`, {
    returnObjects: true,
  }) as unknown as ArticleMeta;
  const others = ARTICLE_SLUGS.filter((slug) => slug !== FEATURED_ARTICLE);

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/writing" />
      <PageHero eyebrow={t('writing.eyebrow')} title={t('writing.title')} lede={t('writing.lede')} />

      <section className="section">
        <div className="container">
          <div className="writing-feature">
            <Link
              className="writing-feature__main"
              to={lp(`/writing/${FEATURED_ARTICLE}`)}
            >
              <p className="writing-feature__label">{t('writing.featuredLabel')}</p>
              <h2 className="writing-feature__title">{featured.title}</h2>
              <p className="writing-feature__desc">{featured.description}</p>
              <div className="writing-feature__meta">
                <span>{formatDate(featured.date, language)}</span>
                <span>{featured.category}</span>
                <span>{t('common.minRead', { count: featured.readingTime })}</span>
              </div>
            </Link>

            <div className="writing-feature__aside">
              <h2>{t('writing.archiveLabel')}</h2>
              {others.map((slug) => {
                const meta = t(`articles.${slug}`, {
                  returnObjects: true,
                }) as unknown as ArticleMeta;
                return (
                  <Link key={slug} to={lp(`/writing/${slug}`)}>
                    <strong>{meta.title}</strong>
                    <span>
                      {formatDate(meta.date, language)} · {meta.category}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          <p className="archive-note writing-note">{t('writing.articleNote')}</p>
        </div>
      </section>
    </>
  );
}
