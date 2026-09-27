'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { findRoute } from '@/lib/i18n';
import { useLocale } from './i18n/LocaleProvider';

function activeSection(pathname: string) {
  return findRoute(pathname)?.section || '';
}

export function SiteHeader() {
  const pathname = usePathname();
  return <Header active={activeSection(pathname)} contactHref="/contact"/>;
}

export function SiteFooter() {
  return <Footer active={activeSection(usePathname())} locale={useLocale()}/>;
}
