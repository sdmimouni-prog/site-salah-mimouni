import type { Article } from '../content/articles';
export type ArticleOrder = 'newest' | 'oldest';
export const normalizeArticleSearch = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('fr').trim();
export function sortArticles(articles: Article[], order: ArticleOrder = 'newest') {
  const timestamp = (value: string | null) => value && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
  return [...articles].sort((a,b) => {
    const left=timestamp(a.publishedAt), right=timestamp(b.publishedAt);
    if (left === null) return right === null ? 0 : 1;
    if (right === null) return -1;
    return order === 'oldest' ? left-right : right-left;
  });
}
export function latestArticle(articles: Article[]) {
  return sortArticles(articles).find(article => article.publishedAt && Number.isFinite(Date.parse(article.publishedAt))) || null;
}
export function articleCategories(articles: Article[]) {
  const counts = new Map<string,number>();
  for (const article of articles) if (article.category) counts.set(article.category,(counts.get(article.category) || 0)+1);
  return [...counts].map(([name,count]) => ({name,count}));
}
export function filterArticles(articles: Article[], query: string, category: string) {
  const terms = normalizeArticleSearch(query).split(/\s+/).filter(Boolean);
  return articles.filter(article => (!category || article.category === category) && terms.every(term => normalizeArticleSearch([article.title,article.excerpt || '',article.category || ''].join(' ')).includes(term)));
}
export function articleView(articles: Article[], query = '', category = '', order: ArticleOrder = 'newest') {
  const filtering = !!query.trim() || !!category;
  const featured = filtering ? null : latestArticle(articles);
  const matching = sortArticles(filterArticles(articles,query,category),order);
  return {filtering,featured,matching,grid:matching.filter(article => article.sourceUrl !== featured?.sourceUrl)};
}
export function articleDate(value: string | null) {
  if (!value || !Number.isFinite(Date.parse(value))) return null;
  return new Intl.DateTimeFormat('fr-FR',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(value));
}
