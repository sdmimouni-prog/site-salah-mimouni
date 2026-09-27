import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const js = ts.transpileModule(readFileSync('src/lib/i18n.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { siteRoutes, findRoute, localizedHref, navigationRoutes } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);

test('every public page, including each book, has a unique reversible language mapping', () => {
  assert.equal(siteRoutes.length, 11);
  for (const locale of ['fr', 'en']) assert.equal(new Set(siteRoutes.map(route => route[locale])).size, 11);
  for (const route of siteRoutes) {
    assert.equal(localizedHref(route.fr, 'en'), route.en);
    assert.equal(localizedHref(route.en, 'fr'), route.fr);
    assert.equal(localizedHref(route.en, 'en'), route.en);
    assert.equal(findRoute(route.en + '/').id, route.id);
  }
  assert.equal(localizedHref('/a-propos', 'en'), '/en/about');
  assert.equal(localizedHref('/evenements', 'en'), '/en/events');
  assert.equal(localizedHref('/livres/quand-les-marques-pensent', 'en'), '/en/books/quand-les-marques-pensent');
});

test('switches retain raw query parameters and section anchors in both directions', () => {
  assert.equal(localizedHref('/contact?objet=conference&message=a%2Bb#formulaire', 'en'), '/en/contact?objet=conference&message=a%2Bb#formulaire');
  assert.equal(localizedHref('/en/books/lancien-pauvre?source=menu#commander', 'fr'), '/livres/lancien-pauvre?source=menu#commander');
  assert.equal(localizedHref('/#livres', 'en'), '/en#livres');
  assert.equal(localizedHref('/en?query=AI#episodes', 'fr'), '/?query=AI#episodes');
});

test('external links, files, API requests and on-page anchors stay untouched', () => {
  for (const href of ['https://www.youtube.com/watch?v=Q6cC7A2ST7M', '//example.com/a', 'mailto:sd.mimouni@richmedia.ma', 'tel:+212661172885', '#commander', '/api/contact', '/assets/photos/portrait.jpeg', '/robots.txt', '/sitemap.xml', '/unknown']) {
    assert.equal(localizedHref(href, 'en'), href);
  }
});

test('unknown or ambiguous paths do not resolve to an unrelated page', () => {
  for (const path of ['/en/unknown', '/en/books/unknown', '/enough', '/en/fr/about', '/about', '/a-propos/autre']) assert.equal(findRoute(path), undefined);
  assert.equal(findRoute('/en/books/pour-un-like-de-plus').section, 'books');
  assert.equal(navigationRoutes.length, 7);
  assert.deepEqual(navigationRoutes.map(route => route.label.en), ['Home', 'About', 'Articles', 'Podcasts', 'Books', 'Events', 'Contact']);
});
