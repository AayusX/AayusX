import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export function SectionHead({
  label,
  title,
  lede,
  link,
  aside,
}: {
  label: string;
  title: string;
  lede?: string;
  link?: { to: string; label: string };
  aside?: ReactNode;
}) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow">{label}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      <div>
        {lede ? <p className="section-lede">{lede}</p> : null}
        {link ? (
          <Link className="section-link" to={link.to}>
            {link.label}
          </Link>
        ) : null}
        {aside}
      </div>
    </div>
  );
}
