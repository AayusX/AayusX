import { describe, expect, it } from 'vitest';
import { en } from '../src/i18n/en';
import { ne } from '../src/i18n/ne';
import { languageFromPath, localePath, stripLanguagePrefix } from '../src/i18n';

function flatten(value: unknown, prefix = ''): Map<string, string> {
  const result = new Map<string, string>();

  if (Array.isArray(value)) {
    result.set(`${prefix}.length`, String(value.length));
    value.forEach((item, index) => {
      flatten(item, `${prefix}[${index}]`).forEach((entry, key) => result.set(key, entry));
    });
    return result;
  }

  if (value && typeof value === 'object') {
    Object.entries(value as Record<string, unknown>).forEach(([key, child]) => {
      flatten(child, prefix ? `${prefix}.${key}` : key).forEach((entry, childKey) =>
        result.set(childKey, entry),
      );
    });
    return result;
  }

  result.set(prefix, String(value));
  return result;
}

describe('translation parity', () => {
  it('has exactly the same keys and array lengths in English and Nepali', () => {
    const english = flatten(en);
    const nepali = flatten(ne);

    const missingInNepali = [...english.keys()].filter((key) => !nepali.has(key));
    const extraInNepali = [...nepali.keys()].filter((key) => !english.has(key));

    expect(missingInNepali).toEqual([]);
    expect(extraInNepali).toEqual([]);
  });

  it('does not ship empty interface strings', () => {
    const empty = [...flatten(en).entries()].filter(
      ([key, value]) =>
        !key.endsWith('.length') && !key.endsWith('.proofSlug') && value.trim() === '',
    );
    expect(empty).toEqual([]);
  });
});

describe('language paths', () => {
  it('detects Nepali only on the /ne prefix', () => {
    expect(languageFromPath('/')).toBe('en');
    expect(languageFromPath('/ne')).toBe('ne');
    expect(languageFromPath('/ne/about')).toBe('ne');
    expect(languageFromPath('/nepal')).toBe('en');
  });

  it('strips the Nepali prefix to a canonical path', () => {
    expect(stripLanguagePrefix('/ne')).toBe('/');
    expect(stripLanguagePrefix('/ne/about')).toBe('/about');
    expect(stripLanguagePrefix('/about')).toBe('/about');
  });

  it('builds localized paths', () => {
    expect(localePath('/', 'en')).toBe('/');
    expect(localePath('/', 'ne')).toBe('/ne');
    expect(localePath('/projects', 'en')).toBe('/projects');
    expect(localePath('/projects', 'ne')).toBe('/ne/projects');
  });
});
