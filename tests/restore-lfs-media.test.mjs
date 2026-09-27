import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { restoreLfsFile } from '../scripts/restore-lfs-media.mjs';

const media = Buffer.from('Original video bytes for the download integrity test.');
const pointer = `version https://git-lfs.github.com/spec/v1\noid sha256:${createHash('sha256').update(media).digest('hex')}\nsize ${media.length}\n`;
async function fixture(t, content = pointer) {
  const directory = await mkdtemp(join(tmpdir(), 'site-lfs-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const file = join(directory, 'video.mp4');
  await writeFile(file, content);
  return { directory, file };
}

test('actual media needs no network access or changes', async t => {
  const { file } = await fixture(t, media);
  assert.equal(await restoreLfsFile(file, 'https://example.com/video', () => { throw new Error('Unexpected download'); }), false);
  assert.deepEqual(await readFile(file), media);
});

test('restores a pointer only after size and SHA-256 match', async t => {
  const { file, directory } = await fixture(t);
  assert.equal(await restoreLfsFile(file, 'https://example.com/video', async () => new Response(media)), true);
  assert.deepEqual(await readFile(file), media);
  assert.deepEqual(await readdir(directory), ['video.mp4']);
});

test('corrupt or oversized downloads leave the pointer intact and remove partial files', async t => {
  for (const badMedia of [Buffer.alloc(media.length), Buffer.alloc(media.length + 1)]) {
    const { file, directory } = await fixture(t);
    await assert.rejects(restoreLfsFile(file, 'https://example.com/video', async () => new Response(badMedia)), /integrity|exceeds/);
    assert.equal(await readFile(file, 'utf8'), pointer);
    assert.deepEqual(await readdir(directory), ['video.mp4']);
  }
});

test('a missing remote object fails the build instead of publishing a pointer', async t => {
  const { file } = await fixture(t);
  await assert.rejects(restoreLfsFile(file, 'https://example.com/video', async () => new Response('Not found', { status: 404 })), /HTTP 404/);
  assert.equal(await readFile(file, 'utf8'), pointer);
});
