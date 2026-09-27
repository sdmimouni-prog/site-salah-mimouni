export type Locale = 'fr' | 'en';

// Page identity is independent of its translated URL and label.
export const siteRoutes = [
  { id: 'home', fr: '/', en: '/en', label: { fr: 'Accueil', en: 'Home' }, section: 'home', navigation: true },
  { id: 'about', fr: '/a-propos', en: '/en/about', label: { fr: 'À propos', en: 'About' }, section: 'about', navigation: true },
  { id: 'articles', fr: '/articles', en: '/en/articles', label: { fr: 'Articles', en: 'Articles' }, section: 'articles', navigation: true },
  { id: 'podcasts', fr: '/podcasts', en: '/en/podcasts', label: { fr: 'Podcasts', en: 'Podcasts' }, section: 'podcasts', navigation: true },
  { id: 'books', fr: '/livres', en: '/en/books', label: { fr: 'Livres', en: 'Books' }, section: 'books', navigation: true },
  { id: 'events', fr: '/evenements', en: '/en/events', label: { fr: 'Événements', en: 'Events' }, section: 'events', navigation: true },
  { id: 'contact', fr: '/contact', en: '/en/contact', label: { fr: 'Contact', en: 'Contact' }, section: 'contact', navigation: true },
  { id: 'ancien-pauvre', fr: '/livres/lancien-pauvre', en: '/en/books/lancien-pauvre', label: { fr: 'L’ancien pauvre', en: 'L’ancien pauvre' }, section: 'books', navigation: false },
  { id: 'entre-deux-vols', fr: '/livres/entre-deux-vols', en: '/en/books/entre-deux-vols', label: { fr: 'Entre deux vols', en: 'Entre deux vols' }, section: 'books', navigation: false },
  { id: 'marques', fr: '/livres/quand-les-marques-pensent', en: '/en/books/quand-les-marques-pensent', label: { fr: 'Quand les marques pensent', en: 'Quand les marques pensent' }, section: 'books', navigation: false },
  { id: 'like', fr: '/livres/pour-un-like-de-plus', en: '/en/books/pour-un-like-de-plus', label: { fr: 'Pour un like de plus…', en: 'Pour un like de plus…' }, section: 'books', navigation: false },
] as const;

export type SiteRoute = typeof siteRoutes[number];
export const navigationRoutes = siteRoutes.filter(route => route.navigation);

export function findRoute(pathname: string): SiteRoute | undefined {
  const path = pathname.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/';
  return siteRoutes.find(route => route.fr === path || route.en === path);
}

// Only known site pages are translated. Assets, APIs, external URLs and
// on-page anchors retain their exact destination and query string.
export function localizedHref(href: string, locale: Locale): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const path = href.split(/[?#]/, 1)[0];
  const route = findRoute(path);
  return route ? route[locale] + href.slice(path.length) : href;
}

export const navigationCopy = {
  fr: {
    brand: 'Entrepreneur • Auteur • Conférencier',
    home: 'accueil', open: 'Ouvrir le menu', close: 'Fermer le menu',
    primary: 'Navigation principale', footer: 'Navigation de pied de page',
    invite: 'Invitez-moi', skip: 'Aller au contenu', rights: 'Tous droits réservés.',
    language: 'Langue du site', french: 'Passer en français', english: 'Switch to English',
  },
  en: {
    brand: 'Entrepreneur • Author • Speaker',
    home: 'home', open: 'Open menu', close: 'Close menu',
    primary: 'Main navigation', footer: 'Footer navigation',
    invite: 'Invite me', skip: 'Skip to content', rights: 'All rights reserved.',
    language: 'Site language', french: 'Passer en français', english: 'Switch to English',
  },
} as const;
