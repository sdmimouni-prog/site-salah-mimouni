'use client';

import type { ComponentProps } from 'react';
import { localizedHref } from '@/lib/i18n';
import { useLocale } from './LocaleProvider';

export function LocalizedLink({ href, ...props }: ComponentProps<'a'>) {
  const locale = useLocale();
  return <a {...props} href={href ? localizedHref(href, locale) : href}/>;
}
