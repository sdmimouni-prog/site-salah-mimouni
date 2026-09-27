import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { ImageResponse } from 'next/og.js';
import { createElement as el } from 'react';
import sharp from 'sharp';

// Export the generated SM monogram at native browser sizes, without redrawing it.
const monogram = await readFile('design/seo/favicon-source.png');
await mkdir('public/assets/seo', { recursive: true });
for (const [size, path] of [[96, 'public/favicon-96x96.png'], [180, 'public/apple-touch-icon.png']]) {
  await sharp(monogram).resize(size, size).png().toFile(path);
}

// ICO stores three PNG frames for sharp rendering in classic and high-DPI tabs.
const sizes = [16, 32, 48];
const frames = await Promise.all(sizes.map(size => sharp(monogram).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((frame, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(frame.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await writeFile('src/app/favicon.ico', Buffer.concat([header, ...frames]));

// Original supplied portrait, placed in a graphic layout; no face retouching.
const portrait = await readFile('public/assets/photos/portrait.jpeg');
const font = await readFile('public/fonts/roboto-condensed-regular.ttf');
const bold = await readFile('public/fonts/roboto-condensed-bold.ttf');
const row = { display: 'flex' };
const image = new ImageResponse(
  el('div', {
    style: { ...row, width: '100%', height: '100%', background: '#f8f7ff', color: '#101344', fontFamily: 'Roboto Condensed', padding: '52px 56px', position: 'relative' },
  },
  el('div', { style: { ...row, flexDirection: 'column', width: 686, paddingRight: 40 } },
    el('div', { style: { ...row, alignItems: 'center', marginBottom: 48 } },
      el('img', { src: `data:image/png;base64,${monogram.toString('base64')}`, width: 66, height: 66, style: { borderRadius: 14, marginRight: 18 } }),
      el('span', { style: { fontSize: 23, color: '#4b4299' } }, 'Entrepreneur · Auteur · Conférencier')),
    el('div', { style: { ...row, flexDirection: 'column', fontSize: 78, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 } },
      el('span', {}, 'Salah-Eddine'), el('span', {}, 'MIMOUNI')),
    el('div', { style: { ...row, width: 66, height: 5, background: '#5138ed', margin: '30px 0' } }),
    el('div', { style: { ...row, fontSize: 32, maxWidth: 600, lineHeight: 1.3 } }, 'Marketing digital & intelligence artificielle'),
    el('div', { style: { ...row, fontSize: 23, color: '#6f7194', marginTop: 30 } }, 'Livres · Podcasts · Conférences')),
  el('img', { src: `data:image/jpeg;base64,${portrait.toString('base64')}`, width: 398, height: 526, style: { borderRadius: 22, objectFit: 'cover' } }),
  el('div', { style: { position: 'absolute', bottom: 0, left: 0, width: '100%', height: 9, background: '#5138ed' } })),
  { width: 1200, height: 630, fonts: [{ name: 'Roboto Condensed', data: font, weight: 400 }, { name: 'Roboto Condensed', data: bold, weight: 700 }] },
);
await writeFile('public/assets/seo/accueil-partage.png', Buffer.from(await image.arrayBuffer()));
console.log('Favicon ICO + PNG 96/180 px and homepage share image 1200×630 exported.');
