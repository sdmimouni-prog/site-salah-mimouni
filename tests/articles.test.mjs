import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import ts from 'typescript';
import { AUTHOR_URL, parseAuthorPage, parseArticlePage, publicationDate, readingMinutes, deduplicateArticles, sourceUrl } from '../scripts/lib/richmedia-articles.mjs';
import { importArticles } from '../scripts/import-articles.mjs';
const js = ts.transpileModule(readFileSync('src/lib/articles.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const lib = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const catalog = JSON.parse(readFileSync('src/content/articles.generated.json','utf8')).articles;
const sample = {id:'example',title:'Une stratégie éclairée',sourceUrl:'https://www.richmedia.ma/insights/example/',category:'Stratégie',excerpt:'Données et décision',publishedAt:'2026-05-01',readingMinutes:10,image:null,imageAlt:null};
const authorHtml = `<a class="article-card" href="/insights/navigation/"><h3>Outside</h3></a><section><h2>Articles publiés</h2><a href="/insights/">Voir tous les articles</a><a class="article-card" href="/insights/example/?utm_source=test"><div><span>SEO / GEO</span><h3>Un titre &amp; un autre</h3><p>Résumé source.</p><small>12 min de lecture 24 août 2026</small></div></a><nav class="pagination"><a href="${AUTHOR_URL}?page=2">2</a><a href="/insights/?page=2">Blog</a></nav></section><section><h2>Articles recommandés par Salah</h2><a class="article-card" href="/insights/recommended/"><h3>Recommandation</h3></a></section>`;
const articleHtml = `<link rel="canonical" href="https://www.richmedia.ma/insights/example/"><meta property="article:modified_time" content="2026-12-01"><script type="application/ld+json">{"@graph":[{"@type":"Article","headline":"Titre exact","datePublished":"2026-05-01","dateModified":"2026-12-01"}]}</script><main><header class="article-hero"><div class="article-hero-copy"><span class="section-kicker">Secteurs</span><h1>Titre exact</h1><div class="article-meta"><span>1 mai 2026</span><span>10 min de lecture</span></div></div></header></main>`;

test('author importer scopes to published cards, excludes recommendations/navigation, and follows only author pagination', () => {
  const parsed=parseAuthorPage(authorHtml);
  assert.equal(parsed.records.length,1); assert.equal(parsed.records[0].title,'Un titre & un autre');
  assert.equal(parsed.records[0].category,'SEO / GEO'); assert.equal(parsed.records[0].readingMinutes,12);
  assert.equal(parsed.records[0].publishedAt,'2026-08-24');
  assert.deepEqual(parsed.pages,[AUTHOR_URL+'?page=2']);
  assert.throws(()=>parseAuthorPage('<section><h2>Articles recommandés par Salah</h2></section>'),/absente/);
  assert.throws(()=>parseAuthorPage('<section><h2>Articles publiés</h2></section>'),/Aucune publication/);
});
test('detail parser preserves author taxonomy, publication date and exact headline without merging date/year into reading time', () => {
  const parsed=parseArticlePage(articleHtml,{...sample,category:'Guides'});
  assert.equal(parsed.title,'Titre exact'); assert.equal(parsed.category,'Guides'); assert.equal(parsed.publishedAt,'2026-05-01');
  assert.equal(parsed.readingMinutes,10); assert.equal(parsed.image,null); assert.equal(parsed.imageAlt,null);
  assert.equal(parseArticlePage(articleHtml.replace('"datePublished":"2026-05-01",',''),{...sample,publishedAt:null}).publishedAt,null);
});
test('missing/invalid dates and times stay null; French dates and month abbreviations parse accurately', () => {
  assert.equal(publicationDate('7 avr. 2026'),'2026-04-07'); assert.equal(publicationDate('24 août 2026'),'2026-08-24');
  for(const value of [null,'n/a','2026-02-31','32 août 2026'])assert.equal(publicationDate(value),null);
  assert.equal(readingMinutes('202610 min de lecture'),null); assert.equal(readingMinutes('0 min'),null);
});
test('canonical URLs deduplicate tracking, hash and trailing-slash variations and reject unrelated hosts', () => {
  assert.equal(deduplicateArticles([sample,{...sample,sourceUrl:sample.sourceUrl+'?utm_source=test#part'},{...sample,sourceUrl:sample.sourceUrl.slice(0,-1)}]).length,1);
  for(const value of ['https://richmedia.ma.evil.test/insights/test/','javascript:bad','http://127.0.0.1','https://user:password@richmedia.ma/a']) assert.equal(sourceUrl(value),null);
});
test('initial view features the newest verified publication and displays every other article once', () => {
  const view=lib.articleView(catalog);
  assert.equal(view.featured.id,'comment-choisir-agence-communication');
  assert.equal(view.grid.length,catalog.length-1); assert.ok(!view.grid.some(a=>a.id===view.featured.id));
  assert.equal(new Set([view.featured,...view.grid].map(a=>a.sourceUrl)).size,catalog.length);
});
test('search covers the featured article, combines accents/case, category and date order, then resets', () => {
  const view=lib.articleView(catalog,'AGENCE COMMUNICATION','Stratégie','oldest');
  assert.equal(view.featured,null); assert.equal(view.grid[0].id,'comment-choisir-agence-communication');
  assert.equal(lib.filterArticles([sample],'eclairee donnees strategie','Stratégie').length,1);
  assert.equal(lib.filterArticles([sample],'eclairee','SEO / GEO').length,0);
  const all=lib.articleView(catalog,'','Stratégie','oldest');
  assert.equal(all.grid.length,5); assert.ok(all.grid[0].publishedAt < all.grid.at(-1).publishedAt);
  assert.equal(lib.articleView(catalog,'unmatched-string','').grid.length,0);
  assert.equal(lib.articleView(catalog).grid.length,9);
});
test('SEO / GEO is one category and counts include the whole catalogue', () => {
  assert.deepEqual(lib.articleCategories(catalog),[{name:'Stratégie',count:5},{name:'SEO / GEO',count:2},{name:'Média & performance',count:2},{name:'Guides',count:1}]);
});
test('unknown publication dates always sort last and never become featured', () => {
  const items=[{...sample,id:'missing',publishedAt:null},{...sample,id:'old',publishedAt:'2025-01-01'},{...sample,id:'invalid',publishedAt:'bad'}];
  assert.equal(lib.latestArticle(items).id,'old');assert.equal(lib.sortArticles(items,'oldest')[0].id,'old');
  assert.equal(lib.latestArticle([{...sample,publishedAt:null}]),null); assert.equal(lib.articleDate(null),null);
});
test('import is repeatable, deduplicates canonical entries, and preserves last good catalogue after network/source errors', async () => {
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'articles-import-'));
  const source=`<section><h2>Articles publiés</h2><a class="article-card" href="/insights/example/"><div><span>Stratégie</span><h3>Titre</h3></div></a><a class="article-card" href="/insights/alias/"><h3>Alias</h3></a></section>`;
  const fetcher=async url=>new Response(url===AUTHOR_URL?source:articleHtml,{status:200});
  try {
    assert.equal((await importArticles({root,fetcher})).count,1);
    assert.equal((await importArticles({root,fetcher})).count,1);
    const filename=path.join(root,'src/content/articles.generated.json'), previous=await fs.readFile(filename,'utf8');
    for(const failing of [async()=>new Response('unavailable',{status:503}),async()=>new Response('<h1>Changed page</h1>'),async url=>url===AUTHOR_URL?new Response(source):new Response('',{status:500})]) {
      await assert.rejects(importArticles({root,fetcher:failing}));
      assert.equal(await fs.readFile(filename,'utf8'),previous);
    }
  } finally { await fs.rm(root,{recursive:true,force:true}); }
});
test('live imported catalogue has source URLs, optional-field integrity and available local image files', async () => {
  assert.equal(catalog.length,10); assert.equal(new Set(catalog.map(a=>a.sourceUrl)).size,10);
  for(const item of catalog) {
    assert.ok(sourceUrl(item.sourceUrl)); assert.ok(item.title);
    assert.ok(item.readingMinutes===null || (item.readingMinutes>0 && item.readingMinutes<100));
    if(item.image) assert.ok((await fs.stat('public'+item.image)).size>0);
    assert.ok(!item.sourceUrl.includes('design-performance-directeur')); assert.ok(!item.sourceUrl.includes('combien-coute-influenceur'));
  }
});
