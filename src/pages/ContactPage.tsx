import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { ArrowUpRight } from '../components/Icons';
import { SITE, mailtoHref } from '../content/site';
import { useLocale } from '../i18n/useLocale';
import {
  CONTACT_LIMITS,
  EMPTY_CONTACT,
  normalizeContact,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactValidationMessages,
  type ContactValues,
} from '../lib/validation';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormResponse {
  ok?: boolean;
}

export function ContactPage() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const seo = t('seo.contact', { returnObjects: true }) as {
    title: string;
    description: string;
  };

  const [values, setValues] = useState<ContactValues>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  const messages = useMemo<ContactValidationMessages>(
    () => ({
      nameRequired: t('contact.validation.nameRequired'),
      nameLong: t('contact.validation.nameLong'),
      emailRequired: t('contact.validation.emailRequired'),
      emailInvalid: t('contact.validation.emailInvalid'),
      subjectRequired: t('contact.validation.subjectRequired'),
      subjectLong: t('contact.validation.subjectLong'),
      messageRequired: t('contact.validation.messageRequired'),
      messageShort: t('contact.validation.messageShort'),
      messageLong: t('contact.validation.messageLong'),
    }),
    [t],
  );

  useEffect(() => {
    if (!turnstileSiteKey) return;

    const scriptId = 'cf-turnstile-script';
    const render = () => {
      const slot = document.getElementById('turnstile-slot');
      if (!slot || !window.turnstile || slot.hasChildNodes()) return;
      window.turnstile.render(slot, {
        sitekey: turnstileSiteKey,
        theme: 'light',
        callback: setTurnstileToken,
      });
    };

    const existing = document.getElementById(scriptId);
    if (existing) {
      render();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = render;
    document.head.appendChild(script);
  }, [turnstileSiteKey]);

  const update = (field: ContactField) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContact(values, messages);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0] as ContactField | undefined;
    if (firstError) {
      setStatus('idle');
      formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const payload = normalizeContact(values);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          turnstileToken,
          elapsed: Date.now() - startedAt.current,
        }),
      });

      if (!response.ok) throw new Error(`Contact request failed: ${response.status}`);

      const data = (await response.json().catch(() => ({}))) as ContactFormResponse;
      if (!data.ok) throw new Error('Contact request was rejected');

      setStatus('success');
      setValues(EMPTY_CONTACT);
      setErrors({});
      setTurnstileToken('');
    } catch {
      setStatus('error');
    }
  };

  const fallbackHref = mailtoHref(
    values.subject || t('contact.subject'),
    values.message,
  );

  const fieldError = (field: ContactField) =>
    errors[field] ? (
      <p className="field__error" id={`${field}-error`}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/contact" />

      <PageHero
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        lede={t('contact.lede')}
        meta={<span>{t('contact.availability')}</span>}
        className="page-hero--violet page-hero--contact"
      />

      <section className="container contact-layout">
        <aside className="contact-aside">
          <div className="contact-block">
            <h2>{t('contact.directLabel')}</h2>
            <a href={mailtoHref()}>{SITE.email}</a>
            <p>{t('contact.responseNote')}</p>
          </div>

          <div className="contact-block">
            <h2>{t('contact.socialLabel')}</h2>
            <div className="contact-socials">
              {SITE.socials.map((social) => (
                <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                  <ArrowUpRight
                    style={{ display: 'inline', width: '0.8rem', height: '0.8rem', marginLeft: '0.2rem' }}
                  />
                  <span className="sr-only"> ({t('common.external')})</span>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-block">
            <h2>{t('contact.locationLabel')}</h2>
            <p>{t('contact.locationValue')}</p>
          </div>
        </aside>

        <div className="contact-form-wrap">
          {status === 'success' ? (
            <div className="form-status" role="status">
              <h2>{t('contact.successTitle')}</h2>
              <p>{t('contact.successBody')}</p>
              <div className="form-status__actions">
                <button
                  type="button"
                  className="button button--small"
                  onClick={() => {
                    startedAt.current = Date.now();
                    setStatus('idle');
                  }}
                >
                  {t('contact.sendAnother')}
                </button>
                <a className="button button--small button--ghost" href={lp('/')}>
                  {t('notFound.cta')}
                </a>
              </div>
            </div>
          ) : (
            <form ref={formRef} noValidate onSubmit={handleSubmit}>
              <h2 className="form-title">{t('contact.formLabel')}</h2>
              <p className="form-hint">{t('contact.formHint')}</p>

              {status === 'error' ? (
                <div className="form-status form-status--error" role="alert" style={{ marginBottom: 'var(--space-6)' }}>
                  <h3>{t('contact.errorTitle')}</h3>
                  <p>{t('contact.errorBody')}</p>
                  <div className="form-status__actions">
                    <a className="button button--small" href={fallbackHref}>
                      {t('contact.fallbackCta')}
                      <ArrowUpRight />
                    </a>
                    <button
                      type="button"
                      className="button button--small button--ghost"
                      onClick={() => {
                        setStatus('idle');
                        formRef.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus();
                      }}
                    >
                      {t('contact.retry')}
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="honeypot" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, website: event.target.value }))
                  }
                />
              </div>

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="name">
                    {t('contact.name')} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={CONTACT_LIMITS.name}
                    value={values.name}
                    onChange={update('name')}
                    aria-required="true"
                    aria-invalid={errors.name ? 'true' : undefined}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {fieldError('name')}
                </div>

                <div className="field">
                  <label htmlFor="email">
                    {t('contact.email')} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    maxLength={CONTACT_LIMITS.email}
                    value={values.email}
                    onChange={update('email')}
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : undefined}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {fieldError('email')}
                </div>

                <div className="field field--full">
                  <label htmlFor="subject">
                    {t('contact.subject')} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    maxLength={CONTACT_LIMITS.subject}
                    value={values.subject}
                    onChange={update('subject')}
                    aria-required="true"
                    aria-invalid={errors.subject ? 'true' : undefined}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  />
                  {fieldError('subject')}
                </div>

                <div className="field field--full">
                  <label htmlFor="message">
                    {t('contact.message')} <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    maxLength={CONTACT_LIMITS.messageMax}
                    placeholder={t('contact.messagePlaceholder')}
                    value={values.message}
                    onChange={update('message')}
                    aria-required="true"
                    aria-invalid={errors.message ? 'true' : undefined}
                    aria-describedby={errors.message ? 'message-error' : 'message-count'}
                  />
                  <div className="field__foot">
                    {fieldError('message') ?? <span />}
                    <span id="message-count">
                      {values.message.length} / {CONTACT_LIMITS.messageMax}
                    </span>
                  </div>
                </div>
              </div>

              {turnstileSiteKey ? (
                <div className="turnstile-slot" id="turnstile-slot" aria-label={t('contact.captchaLabel')} />
              ) : null}

              <div className="form-actions">
                <button type="submit" className="button" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
                  {status === 'submitting' ? t('contact.submitting') : t('contact.submit')}
                  {status === 'submitting' ? null : <ArrowUpRight />}
                </button>
                <p className="form-privacy">{t('contact.privacy')}</p>
              </div>

              <p className="spam-note">
                {t('contact.spamNote')}
                {turnstileSiteKey ? ` ${t('contact.captchaNote')}` : ''}
              </p>

              <p className="sr-only" role="status" aria-live="polite">
                {status === 'submitting' ? t('contact.submitting') : ''}
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
