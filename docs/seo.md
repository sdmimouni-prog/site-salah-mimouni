# SEO de l’accueil

## Métadonnées et indexation

- Titre : **Salah-Eddine MIMOUNI | Marketing digital, IA & conférences**.
- Description : **Entrepreneur, auteur et conférencier au Maroc, Salah-Eddine MIMOUNI partage ses livres, podcasts et expertises en marketing digital et intelligence artificielle.**
- URL canonique : origine publique définie par `NEXT_PUBLIC_SITE_URL`, sinon `https://site-salah-mimouni.vercel.app/`. Les URL locales ou invalides ne sont jamais utilisées comme canoniques.
- La canonique de l’accueil est définie uniquement sur sa page pour éviter de la transmettre aux autres routes.
- Open Graph et carte X/Twitter avec titre, description et image 1200 × 630.
- JSON-LD `Person`, `WebSite`, `WebPage` reliés entre eux. Aucun avis, score, chiffre non confirmé ni profil social inventé.
- HTML en français, titre H1 unique conservé, portrait d’accueil optimisé avec Next Image et préchargement responsive.
- Production : `index, follow`, aperçu large des images autorisé. `robots.txt` permet les pages publiques et référence `sitemap.xml`, avec exclusion des API.
- Développement et déploiements Vercel Preview : `noindex, nofollow` et exploration interdite dans `robots.txt`. Les protections HTTP de Vercel restent indépendantes.
- Le sitemap expose les dix routes canoniques. Les redirections courtes des livres n’y figurent pas. Les pages secondaires héritent de la même origine publique.

Pour un futur domaine personnalisé, configurer ce domaine sur Vercel, modifier `NEXT_PUBLIC_SITE_URL`, redéployer et rediriger les anciens domaines vers le domaine principal. `SITE_URL` reste indépendant et sert notamment à la validation d’origine des formulaires.

## Favicon et partage

- Source : `design/seo/favicon-source.png`.
- Favicon : `src/app/favicon.ico` (16, 32 et 48 px), PNG public de 96 px et Apple Touch Icon de 180 px.
- Image de partage : `public/assets/seo/accueil-partage.png`, réalisée avec le portrait original fourni, sans retouche du visage.
- Régénérer les exports depuis la racine avec `node scripts/generate-seo-assets.mjs`. Ce script n’est pas exécuté au build.
- Mode du monogramme : génération neuve par l’outil intégré imagegen, puis simple export des tailles navigateur.

Prompt exact :

> Use case: logo-brand. Asset type: favicon for the personal website of Salah-Eddine MIMOUNI. Create one finished square 1024x1024 favicon, not a presentation board. Exact text: SM (only the two uppercase letters S and M). A refined, distinctive tightly spaced serif monogram inspired by elegant editorial typography, with sturdy strokes so it remains highly legible at 16px and 32px. The S and M must each be clearly readable, no extra letter. Solid very deep navy background (#101344), warm white lettering (#ffffff), subtle modest corner radius on the square if possible, clean flat artwork, sharp contours, no gradient, no shadows, no texture, no decorative flourishes, no outlines, no border, no additional text or mockup. Center the letters optically and have the monogram occupy about 75% of the image width and 65% of its height with generous balanced navy padding. Single mark only, no variations. Suitable for browser tabs and Apple touch icons.

La variante retenue a ensuite été uniformisée par imagegen (mode édition, monogramme de la première génération en référence) avec ce prompt :

> Edit this favicon artwork. Keep the exact white serif SM monogram, its proportions and central position. Replace ALL the existing background, transparent areas, smoky edges and halos with one completely opaque, perfectly uniform deep navy color #101344 from edge to edge. The output should be a flat solid navy square with crisp white SM letters and absolutely nothing else. No transparent pixels anywhere, no gradient, no texture, no shadows, no illumination, no beveled corners, no frame. Uniform background is essential for small browser favicon sizes. One finished square 1024x1024 icon only.

## Validation et suivi

`node --test tests/seo.test.mjs` vérifie la résolution du domaine, la protection des prévisualisations et les relations du JSON-LD. Le build et les réponses HTML/robots/sitemap/icônes sont également contrôlés avant déploiement.

L’apparition dans Google, le titre effectivement affiché et les résultats enrichis ne sont pas garantis par ces balises. Après déploiement, la propriété Search Console peut être vérifiée et le sitemap soumis par le propriétaire du domaine ; aucune vérification Search Console n’est inventée ni ajoutée.

Références officielles :

- [Titres des résultats Google](https://developers.google.com/search/docs/appearance/title-link)
- [Descriptions et extraits](https://developers.google.com/search/docs/appearance/snippet)
- [Directives robots](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Favicon dans les résultats](https://developers.google.com/search/docs/appearance/favicon-in-search)
- [Nom du site](https://developers.google.com/search/docs/appearance/site-names)
- [Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
