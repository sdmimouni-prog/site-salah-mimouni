'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { home } from '@/content/home';
import { Brand } from './primitives';
export function Header({ active = 'Accueil', contactHref = '#contact' }: { active?: string; contactHref?: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if(event.key === 'Escape' && open) { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  return <header className="site-header"><div className="header-inner"><Brand/><button ref={trigger} type="button" className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}>{open ? <X/> : <Menu/>}</button><nav id="main-navigation" className={open ? 'main-nav open' : 'main-nav'} aria-label="Navigation principale">{home.nav.map(([label, href]) => <a key={label} href={href} className={label === active ? 'current' : undefined} aria-current={label === active ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>)}</nav><a href={contactHref} className="button header-cta">Invitez-moi<ArrowRight size={16}/></a></div></header>;
}
