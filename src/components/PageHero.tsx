import type { ReactNode } from 'react';

export function PageHero({
  eyebrow,
  title,
  lede,
  meta,
  className = '',
}: {
  eyebrow: string;
  title: string;
  lede: string;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`page-hero${className ? ` ${className}` : ''}`}>
      <div className="container page-hero__grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-title">{title}</h1>
          {meta ? <div className="page-meta">{meta}</div> : null}
        </div>
        <p className="page-lede">{lede}</p>
      </div>
    </header>
  );
}
