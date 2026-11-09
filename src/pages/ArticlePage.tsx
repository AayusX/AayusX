import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Seo } from '../components/Seo';
import { ArticleRow } from '../components/ArticleRow';
import { SectionHead } from '../components/SectionHead';
import { ArrowLeft } from '../components/Icons';
import {
  ARTICLE_SLUGS,
  getArticleBody,
  isArticleSlug,
  type ArticleMeta,
} from '../content/articles';
import { articleSchema } from '../content/schema';
import { SITE } from '../content/site';
import { useLocale } from '../i18n/useLocale';
import { formatDate } from '../lib/format';
import { NotFoundPage } from './NotFoundPage';

export function ArticlePage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { language, lp } = useLocale();

  if (!isArticleSlug(slug)) return <NotFoundPage />;

  const copy = t(`articles.${slug}`, { returnObjects: true }) as unknown as ArticleMeta;
  const body = getArticleBody(slug, language);
  const related = ARTICLE_SLUGS.filter((item) => item !== slug);

  return (
    <>
      <Seo
        title={`${copy.title} — ${SITE.name}`}
        description={copy.description}
        path={`/writing/${slug}`}
        type="article"
        publishedTime={copy.date}
        jsonLd={articleSchema({
          title: copy.title,
          description: copy.description,
          url: `${SITE.url}${lp(`/writing/${slug}`)}`,
          language,
          date: copy.date,
        })}
      />

      <article>
        <header className="article-head">
          <div className="container container--text">
            <Link className="back-link" to={lp('/writing')}>
              <ArrowLeft />
              {t('writing.backToWriting')}
            </Link>
            <p className="eyebrow" style={{ marginTop: 'var(--space-5)' }}>
              {copy.category}
            </p>
            <h1 className="article-title">{copy.title}</h1>
            <p className="article-desc">{copy.description}</p>
            <div className="article-head__meta">
              <span>{formatDate(copy.date, language)}</span>
              <span>{t('common.minRead', { count: copy.readingTime })}</span>
            </div>
          </div>
        </header>

        <div className="article-body">
          <div className="container container--text">
            <div className="prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            </div>
            <div className="article-foot" style={{ marginTop: 'var(--space-12)' }}>
              <Link className="back-link" to={lp('/writing')}>
                <ArrowLeft />
                {t('writing.backToWriting')}
              </Link>
              <p className="article-note">{t('writing.articleNote')}</p>
            </div>
          </div>
        </div>
      </article>

      <section className="section section--paper">
        <div className="container">
          <SectionHead label={t('writing.relatedLabel')} title={t('writing.title')} />
          <div className="article-list">
            {related.map((item) => (
              <ArticleRow key={item} slug={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
