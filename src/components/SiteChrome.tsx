'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

function activeSection(pathname: string) {
  if (pathname === '/') return 'Accueil';
  if (pathname === '/a-propos') return 'À propos';
  if (pathname.startsWith('/articles')) return 'Articles';
  if (pathname === '/livres' || pathname.startsWith('/livres/')) return 'Livres';
  if (pathname.startsWith('/podcasts')) return 'Podcasts';
  if (pathname.startsWith('/evenements')) return 'Événements';
  if (pathname.startsWith('/contact')) return 'Contact';
  return '';
}

export function SiteHeader() {
  const pathname = usePathname();
  return <Header active={activeSection(pathname)} contactHref="/contact"/>;
}

export function SiteFooter() {
  return <Footer active={activeSection(usePathname())}/>;
}
