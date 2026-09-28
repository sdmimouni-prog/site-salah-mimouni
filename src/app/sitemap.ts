import type { MetadataRoute } from 'next';
import { articlesImportedAt } from '@/content/articles';
import { siteRoutes } from '@/lib/i18n';
import { siteUrl } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.filter(route => route.id !== 'entre-deux-vols').flatMap(route => (['fr', 'en'] as const).map(locale => ({
    url: new URL(route[locale], siteUrl).href,
    ...(route.id === 'articles' ? { lastModified: articlesImportedAt } : {}),
    alternates: { languages: {
      fr: new URL(route.fr, siteUrl).href, en: new URL(route.en, siteUrl).href, 'x-default': new URL(route.fr, siteUrl).href,
    } },
  })));
}
