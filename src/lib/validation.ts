export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 160,
  messageMin: 20,
  messageMax: 4000,
} as const;

export type ContactField = 'name' | 'email' | 'subject' | 'message';

export interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
}

export type ContactErrors = Partial<Record<ContactField, string>>;

export interface ContactValidationMessages {
  nameRequired: string;
  nameLong: string;
  emailRequired: string;
  emailInvalid: string;
  subjectRequired: string;
  subjectLong: string;
  messageRequired: string;
  messageShort: string;
  messageLong: string;
}

export const EMPTY_CONTACT: ContactValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
};

export function normalizeContact(values: ContactValues): ContactValues {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
    website: values.website.trim(),
  };
}

export function isValidEmail(value: string): boolean {
  if (value.length > CONTACT_LIMITS.email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export function validateContact(
  values: ContactValues,
  messages: ContactValidationMessages,
): ContactErrors {
  const data = normalizeContact(values);
  const errors: ContactErrors = {};

  if (!data.name) {
    errors.name = messages.nameRequired;
  } else if (data.name.length > CONTACT_LIMITS.name) {
    errors.name = messages.nameLong;
  }

  if (!data.email) {
    errors.email = messages.emailRequired;
  } else if (!isValidEmail(data.email)) {
    errors.email = messages.emailInvalid;
  }

  if (!data.subject) {
    errors.subject = messages.subjectRequired;
  } else if (data.subject.length > CONTACT_LIMITS.subject) {
    errors.subject = messages.subjectLong;
  }

  if (!data.message) {
    errors.message = messages.messageRequired;
  } else if (data.message.length < CONTACT_LIMITS.messageMin) {
    errors.message = messages.messageShort;
  } else if (data.message.length > CONTACT_LIMITS.messageMax) {
    errors.message = messages.messageLong;
  }

  return errors;
}
