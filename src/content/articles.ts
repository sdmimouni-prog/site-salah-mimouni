import catalog from './articles.generated.json';
export type Article = {
  id: string;
  title: string;
  sourceUrl: string;
  category: string | null;
  excerpt: string | null;
  publishedAt: string | null;
  readingMinutes: number | null;
  image: string | null;
  imageAlt: string | null;
};
export const articles: Article[] = catalog.articles;
export const articleAuthorUrl = catalog.sourceUrl;
export const articlesImportedAt = catalog.importedAt;
export const articleAuthorPortrait = '/assets/photos/portrait-white.png';
