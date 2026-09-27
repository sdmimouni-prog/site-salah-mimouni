import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import ts from 'typescript';
const modules = new Map();
function moduleUrl(file) {
  file = resolve(file); if (modules.has(file)) return modules.get(file);
  let js = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  js = js.replace(/from ['"](\.[^'"]+)['"]/g, (_, path) => `from '${moduleUrl(resolve(dirname(file), path + '.ts'))}'`);
  const url = `data:text/javascript;base64,${Buffer.from(js).toString('base64')}`; modules.set(file, url); return url;
}
const lib = await import(moduleUrl('src/lib/podcasts.ts'));
const { podcastEpisodes, podcastPlatforms, podcastStats } = await import(moduleUrl('src/content/podcasts.ts'));
const { home } = await import(moduleUrl('src/content/home.ts'));
const episode = (overrides = {}) => ({ ...podcastEpisodes[0], id: 'test', status: 'published', videoId: null, sourceUrl: null, audioUrl: null, publishedAt: null, ...overrides });

test('publishes exactly the seven supplied YouTube videos with author-approved name typography and original metadata', () => {
  const ids = ['Q6cC7A2ST7M','ilmbyrflEQQ','NADMauj7z68','WRUzlvH0lug','3CgqiI0YMUA','ofJESCT5HDc','ETay40EqtfY'];
  assert.deepEqual(podcastEpisodes.map(item => item.videoId), ids);
  for (const item of podcastEpisodes) {
    const source = JSON.parse(readFileSync('tests/fixtures/youtube/' + item.id + '-details.json', 'utf8'));
    const expectedTitle = source.details.title.trim().replace(/\bSalah[ -]Eddine Mimouni\b/gi, 'Salah-Eddine MIMOUNI');
    assert.equal(item.title, expectedTitle);
    assert.equal(item.duration, Number(source.details.lengthSeconds));
    assert.equal(item.publishedAt, source.microformat.publishDate.slice(0,10));
    assert.equal(lib.episodeSource(item).videoId, item.id);
    assert.ok(readFileSync('public' + item.thumbnail).byteLength > 8000);
    assert.equal(item.status, 'published');
  }
});
test('homepage previews reuse the newest three real episodes, production excludes any demo record', () => {
  const published = lib.visibleEpisodes(podcastEpisodes, false);
  assert.equal(published.length, 7);
  assert.deepEqual(home.episodes.map(item => item.title), published.slice(0,3).map(item => item.title));
  assert.equal(home.news[0].image, published[0].thumbnail);
  for (const existing of home.episodes) assert.equal(lib.youtubeId(existing.sourceUrl), published.find(item => item.title === existing.title).id);
  assert.equal(lib.latestPlayableEpisode(podcastEpisodes).id, 'WRUzlvH0lug');
  assert.equal(lib.visibleEpisodes([...podcastEpisodes, episode({status:'demo'})], false).length, 7);
  assert.ok(podcastPlatforms.every(platform => platform.verified && lib.platformUrl(platform.url)));
  assert.ok(podcastStats.every(stat => stat.verified && stat.value));
  assert.equal(podcastStats[0].value, '7');
});
test('search covers title, show, descriptions, guests and topics with combined accent/case-insensitive terms', () => {
  const item = episode({ title: 'Éducation et société', showName: 'Échos', description: 'Créer demain', guests: ['Léa'], topics: ['Marketing'] });
  for (const query of ['EDUCATION', 'echos', 'creer', 'LEA', 'marketing', 'EDUCATION léa']) assert.equal(lib.filterEpisodes([item], query, 'Marketing').length, 1);
  assert.equal(lib.filterEpisodes([item], 'Léa', 'Société').length, 0);
  assert.equal(lib.filterEpisodes([item], 'absent', '').length, 0);
  assert.equal(lib.filterEpisodes([item], '', '').length, 1);
});
test('Arabic titles remain unchanged and search matches without diacritics', () => {
  const item = episode({ title: 'الذّكاء الاصطناعي والمجتمع' });
  assert.equal(lib.filterEpisodes([item], 'الذكاء', '')[0].title, item.title);
});
test('dated episodes sort newest first, unknown dates stay stable without invented values', () => {
  const records = [episode({id:'null',publishedAt:null}),episode({id:'old',publishedAt:'2025-01-01'}),episode({id:'new',publishedAt:'2026-03-01'}),episode({id:'invalid',publishedAt:'bad'})];
  assert.deepEqual(lib.sortEpisodes(records).map(item => item.id), ['new','old','null','invalid']);
  assert.equal(records[0].id, 'null'); assert.equal(lib.dateLabel(null), null); assert.equal(lib.dateLabel('bad'), null);
});
test('source resolution accepts valid YouTube URLs and excludes impostor hosts and unsafe schemes', () => {
  for (const source of ['https://www.youtube.com/watch?v=abcdefghijk','https://youtu.be/abcdefghijk','https://youtube.com/shorts/abcdefghijk']) assert.equal(lib.episodeSource(episode({sourceUrl:source})).videoId, 'abcdefghijk');
  for (const value of ['javascript:alert(1)','data:audio/mp3,abc','//evil.test/x','https://user:pass@evil.test/x']) assert.equal(lib.safeMediaUrl(value), null);
  assert.equal(lib.youtubeId('https://youtube.com.evil.test/watch?v=abcdefghijk'), null);
  assert.equal(lib.youtubeId('abcdefghij'), null);
});
test('native audio/video and source-only links are distinguished; unsupported media stays unavailable', () => {
  assert.equal(lib.episodeSource(episode({audioUrl:'/media/show.mp3'})).kind, 'audio');
  assert.equal(lib.episodeSource(episode({sourceUrl:'/videos/show.mp4'})).kind, 'video');
  assert.equal(lib.episodeSource(episode({sourceUrl:'https://example.com/episode/1'})).kind, 'external');
  assert.equal(lib.episodeSource(episode()), null);
  assert.equal(lib.durationLabel(null), null); assert.equal(lib.durationLabel(-1), null); assert.equal(lib.durationLabel(2535), '42:15'); assert.equal(lib.durationLabel(6608), '1:50:08');
});
test('latest episode must be published with a real source; an unplayable or demo record is never selected', () => {
  const list = [episode({id:'missing',publishedAt:'2026-09-01'}),episode({id:'demo',status:'demo',sourceUrl:'/sample.mp4',publishedAt:'2026-08-01'}),episode({id:'real',audioUrl:'/sample.mp3',publishedAt:'2026-07-01'})];
  assert.equal(lib.latestPlayableEpisode(list).id, 'real');
});
test('platform links cannot be stand-in homepages or unsafe URLs', () => {
  for (const value of [null,'https://spotify.com/','https://youtube.com/?search=podcast','/podcasts','javascript:bad']) assert.equal(lib.platformUrl(value), null);
  assert.equal(lib.platformUrl('https://open.spotify.com/show/123'), 'https://open.spotify.com/show/123');
});
