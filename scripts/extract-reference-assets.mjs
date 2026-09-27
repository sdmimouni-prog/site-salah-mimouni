// Extraction des seuls visuels, sans textes d’interface ni composants rasterisés.
import sharp from 'sharp';
const assets = {
 'social-linkedin':[773,1405,15,15],
 'social-youtube':[798,1405,16,15],
 'social-instagram':[825,1405,15,15],
 'portrait':[435,51,391,402],
 'tech-people-impact':[865,66,143,165],
 'podcast-feature':[74,504,111,107],
 'conference-news':[396,503,116,110],
 'conference':[58,967,140,148],
 'book-like':[720,498,92,119],
 'book-pauvre':[54,1168,65,110],
 'book-marques':[211,1168,71,110],
 'logo-richmedia':[71,856,46,49],
 'logo-hypeo':[316,854,48,48],
 'logo-lemon':[569,854,51,52],
 'logo-intalks':[817,854,42,48],
 'episode-1':[692,967,53,40],
 'episode-2':[692,1018,53,42],
 'episode-3':[692,1073,53,43],
 'gallery-1':[755,1161,89,57],
 'gallery-2':[849,1161,89,57],
 'gallery-3':[943,1161,93,57],
 'gallery-4':[755,1223,89,61],
 'gallery-5':[849,1223,89,61],
};
for (const [name,[left,top,width,height]] of Object.entries(assets)) {
 await sharp('reference/homepage.png').extract({left,top,width,height}).webp({quality:95}).toFile(`public/assets/${name}.webp`);
}
console.log(`${Object.keys(assets).length} extraits enregistrés.`);
