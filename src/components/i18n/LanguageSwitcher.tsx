'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { findRoute, navigationCopy, type Locale } from '@/lib/i18n';
import { useLocale } from './LocaleProvider';

export function LanguageSwitcher({ onSwitch }: { onSwitch?: () => void }) {
  const locale = useLocale();
  const pathname = usePathname();
  const route = findRoute(pathname);
  const [suffix, setSuffix] = useState('');
  useEffect(() => {
    const sync = () => setSuffix(window.location.search + window.location.hash);
    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => { window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync); };
  }, [pathname]);
  if (!route) return null;
  const copy = navigationCopy[locale];
  return <div className="language-switcher" role="group" aria-label={copy.language}>
    {(['fr', 'en'] as const).map((language: Locale) => <a
      key={language} href={route[language] + suffix} hrefLang={language} lang={language}
      aria-label={language === 'fr' ? copy.french : copy.english}
      aria-current={language === locale ? 'true' : undefined}
      onClick={onSwitch}
    >{language.toUpperCase()}</a>)}
  </div>;
}
