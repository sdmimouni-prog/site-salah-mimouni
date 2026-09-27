import type { MetadataRoute } from 'next';
import { articlesImportedAt } from '@/content/articles';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://127.0.0.1:3009');
  const routes = ['/', '/a-propos', '/articles', '/podcasts', '/livres', '/evenements', '/contact', '/livres/lancien-pauvre', '/livres/quand-les-marques-pensent', '/livres/pour-un-like-de-plus'];
  return routes.map(route => ({url:new URL(route,base).href,...(route==='/articles'?{lastModified:articlesImportedAt}:{})}));
}
