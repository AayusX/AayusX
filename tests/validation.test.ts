import { describe, expect, it } from 'vitest';
import {
  CONTACT_LIMITS,
  EMPTY_CONTACT,
  isValidEmail,
  normalizeContact,
  validateContact,
  type ContactValidationMessages,
} from '../src/lib/validation';

const messages: ContactValidationMessages = {
  nameRequired: 'name required',
  nameLong: 'name long',
  emailRequired: 'email required',
  emailInvalid: 'email invalid',
  subjectRequired: 'subject required',
  subjectLong: 'subject long',
  messageRequired: 'message required',
  messageShort: 'message short',
  messageLong: 'message long',
};

function values(overrides: Partial<typeof EMPTY_CONTACT> = {}) {
  return {
    ...EMPTY_CONTACT,
    name: 'Aayush Bhandari',
    email: 'hello@example.com',
    subject: 'A school platform',
    message: 'We need a system that handles admissions and report cards.',
    ...overrides,
  };
}

describe('validateContact', () => {
  it('accepts a complete, valid message', () => {
    expect(validateContact(values(), messages)).toEqual({});
  });

  it('reports every missing required field', () => {
    const errors = validateContact(EMPTY_CONTACT, messages);
    expect(errors.name).toBe('name required');
    expect(errors.email).toBe('email required');
    expect(errors.subject).toBe('subject required');
    expect(errors.message).toBe('message required');
  });

  it('rejects malformed email addresses', () => {
    const errors = validateContact(values({ email: 'not-an-email' }), messages);
    expect(errors.email).toBe('email invalid');
  });

  it('rejects long names and subjects', () => {
    const errors = validateContact(
      values({
        name: 'a'.repeat(CONTACT_LIMITS.name + 1),
        subject: 's'.repeat(CONTACT_LIMITS.subject + 1),
      }),
      messages,
    );
    expect(errors.name).toBe('name long');
    expect(errors.subject).toBe('subject long');
  });

  it('requires a minimum message length and enforces the maximum', () => {
    expect(validateContact(values({ message: 'too short' }), messages).message).toBe(
      'message short',
    );
    expect(
      validateContact(values({ message: 'm'.repeat(CONTACT_LIMITS.messageMax + 1) }), messages)
        .message,
    ).toBe('message long');
  });

  it('trims whitespace before validating', () => {
    const normalized = normalizeContact({
      ...values(),
      name: '  Aayush  ',
      email: '  hello@example.com  ',
      website: ' ',
    });
    expect(normalized.name).toBe('Aayush');
    expect(normalized.email).toBe('hello@example.com');
    expect(normalized.website).toBe('');
  });
});

describe('isValidEmail', () => {
  it.each(['a@b.co', 'first.last+tag@example.org'])('accepts %s', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  it.each(['plainaddress', 'a@b', 'a b@example.com', 'a@example.c'])(
    'rejects %s',
    (email) => {
      expect(isValidEmail(email)).toBe(false);
    },
  );
});
