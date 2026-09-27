"""Source-only assets from homepage-wide.png (2159 x 728). UI copy stays HTML."""
from PIL import Image
from pathlib import Path
root=Path(__file__).resolve().parents[1]
im=Image.open(root/'reference/homepage-wide.png').convert('RGBA')
out=root/'public/assets'
# Retain the source photographic decor and card surface, remove all quote UI ink.
photo=im.crop((955,64,2159,535))
for y in range(331,506):
    # The clean left margin gives the original card surface on this row.
    surface=im.getpixel((1597,y))
    for x in range(1598,1856):
        photo.putpixel((x-955,y-64),surface)
photo.save(out/'hero-wide-scene.webp',lossless=True)
crops={
 'hero-wide-ribbon':(0,0,195,535),
 'hero-wide-signature':(1648,461,1846,498),
 'hero-wide-portrait':(1024,76,1585,535),
 'hero-wide-handwriting':(1580,85,1772,306),
 'brand-monogram':(323,8,393,59),
 'wide-podcast':(333,589,507,715),
 'wide-conference':(843,589,1018,715),
 'wide-book':(1387,583,1500,720),
}
for name,box in crops.items():
    asset=im.crop(box)
    if name in ('hero-wide-signature','hero-wide-handwriting'):
        pixels=asset.load()
        for y in range(asset.height):
            for x in range(asset.width):
                r,g,b,a=pixels[x,y]
                alpha=round(255*(1-min(1,max(0,(min(r,g,b)-160)/70))))
                if name=='hero-wide-handwriting':
                    alpha=round(255*min(1,max(0,(b-r-25)/50))*min(1,max(0,(220-r)/100)))
                pixels[x,y]=(r,g,b,alpha)
    asset.save(out/(name+'.webp'),lossless=True)
print('Saved',len(crops)+1,'source assets')
