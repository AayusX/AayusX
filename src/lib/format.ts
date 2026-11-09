import type { Language } from '../i18n';

export function formatDate(isoDate: string, language: Language): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat(language === 'ne' ? 'ne-NP' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function padNumber(value: number, length = 2): string {
  return String(value).padStart(length, '0');
}
