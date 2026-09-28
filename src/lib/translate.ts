import english from '../content/translations/en.json';
import type { Locale } from './i18n';

const dictionary: Record<string, string> = english;
export type Translator = (text: string | TemplateStringsArray, ...values: unknown[]) => string;
const translators: Record<Locale, Translator> = {
  fr: (text, ...values) => typeof text === 'string' ? text : text.reduce((result, part, index) => result + part + (index < values.length ? String(values[index]) : ''), ''),
  en: (text, ...values) => {
    const key = typeof text === 'string' ? text : text.reduce((result, part, index) => result + part + (index < values.length ? `{${index}}` : ''), '');
    const normalized = key.replace(/\s+/g, ' ').trim();
    const translated = dictionary[normalized] === undefined ? key : (key.match(/^\s*/)?.[0] || '') + dictionary[normalized] + (key.match(/\s*$/)?.[0] || '');
    return values.length ? translated.replace(/\{(\d+)\}/g, (_, index) => String(values[Number(index)])) : translated;
  },
};
export const getTranslator = (locale: Locale): Translator => translators[locale];

// Localize presentation data without changing source records, identifiers, URLs,
// form values, or original titles used to identify the published work.
const protectedKeys = new Set(['id', 'slug', 'value', 'url', 'href', 'sourceUrl', 'originalTitle', 'originalExcerpt', 'image', 'cover', 'portrait', 'thumbnail', 'videoId', 'channelUrl', 'date', 'publishedAt', 'requestId']);
const translatedData = new WeakMap<object, unknown>();
export function localizeContent<T>(value: T, locale: Locale): T {
  if (locale === 'fr') return value;
  if (typeof value === 'string') return getTranslator(locale)(value) as T;
  if (value === null || typeof value !== 'object') return value;
  if (translatedData.has(value)) return translatedData.get(value) as T;
  const translated = Array.isArray(value)
    ? value.map(item => localizeContent(item, locale))
    : Object.fromEntries(Object.entries(value).map(([key, item]) => [key, protectedKeys.has(key) ? item : localizeContent(item, locale)]));
  translatedData.set(value, translated);
  return translated as T;
}
