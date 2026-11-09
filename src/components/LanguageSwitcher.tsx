import { useTranslation } from 'react-i18next';
import { useLocale } from '../i18n/useLocale';

export function LanguageSwitcher({ variant = 'header' }: { variant?: 'header' | 'menu' }) {
  const { t } = useTranslation();
  const { language, switchLanguage } = useLocale();

  return (
    <div
      className={variant === 'menu' ? 'lang-switch lang-switch--menu' : 'lang-switch'}
      role="group"
      aria-label={t('common.language')}
    >
      <button
        type="button"
        lang="en"
        aria-pressed={language === 'en'}
        aria-label={t('common.switchToEnglish')}
        onClick={() => switchLanguage('en')}
      >
        EN
      </button>
      <button
        type="button"
        lang="ne"
        aria-pressed={language === 'ne'}
        aria-label={t('common.switchToNepali')}
        onClick={() => switchLanguage('ne')}
      >
        ने
      </button>
    </div>
  );
}
