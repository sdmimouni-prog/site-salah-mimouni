import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync('src/lib/seo.ts', 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { resolveSiteUrl, isIndexableEnvironment, homeStructuredData } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);

test('canonical origin defaults to production, never localhost or an invalid URL', () => {
  for (const value of [undefined, '', 'invalid', 'http://127.0.0.1:3009', 'https://127.0.0.1', 'https://localhost', 'https://site.local', 'https://preview.localhost', 'https://user:pass@example.com']) {
    assert.equal(resolveSiteUrl(value).href, 'https://site-salah-mimouni.vercel.app/');
  }
  assert.equal(resolveSiteUrl('https://www.example.com/path?query=1#fragment').href, 'https://www.example.com/');
});

test('only production is indexable; Vercel preview builds remain blocked', () => {
  assert.equal(isIndexableEnvironment({ NODE_ENV: 'production', VERCEL_ENV: 'production' }), true);
  assert.equal(isIndexableEnvironment({ NODE_ENV: 'production' }), true);
  for (const env of [{}, { NODE_ENV: 'development' }, { NODE_ENV: 'test' }, { NODE_ENV: 'production', VERCEL_ENV: 'preview' }, { NODE_ENV: 'production', VERCEL_ENV: 'development' }]) {
    assert.equal(isIndexableEnvironment(env), false);
  }
});

test('homepage schema connects the person, website and page without fabricated reviews', () => {
  const graph = homeStructuredData['@graph'];
  const ids = new Set(graph.map(item => item['@id']));
  assert.equal(ids.size, 3);
  const [person, website, page] = graph;
  assert.equal(person.name, 'Salah-Eddine MIMOUNI');
  assert.equal(website.publisher['@id'], person['@id']);
  assert.equal(page.isPartOf['@id'], website['@id']);
  assert.equal(page.about['@id'], person['@id']);
  assert.equal(/aggregateRating|reviewRating|localhost|127\.0\.0\.1/.test(JSON.stringify(homeStructuredData)), false);
});
