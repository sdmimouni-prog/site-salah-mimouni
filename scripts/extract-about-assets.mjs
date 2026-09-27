import sharp from 'sharp';
// Extraits photographiques de la maquette, sans textes ni contrôles d’interface.
const assets = {
 'about-portrait': [469,55,316,411],
 'about-portrait-wide': [469,55,381,411],
 'about-signature': [827,305,150,37],
 'about-mountains': [350,1241,674,199],
};
for (const [name,[left,top,width,height]] of Object.entries(assets)) {
 await sharp('reference/about.png').extract({left,top,width,height}).webp({quality:95}).toFile(`public/assets/${name}.webp`);
}
