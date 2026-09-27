import { createHash, randomUUID } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { readFile, rename, rm, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { pathToFileURL } from 'node:url';

// A Git integration may check out an LFS pointer instead of the actual video.
// Download only that case, and validate the complete object before publishing it.
export async function restoreLfsFile(file, sourceUrl, fetchMedia = fetch) {
  if ((await stat(file)).size > 1024) return false;
  const pointer = await readFile(file, 'utf8');
  if (!pointer.startsWith('version https://git-lfs.github.com/spec/v1')) return false;
  const oid = pointer.match(/^oid sha256:([a-f0-9]{64})$/m)?.[1];
  const size = Number(pointer.match(/^size (\d+)$/m)?.[1]);
  if (!oid || !Number.isSafeInteger(size) || size < 1) throw new Error('Invalid Git LFS media pointer.');

  const signal = AbortSignal.timeout(180_000);
  const response = await fetchMedia(sourceUrl, { signal });
  if (!response.ok || !response.body) throw new Error(`Media download failed (HTTP ${response.status}).`);
  const temporary = `${file}.${randomUUID()}.download`;
  const hash = createHash('sha256');
  let received = 0;
  const verify = new Transform({
    transform(chunk, encoding, callback) {
      received += chunk.length;
      if (received > size) return callback(new Error('Media exceeds its Git LFS size.'));
      hash.update(chunk);
      callback(null, chunk);
    },
  });
  try {
    await pipeline(Readable.fromWeb(response.body), verify, createWriteStream(temporary, { flags: 'wx' }), { signal });
    if (received !== size || hash.digest('hex') !== oid) throw new Error('Media integrity check failed.');
    await rename(temporary, file);
  } finally {
    await rm(temporary, { force: true });
  }
  return true;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const commit = process.env.VERCEL_GIT_COMMIT_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error('A full source commit is required to restore media.');
  const mediaPath = 'public/videos/salah-eddine-mimouni.mp4';
  const url = `https://media.githubusercontent.com/media/sdmimouni-prog/site-salah-mimouni/${commit}/${mediaPath}`;
  const restored = await restoreLfsFile(resolve(mediaPath), url);
  console.log(restored ? 'The Bridge video restored and SHA-256 verified.' : 'The Bridge video is available locally.');
}
