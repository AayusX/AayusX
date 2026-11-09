import { techIcon } from '../content/tech';
import { BrandIcon } from './Icons';

export function TechMark({ name }: { name: string }) {
  const icon = techIcon(name);
  if (!icon) {
    const initials = name
      .split(/[\s+/]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
    return (
      <span className="tech-tile__initial" aria-hidden="true">
        {initials}
      </span>
    );
  }
  return <BrandIcon icon={icon} decorative className="tech-tile__icon" />;
}
