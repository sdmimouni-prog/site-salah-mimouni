const productionOrigin = 'https://site-salah-mimouni.vercel.app';

// Use a public, stable origin: never derive canonical URLs from a request or preview URL.
export function resolveSiteUrl(configuredUrl?: string): URL {
  try {
    const url = new URL(configuredUrl || productionOrigin);
    if (url.protocol !== 'https:' || url.username || url.password ||
        !url.hostname.includes('.') || url.hostname.endsWith('.localhost') ||
        url.hostname.endsWith('.local') || /^[\d.]+$/.test(url.hostname)) {
      return new URL(productionOrigin);
    }
    return new URL(url.origin);
  } catch {
    return new URL(productionOrigin);
  }
}

export function isIndexableEnvironment(env: { NODE_ENV?: string; VERCEL_ENV?: string }): boolean {
  return env.NODE_ENV === 'production' && (!env.VERCEL_ENV || env.VERCEL_ENV === 'production');
}

export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const isIndexable = isIndexableEnvironment(process.env);
export const siteName = 'Salah-Eddine MIMOUNI';
export const homeSeo = {
  title: 'Salah-Eddine MIMOUNI | Marketing digital, IA & conférences',
  description: 'Entrepreneur, auteur et conférencier au Maroc, Salah-Eddine MIMOUNI partage ses livres, podcasts et expertises en marketing digital et intelligence artificielle.',
  image: '/assets/seo/accueil-partage.png',
  imageAlt: 'Salah-Eddine MIMOUNI — Entrepreneur, auteur et conférencier. Marketing digital et intelligence artificielle.',
};

export const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': new URL('/#person', siteUrl).href,
      name: siteName,
      url: siteUrl.href,
      image: new URL('/assets/photos/portrait.jpeg', siteUrl).href,
      jobTitle: 'Entrepreneur, auteur et conférencier',
      knowsAbout: ['Marketing digital', 'Intelligence artificielle', 'Entrepreneuriat'],
    },
    {
      '@type': 'WebSite',
      '@id': new URL('/#website', siteUrl).href,
      url: siteUrl.href,
      name: siteName,
      inLanguage: 'fr-MA',
      publisher: { '@id': new URL('/#person', siteUrl).href },
    },
    {
      '@type': 'WebPage',
      '@id': new URL('/#webpage', siteUrl).href,
      url: siteUrl.href,
      name: homeSeo.title,
      description: homeSeo.description,
      inLanguage: 'fr-MA',
      isPartOf: { '@id': new URL('/#website', siteUrl).href },
      about: { '@id': new URL('/#person', siteUrl).href },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: new URL(homeSeo.image, siteUrl).href,
        width: 1200,
        height: 630,
      },
    },
  ],
};
