import type { Metadata } from 'next';
import { findRoute, type Locale, type SiteRoute } from './i18n';
import { englishHomeSeo, siteName } from './seo';

/** Reciprocal language URLs for completed translations, preserving page-specific media. */
export function pageMetadata(metadata: Metadata, path: string, locale: Locale): Metadata {
  const route = findRoute(path);
  if (!route) return metadata;
  return {
    ...metadata,
    alternates: { canonical: route[locale], languages: { fr: route.fr, en: route.en, 'x-default': route.fr } },
    openGraph: {
      type: 'website', siteName, title: metadata.title || undefined, description: metadata.description || undefined,
      ...metadata.openGraph, url: route[locale], locale: locale === 'en' ? 'en_GB' : 'fr_MA', alternateLocale: locale === 'en' ? 'fr_MA' : 'en_GB',
    },
  };
}

const descriptions: Record<string, string> = {
  about: 'Discover the journey and expertise of Salah-Eddine MIMOUNI, a Morocco-based entrepreneur, author and speaker working across digital marketing and AI.',
  articles: 'Explore insights on digital strategy, AI, marketing and growth by Salah-Eddine MIMOUNI. English summaries with links to the original French articles on Richmedia.',
  podcasts: 'Conversations, interviews and talks with Salah-Eddine MIMOUNI on entrepreneurship, AI and marketing. English summaries with the original French and Arabic recordings.',
  books: 'Discover L’ancien pauvre — Entre deux vols, Quand les marques pensent and Pour un like de plus… by Salah-Eddine MIMOUNI. Books available in French only.',
  events: 'Meet Salah-Eddine MIMOUNI at The Bridge — Networking Day, on 17 October 2026 at Le Carré d’Or in Casablanca. Event details and the official website.',
  contact: 'Contact Salah-Eddine MIMOUNI about a conference, podcast, interview, literary event or collaboration. Start a conversation about your project.',
  'ancien-pauvre': 'Discover L’ancien pauvre — Entre deux vols, the autobiographical book by Salah-Eddine MIMOUNI. Read translated excerpts and request the French edition.',
  'entre-deux-vols': 'Explore Entre deux vols, also presented as L’ancien pauvre, by Salah-Eddine MIMOUNI. A personal journey and reflections on success. Available in French only.',
  marques: 'Discover Quand les marques pensent by Salah-Eddine MIMOUNI: how AI is reshaping marketing and influence. Explore the book and request the French edition.',
  like: 'Discover Pour un like de plus… by Salah-Eddine MIMOUNI, a look at the social cost of influence and the pursuit of popularity. Available in French only.',
};

const englishTitles: Partial<Record<SiteRoute['id'], string>> = {
  about: 'About the Author',
  articles: 'Articles & Insights',
  podcasts: 'Podcasts & Conversations',
  books: 'Books & Publications',
  events: 'Events & Speaking',
  contact: 'Contact & Collaborations',
};

export function englishPageMetadata(route: SiteRoute): Metadata {
  const pageTitle = englishTitles[route.id] || (route.section === 'books' ? `${route.label.en} (French edition)` : route.label.en);
  const title = `${pageTitle} — ${siteName}`;
  const description = descriptions[route.id] || englishHomeSeo.description;
  return pageMetadata({
    title, description,
    openGraph: { title, description, images: [{ url: englishHomeSeo.image, width: 1200, height: 630, alt: englishHomeSeo.imageAlt }] },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: englishHomeSeo.image, alt: englishHomeSeo.imageAlt }] },
  }, route.en, 'en');
}
