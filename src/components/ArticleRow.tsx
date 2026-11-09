import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { ArticleMeta, ArticleSlug } from '../content/articles';
import { useLocale } from '../i18n/useLocale';
import { formatDate } from '../lib/format';
import { ArrowUpRight } from './Icons';

export function ArticleRow({ slug }: { slug: ArticleSlug }) {
  const { t } = useTranslation();
  const { language, lp } = useLocale();
  const meta = t(`articles.${slug}`, { returnObjects: true }) as unknown as ArticleMeta;

  return (
    <Link className="article-row" to={lp(`/writing/${slug}`)}>
      <div className="article-row__meta">
        <span>{formatDate(meta.date, language)}</span>
        <span>{t('common.minRead', { count: meta.readingTime })}</span>
      </div>
      <div>
        <h3 className="article-row__title">{meta.title}</h3>
        <p className="article-row__desc">{meta.description}</p>
      </div>
      <span className="article-row__arrow" aria-hidden="true">
        <ArrowUpRight />
      </span>
    </Link>
  );
}
