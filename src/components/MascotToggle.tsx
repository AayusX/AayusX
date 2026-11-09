import { useTranslation } from 'react-i18next';
import { useMascot } from '../features/mascot/MascotContext';

export function MascotToggle() {
  const { t } = useTranslation();
  const { enabled, toggle } = useMascot();

  return (
    <button type="button" className="text-button" aria-pressed={enabled} onClick={toggle}>
      {enabled ? t('footer.mascotOn') : t('footer.mascotOff')}
    </button>
  );
}
