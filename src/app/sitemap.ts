import type { MetadataRoute } from 'next';
import { articlesImportedAt } from '@/content/articles';
import { siteUrl } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/en', '/a-propos', '/articles', '/podcasts', '/livres', '/evenements', '/contact', '/livres/lancien-pauvre', '/livres/quand-les-marques-pensent', '/livres/pour-un-like-de-plus'];
  return routes.map(route => ({
    url: new URL(route, siteUrl).href,
    ...(route === '/articles' ? { lastModified: articlesImportedAt } : {}),
    ...(['/', '/en'].includes(route) ? { alternates: { languages: {
      fr: siteUrl.href, en: new URL('/en', siteUrl).href, 'x-default': siteUrl.href,
    } } } : {}),
  }));
}
