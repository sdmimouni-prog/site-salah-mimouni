import test from 'node:test';
import assert from 'node:assert/strict';
import { moduleUrl } from './helpers/typescript-module.mjs';
const load = file => import(moduleUrl(`src/${file}.ts`));
const {getTranslator,localizeContent} = await load('lib/translate');
const {books} = await load('content/books');
const {library} = await load('content/library');
const {ancienPauvre,validateLandingOrder} = await load('content/ancien-pauvre');
const {marques,validateMarquesRequest} = await load('content/marques');
const {articles} = await load('content/articles');
const {podcastEpisodes} = await load('content/podcasts');
const {podcastAudioLanguages} = await load('content/media-languages');
const {contact} = await load('content/contact');
const {emptyContactFields,validateContactFields} = await load('lib/contact-request');
const {validateNewsletterFields} = await load('lib/newsletter-request');
const {filterArticles,articleDate} = await load('lib/articles');
const {filterEpisodes,dateLabel} = await load('lib/podcasts');
const {siteRoutes} = await load('lib/i18n');
const {englishPageMetadata,pageMetadata} = await load('lib/page-metadata');
const en=getTranslator('en'),fr=getTranslator('fr');

test('all published book titles, identifiers, prices, assets and ordering modes survive translation unchanged',()=>{
 const before=JSON.stringify([books,library,ancienPauvre,marques]);
 for(const source of [books,library.books]) {
  const translated=localizeContent(source,'en');
  translated.forEach((book,i)=>{
   for(const key of ['title','slug','price','image','cover','href'])assert.equal(book[key],source[i][key]);
  });
 }
 for(const source of [ancienPauvre,marques]) {
  const translated=localizeContent(source,'en');
  assert.equal(translated.author,'Salah-Eddine MIMOUNI');
  assert.equal(translated.commerce.mode,source.commerce.mode);
  assert.equal(translated.commerce.price,145);
  assert.equal(translated.commerce.recipient,'sd.mimouni@richmedia.ma');
  for(let i=0;i<source.excerpts.length;i++)assert.notEqual(translated.excerpts[i].text,source.excerpts[i].text);
 }
 assert.equal(localizeContent(books,'fr'),books);
 assert.equal(JSON.stringify([books,library,ancienPauvre,marques]),before);
});

test('English summaries remain searchable by English and original article titles',()=>{
 const translated=localizeContent(articles.map(a=>({...a,originalTitle:a.title,originalExcerpt:a.excerpt})),'en');
 for(let i=0;i<articles.length;i++) {
  assert.notEqual(translated[i].title,articles[i].title);
  assert.notEqual(translated[i].excerpt,articles[i].excerpt);
  assert.equal(translated[i].sourceUrl,articles[i].sourceUrl);
  assert.ok(filterArticles(translated,articles[i].title,'').some(a=>a.id===articles[i].id));
  assert.ok(filterArticles(translated,translated[i].title,'').some(a=>a.id===articles[i].id));
 }
 assert.ok(filterArticles(translated,'growth','Strategy').length>0);
 assert.equal(articleDate('2026-08-24','en'),'24 Aug 2026');
 assert.equal(articleDate('2026-08-24'),'24 août 2026');
});

test('podcast translations preserve source recordings and support original Arabic and English searches',()=>{
 const translated=localizeContent(podcastEpisodes.map(e=>({...e,originalTitle:e.title})),'en');
 for(let i=0;i<podcastEpisodes.length;i++){
  const original=podcastEpisodes[i],english=translated[i];
  assert.notEqual(english.title,original.title);
  assert.notEqual(english.description,original.description);
  for(const key of ['id','videoId','sourceUrl','duration','publishedAt'])assert.equal(english[key],original[key]);
  assert.ok(filterEpisodes(translated,original.title,'').some(e=>e.id===original.id));
  assert.ok(filterEpisodes(translated,english.title,'').some(e=>e.id===original.id));
 }
 assert.equal(dateLabel('2026-05-19','en'),'19 May 2026');
 assert.equal(podcastAudioLanguages.ilmbyrflEQQ,'ar');
 assert.equal(podcastAudioLanguages.ofJESCT5HDc,'fr');
 assert.equal(podcastAudioLanguages.NADMauj7z68,undefined);
});

test('translated contact labels keep backend values and the fixed notification recipient',()=>{
 const translated=localizeContent(contact,'en');
 assert.equal(translated.email,contact.email);
 assert.deepEqual(translated.subjects.map(s=>s.value),contact.subjects.map(s=>s.value));
 assert.deepEqual(translated.formats.map(s=>s.value),contact.formats.map(s=>s.value));
 assert.equal(translated.subjects[0].label,'Talk or masterclass');
 assert.equal(translated.formats[0].label,'In person');
});

test('contact, newsletter and book validation messages are translated without changing validation rules',()=>{
 const contactErrors=validateContactFields({...emptyContactFields,phone:'bad',organization:'x'.repeat(151),date:'2026-99-99',location:'x'.repeat(151),format:'invalid',website:'bot'});
 const newsletterErrors=validateNewsletterFields({email:'bad',consent:false,website:'bot'});
 const landingErrors=validateLandingOrder({name:'',phone:'',city:'',address:'',quantity:'11',consent:false});
 const marquesErrors=validateMarquesRequest({book:'bad',name:'',phone:'',email:'bad',city:'',address:'',quantity:'0',consent:false});
 for(const error of Object.values({...contactErrors,...newsletterErrors,...landingErrors,...marquesErrors}))assert.notEqual(en(error),error,error);
 for(const error of Object.values(contactErrors))assert.notEqual(en(error),error,error);
 for(const error of Object.values(landingErrors))assert.notEqual(en(error),error,error);
 assert.equal(en('exemplaires'),'copies');
});

test('translated templates preserve inserted book titles, whitespace and French fallback',()=>{
 const title='Pour un like de plus…';
 assert.equal(en`Découvrir ${title}`,`Explore ${title}`);
 assert.equal(fr`Découvrir ${title}`,`Découvrir ${title}`);
 assert.equal(en(' Prix : '),' Price: ');
 assert.equal(en('Salah-Eddine MIMOUNI'),'Salah-Eddine MIMOUNI');
 assert.equal(en('Not in the dictionary'),'Not in the dictionary');
});

test('all completed English interiors use distinct canonicals and reciprocal hreflang metadata',()=>{
 const titles=new Set();
 for(const route of siteRoutes.filter(r=>r.id!=='home')) {
  const english=englishPageMetadata(route),french=pageMetadata({title:'French page'},route.fr,'fr');
  assert.ok(!titles.has(english.title));titles.add(english.title);
  if(route.section==='books' && !route.navigation) {
   assert.ok(english.title.includes(route.label.en));
   assert.ok(english.title.includes('French edition'));
  }
  assert.equal(english.alternates.canonical,route.en);
  assert.equal(french.alternates.canonical,route.fr);
  assert.deepEqual(english.alternates.languages,french.alternates.languages);
  assert.equal(english.openGraph.url,route.en);
  assert.equal(english.openGraph.locale,'en_GB');
  assert.ok(english.description.length>60);
  assert.equal(pageMetadata({},route.en+'?utm_source=test#commander','en').alternates.canonical,route.en);
 }
});
