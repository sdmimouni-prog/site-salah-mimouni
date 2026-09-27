import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { AUTHOR_URL, sourceUrl, parseAuthorPage, parseArticlePage, deduplicateArticles } from './lib/richmedia-articles.mjs';

export const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const fingerprint = value => createHash('sha256').update(value).digest('hex').slice(0,16);
async function fetchPublic(url, fetcher) {
  const safe = sourceUrl(url);
  if (!safe) throw new Error(`Source non autorisée : ${url}`);
  const response = await fetcher(safe, { signal:AbortSignal.timeout(25000), headers:{'User-Agent':'SalahMimouni-ArticlesImport/1.0'}, redirect:'manual' });
  if ([301,302,303,307,308].includes(response.status)) throw new Error(`Redirection à vérifier : ${safe} → ${response.headers.get('location')}`);
  if (!response.ok) throw new Error(`HTTP ${response.status} : ${safe}`);
  return response;
}
export async function importArticles({root = projectRoot, fetcher = fetch} = {}) {
  const catalogPath = path.join(root, 'src/content/articles.generated.json');
  let previous = {articles:[]};
  try { previous = JSON.parse(await fs.readFile(catalogPath,'utf8')); } catch {}
  const evidencePath = path.join(root,'output/articles/import');
  await fs.mkdir(evidencePath,{recursive:true});
  const pages = [AUTHOR_URL], visited = new Set(), cards = new Map();
  while (pages.length) {
    if (visited.size >= 100) throw new Error('Pagination anormale : import interrompu, catalogue préservé.');
    const url = pages.shift(); if (visited.has(url)) continue;
    visited.add(url);
    const html = await (await fetchPublic(url,fetcher)).text();
    await fs.writeFile(path.join(evidencePath, visited.size === 1 ? 'author.html' : `author-${fingerprint(url)}.html`),html);
    const parsed = parseAuthorPage(html,url);
    for (const card of parsed.records) if (!cards.has(card.sourceUrl)) cards.set(card.sourceUrl,card);
    for (const page of parsed.pages) if (!visited.has(page) && !pages.includes(page)) pages.push(page);
  }
  const imported = [], warnings = [];
  // Small batches keep imports polite to the source. A failed page aborts the update.
  const allCards = [...cards.values()];
  for (let index=0;index<allCards.length;index+=3) {
    const batch = await Promise.all(allCards.slice(index,index+3).map(async card => {
      const response = await fetchPublic(card.sourceUrl,fetcher), html = await response.text();
      const article = parseArticlePage(html,card,response.url || card.sourceUrl);
      await fs.writeFile(path.join(evidencePath,`${article.id}.html`),html);
      return article;
    }));
    imported.push(...batch);
  }
  const records = deduplicateArticles(imported);
  const imageCache = new Map(), assetPath = path.join(root,'public/assets/articles');
  await fs.mkdir(assetPath,{recursive:true});
  for (const article of records) {
    const remoteImage = article.image;
    article.image = null;
    if (!remoteImage) continue;
    try {
      if (!imageCache.has(remoteImage)) {
        const response = await fetchPublic(remoteImage,fetcher);
        const bytes = Buffer.from(await response.arrayBuffer());
        if (bytes.length > 12_000_000) throw new Error('Image trop volumineuse');
        const metadata = await sharp(bytes,{limitInputPixels:40_000_000}).metadata();
        if (!['webp','png','jpeg','avif'].includes(metadata.format) || !metadata.width || !metadata.height) throw new Error('Image non reconnue');
        const filename = `${fingerprint(remoteImage + fingerprint(bytes))}.${metadata.format === 'jpeg' ? 'jpg' : metadata.format}`;
        await fs.writeFile(path.join(assetPath,filename),bytes);
        imageCache.set(remoteImage,{path:`/assets/articles/${filename}`,source:remoteImage,width:metadata.width,height:metadata.height});
      }
      article.image = imageCache.get(remoteImage).path;
    } catch (error) {
      const old = previous.articles.find(item => item.sourceUrl === article.sourceUrl);
      if (old?.image && old.image.startsWith('/assets/articles/')) {
        try { await fs.access(path.join(root,'public',old.image)); article.image = old.image; article.imageAlt = old.imageAlt; } catch {}
      }
      warnings.push(`${article.id} : image indisponible (${error.message})${article.image ? ', dernier visuel conservé' : ''}`);
    }
  }
  if (!records.length) throw new Error('Catalogue vide refusé.');
  records.sort((a,b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
  const catalog = {sourceUrl:AUTHOR_URL,importedAt:new Date().toISOString(),articles:records};
  await fs.mkdir(path.dirname(catalogPath),{recursive:true});
  // The last valid catalogue remains untouched until all publication pages have succeeded.
  const temporary = catalogPath + `.tmp-${process.pid}`;
  try { await fs.writeFile(temporary,JSON.stringify(catalog,null,2)+'\n'); await fs.rename(temporary,catalogPath); }
  finally { await fs.rm(temporary,{force:true}); }
  const provenance = {sourceUrl:AUTHOR_URL,importedAt:catalog.importedAt,authorPages:[...visited],images:[...imageCache.values()],warnings};
  await fs.writeFile(path.join(evidencePath,'manifest.json'),JSON.stringify(provenance,null,2)+'\n');
  await fs.writeFile(path.join(assetPath,'SOURCES.md'),`# Images des articles Richmedia\n\nSource : ${AUTHOR_URL}\nImport : ${catalog.importedAt}\n\nImages originales téléchargées depuis les pages des publications. Aucune génération ou retouche. Optimisation à l’affichage par Next Image. Les images illustrent les sujets des articles ; elles ne sont pas issues de la maquette.\n\n` + [...imageCache.values()].map(image=>`- \`${image.path}\` — ${image.source} (${image.width} × ${image.height})`).join('\n')+'\n');
  return {count:records.length,categories:new Set(records.map(item=>item.category).filter(Boolean)).size,pages:visited.size,warnings};
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(await importArticles(),null,2)); }
  catch(error) { console.error(`Import échoué : ${error.message}\nLe dernier catalogue valide reste en place.`); process.exitCode=1; }
}
