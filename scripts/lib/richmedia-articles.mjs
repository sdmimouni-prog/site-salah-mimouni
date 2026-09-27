import { load } from 'cheerio';

export const AUTHOR_URL = 'https://www.richmedia.ma/auteurs/salah-eddine-mimouni/';
const HOSTS = new Set(['www.richmedia.ma', 'richmedia.ma']);
export const cleanText = value => typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() || null : null;
export const normalized = value => (value || '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
export function sourceUrl(value, base = AUTHOR_URL) {
  if (!value) return null;
  try {
    const url = new URL(value, base);
    if (url.protocol !== 'https:' || !HOSTS.has(url.hostname) || url.username || url.password) return null;
    url.hostname = 'www.richmedia.ma'; url.hash = '';
    for (const key of [...url.searchParams.keys()]) if (/^(utm_|fbclid|gclid)/i.test(key)) url.searchParams.delete(key);
    return url.href;
  } catch { return null; }
}
export function publicationDate(value) {
  const text = cleanText(value);
  if (!text) return null;
  let candidate = text.match(/^(\d{4}-\d{2}-\d{2})(?:T|$)/)?.[1];
  if (!candidate) {
    const months = {janv:1,janvier:1,fevr:2,fevrier:2,mars:3,avr:4,avril:4,mai:5,juin:6,juil:7,juillet:7,aout:8,sept:9,septembre:9,oct:10,octobre:10,nov:11,novembre:11,dec:12,decembre:12};
    const match = normalized(text).match(/\b(\d{1,2})\s+([a-z]+)\.?\s+(\d{4})\b/);
    if (!match || !months[match[2]]) return null;
    candidate = `${match[3]}-${String(months[match[2]]).padStart(2,'0')}-${match[1].padStart(2,'0')}`;
  }
  const date = new Date(candidate + 'T00:00:00.000Z');
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === candidate ? candidate : null;
}
export function readingMinutes(value) {
  const match = cleanText(value)?.match(/\b(\d{1,3})\s*min(?:ute)?s?\b/i);
  return match && Number(match[1]) > 0 ? Number(match[1]) : null;
}
export function parseAuthorPage(html, pageUrl = AUTHOR_URL) {
  const $ = load(html);
  const heading = $('h2').filter((_, node) => normalized($(node).text()).trim() === 'articles publies').first();
  const section = heading.closest('section');
  if (!section.length) throw new Error('La section « Articles publiés » est absente. Catalogue précédent conservé.');
  const records = [];
  section.find('a.article-card, article a:has(h3)').each((_, element) => {
    const card = $(element), url = sourceUrl(card.attr('href'), pageUrl), title = cleanText(card.find('h3').first().text());
    if (!url || !new URL(url).pathname.startsWith('/insights/') || !title) return;
    records.push({ sourceUrl:url, title, category:cleanText(card.find('div > span').first().text()), excerpt:cleanText(card.find('p').first().text()), publishedAt:publicationDate(card.find('small').text()), readingMinutes:readingMinutes(card.find('small').text()), image:sourceUrl(card.find('img').first().attr('src'), pageUrl), imageAlt:cleanText(card.find('img').first().attr('alt')) });
  });
  if (!records.length) throw new Error('Aucune publication identifiable. Catalogue précédent conservé.');
  // Pagination can only remain inside this author's URL namespace; never follow /insights/ or recommendations.
  const pages = new Set();
  section.find('a[href]').add($('a[rel~="next"], link[rel~="next"], nav[aria-label*="agination"] a, .pagination a')).each((_, node) => {
    const url = sourceUrl($(node).attr('href'), pageUrl);
    if (url && new URL(url).pathname.startsWith(new URL(AUTHOR_URL).pathname) && url !== pageUrl) pages.add(url);
  });
  return { records, pages:[...pages] };
}
function articleSchema($) {
  for (const node of $('script[type="application/ld+json"]').toArray()) {
    try {
      const parsed = JSON.parse($(node).text());
      const nodes = Array.isArray(parsed) ? parsed : parsed['@graph'] || [parsed];
      const article = nodes.find(item => [item['@type']].flat().some(type => ['Article','BlogPosting','NewsArticle'].includes(type)));
      if (article) return article;
    } catch { /* Invalid structured data is ignored; visible article metadata remains available. */ }
  }
  return {};
}
export function parseArticlePage(html, card, finalUrl = card.sourceUrl) {
  const $ = load(html), schema = articleSchema($);
  const canonical = sourceUrl($('link[rel="canonical"]').attr('href') || finalUrl, finalUrl);
  if (!canonical || !/^\/insights\/[^/]+\/?$/.test(new URL(canonical).pathname)) throw new Error(`URL de publication invalide : ${finalUrl}`);
  const title = cleanText($('.article-hero h1').first().text()) || cleanText($('main h1').first().text()) || cleanText(schema.headline);
  if (!title) throw new Error(`Titre absent : ${finalUrl}`);
  const imageNode = $('.article-hero-media img').first();
  return {
    id: new URL(canonical).pathname.split('/').filter(Boolean).at(-1), title, sourceUrl:canonical,
    // The author page is the requested catalogue taxonomy (e.g. Guides, not the detail template's Secteurs).
    category:card.category || cleanText($('.article-hero-copy > .section-kicker').first().text()),
    excerpt:cleanText($('meta[name="description"]').attr('content')) || cleanText(schema.description) || card.excerpt,
    // dateModified and article:modified_time must never be used for the publication date.
    publishedAt:publicationDate(schema.datePublished) || publicationDate($('meta[property="article:published_time"]').attr('content')) || card.publishedAt,
    readingMinutes:readingMinutes($('.article-meta span, .article-meta time').toArray().map(node => $(node).text()).join(' ')) || card.readingMinutes,
    image:sourceUrl(imageNode.attr('src') || $('meta[property="og:image"]').attr('content'), finalUrl) || card.image,
    imageAlt:cleanText(imageNode.attr('alt')) || cleanText($('meta[property="og:image:alt"]').attr('content')) || card.imageAlt,
  };
}
export function deduplicateArticles(records) {
  const unique = new Map();
  for (const record of records) {
    const canonical = sourceUrl(record.sourceUrl);
    if (!canonical) throw new Error('URL de publication manquante ou invalide.');
    const url = new URL(canonical); url.search = ''; url.pathname = url.pathname.replace(/\/?$/, '/');
    if (!unique.has(url.href)) unique.set(url.href, { ...record, sourceUrl:url.href });
  }
  return [...unique.values()];
}
