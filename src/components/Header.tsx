'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Brand } from './primitives';
import { navigationCopy, navigationRoutes } from '@/lib/i18n';
import { useLocale } from './i18n/LocaleProvider';
import { LanguageSwitcher } from './i18n/LanguageSwitcher';
import { LocalizedLink } from './i18n/LocalizedLink';
export function Header({ active = 'home', contactHref = '/contact' }: { active?: string; contactHref?: string }) {
  const locale = useLocale();
  const copy = navigationCopy[locale];
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if(event.key === 'Escape' && open) { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  return <header className="site-header"><div className="header-inner"><Brand locale={locale}/><button ref={trigger} type="button" className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)} aria-label={open ? copy.close : copy.open}>{open ? <X/> : <Menu/>}</button><nav id="main-navigation" className={open ? 'main-nav open' : 'main-nav'} aria-label={copy.primary}>{navigationRoutes.map(route => <a key={route.id} href={route[locale]} className={route.section === active ? 'current' : undefined} aria-current={route.section === active ? 'page' : undefined} onClick={() => setOpen(false)}>{route.label[locale]}</a>)}<LanguageSwitcher onSwitch={() => setOpen(false)}/></nav><LocalizedLink href={contactHref} className="button header-cta">{copy.invite}<ArrowRight size={16}/></LocalizedLink></div></header>;
}
