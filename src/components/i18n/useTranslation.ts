'use client';
import { useLocale } from './LocaleProvider';
import { getTranslator, localizeContent } from '@/lib/translate';
export function useTranslation() {
  const locale = useLocale();
  return { locale, t: getTranslator(locale), localize: <T,>(value: T) => localizeContent(value, locale) };
}
