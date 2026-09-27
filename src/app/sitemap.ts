import type { MetadataRoute } from 'next';
import { articlesImportedAt } from '@/content/articles';
import { siteUrl } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/a-propos', '/articles', '/podcasts', '/livres', '/evenements', '/contact', '/livres/lancien-pauvre', '/livres/quand-les-marques-pensent', '/livres/pour-un-like-de-plus'];
  return routes.map(route => ({url:new URL(route,siteUrl).href,...(route==='/articles'?{lastModified:articlesImportedAt}:{})}));
}
