import { useTranslation } from 'react-i18next';
import type { ProjectStatus } from '../content/projects';

export function StatusBadge({
  status,
  className = '',
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const { t } = useTranslation();
  return (
    <span className={`status status--${status} ${className}`.trim()}>
      {t(`common.statuses.${status}`)}
    </span>
  );
}
