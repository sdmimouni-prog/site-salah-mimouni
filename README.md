# Salah-Eddine MIMOUNI — page d’accueil

Site personnel en Next.js App Router, TypeScript, React et Tailwind CSS 4. Production : https://site-salah-mimouni.vercel.app, reliée à la branche `codex/site-salah-mimouni` sur Vercel.

## Développement

```bash
npm install
npm run dev -- --hostname 127.0.0.1 --port 3008
npm run typecheck
npm run build
```

Aperçu : http://127.0.0.1:3008

Les dépendances de cette machine sont désormais isolées dans `.runtime/node_modules`, reliées par le lien local `node_modules`. Elles ont été réinstallées le 26 septembre pour supprimer le blocage de lecture des anciennes dépendances partagées. Sur une autre machine, installer normalement avec `npm install`.

## Modifier les contenus

- `src/content/home.ts` : textes, listes, visuels, coordonnées et liens. Une valeur `null` désactive explicitement une action.
- `src/components/` : un composant par section ; `Header.tsx` et `Gallery.tsx` portent les interactions côté client.
- `src/app/globals.css` : palette, proportions, typographie, grilles et adaptations responsive.
- `public/assets/` : extraits provisoires issus uniquement de la référence fournie.
- `reference/homepage.png` : maquette source, non utilisée comme page ou arrière-plan d’interface.
- `scripts/extract-reference-assets.mjs` : provenance et coordonnées de chaque extrait visuel.

Les textes d’interface sont de vrais éléments HTML sélectionnables. Aucun portrait, logo, livre ou événement n’a été généré. Les indications `À valider` et la notice d’aperçu rendent le caractère démonstratif explicite. La galerie contient uniquement les cinq photos réellement disponibles dans la maquette, sans simuler les douze images supplémentaires. L’année du footer est calculée automatiquement. La page est `noindex` tant que ses contenus restent provisoires.

## Contenus et fichiers à fournir

1. Portrait HD original, inscription « Tech People Impact » et signature manuscrite si souhaitée. L’actuelle signature de la citation est du texte en italique.
2. Logos originaux (SVG/PNG) de Richmedia, Hypeo AI, Lemon Mind et InTalks ; liens officiels correspondants.
3. Couvertures HD et liens des livres ; valider les textes, notamment le titre « Quand pensent les marques ? » demandé dans le brief (la couverture de la maquette emploie « Quand pensent les marques ? » en capitales).
4. Photos originales de conférence et de galerie, légendes et autorisations d’utilisation validées ; les agrandissements actuels restent basse définition.
5. Sources audio/vidéo, titres, émissions, durées et descriptions des épisodes.
6. Dates complètes, lieux et détails d’événements confirmés.
7. Validation des chiffres, de la citation et des informations biographiques.
8. CV PDF, adresse e-mail ou URL de contact, liens LinkedIn/YouTube/Instagram.

Configurer `home.contactUrl` avec `mailto:...` ou une URL réelle. Les invitations du header et du hero renvoient à la section contact. Aucun envoi n’est simulé. Configurer `audioUrl` ou `videoUrl` active le lien vers la source ; aucune lecture factice.

## Vérification

Voir `design-qa.md` et `qa/`. Le serveur doit rester ouvert pour utiliser l’aperçu local. Aucun déploiement réalisé.

## Page À propos

- Aperçu : http://127.0.0.1:3008/a-propos
- Contenus : `src/content/about.ts`.
- Composants : `src/components/about/AboutSections.tsx`.
- Styles propres à cette page : `src/app/a-propos/about.css`.
- Référence : `reference/about.png` ; extraction documentée dans `scripts/extract-about-assets.mjs`.
- Police Roboto Condensed embarquée sous licence OFL dans `public/fonts/`.
- Vérification : `design-qa-about.md`, comparaison dans `qa/about-comparison.png`.

Les détails de Formation, Expérience et Engagement se déplient sur place. Les autres entrées de navigation renvoient aux sections de l’accueil. CV et contact se configurent toujours dans `src/content/home.ts`. Fournir les originaux HD du portrait, du paysage et de la signature ; valider chronologie, citations et pourcentages.

## Nouvelle référence panoramique (26 septembre 2026)

Le menu, le hero et les actualités suivent `reference/homepage-wide.png` (2159 × 728). Les règles mesurées et les animations sont dans `src/app/homepage.css`. Au-dessus de 1600 px, la composition se met à l’échelle ; en dessous, les variantes tablette/mobile conservent des caractères lisibles et le menu repliable.

Les visuels sont extraits de la source avec `python3 scripts/extract-wide-assets.py`. Le texte de la citation a été retiré du visuel photographique et réintégré en HTML ; seule la signature manuscrite reste une image. Les autres textes, liens, boutons et titres sont également en HTML.

L’entrée combine un dévoilement du portrait et une apparition progressive des titres, liens et cartes. Les survols animent les soulignements, flèches, ombres et images. `prefers-reduced-motion: reduce` désactive animations et transitions. Les mentions de contenus à valider restent disponibles sous le contenu et dans les notes de publication.

L’aperçu de production vérifié utilise `http://127.0.0.1:3009` et se relance avec `npm run start -- --hostname 127.0.0.1 --port 3009` après compilation. Il est servi par Next.js, avec navigation et hydratation normales. La recherche de classes Tailwind est limitée à `src/`, et les types TypeScript aux dépendances du projet pour éviter d’analyser les autres projets du dossier parent.

## Contact — /contact (27 septembre 2026)

La page `/contact` utilise le header et le footer communs. Coordonnées, portrait, objets et formats sont centralisés dans `src/content/contact.ts`. Les invitations utilisent `contactLink()` et acceptent les objets `conference`, `podcast`, `litteraire` et `collaboration` dans l’URL. Les valeurs inconnues sont ignorées.

Le formulaire fait valider la demande par `/api/contact`, puis le navigateur transmet les champs validés à l’API AJAX de [FormSubmit](https://formsubmit.co/ajax-documentation), comme demandé par l’auteur. Ce chemin évite le relais d’envoi depuis l’hébergement Vercel. Le destinataire est fixé à `sd.mimouni@richmedia.ma`, et le Reply-To contient l’adresse validée du visiteur. Aucune clé Resend ni configuration SMTP n’est nécessaire pour Contact ou Newsletter. Les commandes de livres conservent leur intégration distincte.

FormSubmit demande une confirmation par email lors de la première utilisation d’une nouvelle source. La source publique `/contact` a été activée le 27 septembre 2026. Définir `SITE_URL` sur l’origine publique exacte en cas de changement de domaine. Sans cette variable, l’origine de la requête est utilisée ; le nom d’hôte du navigateur est pris en compte dans l’aperçu local.

Le bouton d’envoi est actif. Un succès n’est affiché qu’après la réponse positive de FormSubmit ; un refus, une activation manquante ou un problème réseau conservent les champs et proposent le contact direct. La mention et le lien de politique de confidentialité ont été retirés à la demande de l’auteur. L’accord pour être recontacté demeure.

Validation partagée client/serveur, honeypot, contrôle de l’origine, limite de corps de 32 Ko et limitation des validations (5 tentatives par adresse et 120 globales par heure). Ces limites sont conservées en mémoire du processus ; utiliser un stockage partagé pour un hébergement multi-instance. Le navigateur empêche les doubles clics ; FormSubmit reste un point d’entrée public avec ses propres protections, sans garantie d’idempotence. La réponse de préparation `ready` n’est jamais présentée comme une confirmation : seule l’acceptation par FormSubmit déclenche le succès. Aucun contenu de message ni coordonnées ne sont journalisés ou enregistrés dans localStorage.

Vérification sans envois réels : `node --test tests/contact.test.mjs tests/newsletter.test.mjs tests/form-submit.test.mjs`, puis `npm run build`. Les simulations injectent un transport local ; aucun appel externe n’est effectué pendant les tests automatisés. Captures et comparaison initiales dans `output/contact/`, compte rendu dans `design-qa.md`.

## Podcasts — /podcasts (27 septembre 2026)

La page utilise le header/footer communs et la maquette du 27 septembre à 16 h 58. Le catalogue est une liste de cartes horizontales avec recherche, filtre combiné et colonne de plateformes/newsletter.

- `src/content/podcasts.ts` : catalogue, champs éditoriaux, plateformes, indicateurs et citation. Les sept vidéos YouTube fournies par l’auteur constituent désormais le catalogue réel. Les trois aperçus de l’accueil et son actualité podcast en sont dérivés. Titres originaux, chaînes, dates de publication YouTube et durées proviennent des métadonnées publiques ; les descriptions sont de courts résumés éditoriaux, pas des transcriptions.
- `src/lib/podcasts.ts` : recherche sans accents, tri, sélection du dernier épisode publié et validation des sources.
- `src/components/media/MediaDialog.tsx` : lecteur commun avec le témoignage existant. Fichier audio/vidéo natif, ou vidéo YouTube visible, chargée après interaction. Pause et fermeture stoppent le média ; la fermeture rend le focus au déclencheur. Référence technique : https://developers.google.com/youtube/iframe_api_reference.
- `public/assets/platforms/SOURCES.md` : provenance des pictogrammes Simple Icons, sans dessin manuel de logos.

### Aperçu et production

L’aperçu actuel affiche le contenu réel avec `PODCASTS_PREVIEW=false`. Pour le reproduire après compilation :

```bash
PODCASTS_PREVIEW=false npm run start -- --hostname 127.0.0.1 --port 3009
```

En production, laisser cette variable absente ou à `false`. Seuls les épisodes `status: 'published'`, indicateurs vérifiés avec valeur et plateformes vérifiées avec URL spécifique seront affichés. Les URL des pages d’accueil des plateformes sont rejetées. Les chiffres d’aperçu et la citation non validés sont masqués. Le bloc newsletter reste visible. Un catalogue vide donne un état informatif, sans fausse lecture.

Les sept vidéos sont publiées et lisibles après clic. Les miniatures originales sont conservées dans `public/assets/podcasts/`, avec leur provenance dans `SOURCES.md` : quatre à 1280 × 720, deux à 640 × 480 et une à 480 × 360, sans agrandissement artificiel. Les indications 7 vidéos, 6 chaînes et 5 h 28 sont calculées sur ce catalogue. Aucun chiffre d’audience ni avis de plateforme n’est inventé. Les autres plateformes restent absentes tant qu’aucun lien spécifique n’a été fourni.

### Demandes d’inscription à la newsletter

Le bloc reste visible et recueille une adresse e-mail avec un accord explicite pour recevoir les nouveaux épisodes. `/api/newsletter` valide la demande et prépare le message, puis le navigateur le transmet par FormSubmit à `sd.mimouni@richmedia.ma`, destinataire fixe. Le message contient l’adresse, le consentement et une référence de demande ; le Reply-To permet de répondre au visiteur. Aucune campagne ni liste de diffusion automatique n’est créée.

L’envoi utilise le même transport FormSubmit que Contact, sans clé API. Le bouton « S’abonner » transmet la demande sans quitter la page. La confirmation n’apparaît qu’après acceptation du message par FormSubmit. Un lien de secours ouvre un email préparé en cas d’échec ; il nécessite alors un envoi manuel par le visiteur.

Validation partagée, contrôle d’origine, honeypot, corps limité à 4 Ko et limites en mémoire (3 validations par adresse et 120 globales par heure). La référence est incluse dans le message transmis. FormSubmit ne fournit pas de garantie d’idempotence : les doubles clics sont bloqués dans le navigateur, mais une nouvelle tentative après une interruption réseau peut produire un doublon. Aucune adresse n’est enregistrée dans localStorage ni journalisée par l’application. Vérification isolée sans e-mails réels : `node --test tests/newsletter.test.mjs tests/form-submit.test.mjs`.

### Vérification des lecteurs

Les tests fonctionnels utilisent `tests/fixtures/podcasts-player-page.tsx`, copié temporairement dans une route de QA locale puis supprimé avant la compilation finale. La vidéo The Bridge et sa piste sonore servent uniquement de supports de test ; elles ne sont jamais présentées comme des podcasts dans le catalogue livré. Cas vérifiés : démarrage après clic, pause, exclusivité, arrêt à la fermeture, Échap, focus, fichier absent, titres arabes. La route de test n’est pas livrée. La lecture du véritable épisode Maghrebnow/Gitex a été vérifiée dans le lecteur intégré : démarrage, pause, Échap, suppression de l’iframe et restitution du focus. La recherche arabe et le filtre combiné ont été vérifiés sur le catalogue réel.

36 tests automatisés et compilation TypeScript/webpack vérifiés. Aucun script de lint configuré dans le projet. Comparaisons et captures dans `output/podcasts/`, rapport dans `design-qa.md`. Aucun abonnement, message ou déploiement effectué.

## Articles — /articles (27 septembre 2026)

La page présente uniquement les publications de la section « Articles publiés » de [la page auteur Richmedia](https://www.richmedia.ma/auteurs/salah-eddine-mimouni/). Premier import : 10 publications, 4 catégories et toutes les images originales disponibles. Les recommandations sont exclues. Aucun article intégral n’est republié : titres, images et liens de lecture ouvrent la publication originale dans un nouvel onglet.

```bash
npm run import:articles
npm test
npm run build -- --webpack
```

L’import est volontairement local, indépendant des visites et du build. Il suit la pagination de la section auteur lorsqu’elle existe, déduplique les URL canoniques et actualise atomiquement `src/content/articles.generated.json`. Une page auteur ou une publication inaccessible interrompt l’import sans remplacer le dernier catalogue valide. Si seule une image échoue, l’ancien visuel local est conservé lorsqu’il existe ; sinon, le champ reste nul et un emplacement neutre apparaît. Les avertissements sont affichés par la commande. Aucun script, formulaire ou traceur Richmedia n’est exécuté ou embarqué.

- `scripts/lib/richmedia-articles.mjs` : extraction des champs vérifiables ; dates de publication distinctes des dates de modification, valeurs manquantes nulles.
- `scripts/import-articles.mjs` : récupération des pages publiques et des images, déduplication et mise à jour du catalogue.
- `src/content/articles.ts` : types et données centralisées ; `src/lib/articles.ts` : recherche sans accents, catégories, tri et sélection de la dernière publication.
- `src/components/articles/` : cartes et catalogue interactif, avec rendu initial côté serveur et recherche sur les dix publications, y compris celle à la une.
- `public/assets/articles/SOURCES.md` : provenance des images. `output/articles/import/` contient les justificatifs locaux, non servis par l’application.

La taxonomie de la page auteur fait référence : « Guide 2026 : construire un plan d'acquisition digital performant » y est classé **Guides**, même si sa page de détail affiche **Secteurs**. « SEO / GEO » reste une seule catégorie. Les descriptions proviennent des descriptions sources, sans résumé inventé. Les neuf fichiers d’images distincts servent les dix publications : Richmedia réutilise lui-même un visuel.

Le menu commun comprend désormais Articles entre À propos et Podcasts. Les réseaux du footer ne sont affichés que si une URL est renseignée. Le sitemap inclut `/articles` et utilise l’origine publique définie dans `NEXT_PUBLIC_SITE_URL` (par défaut : `https://site-salah-mimouni.vercel.app`). Le site est indexable en production ; le développement et les prévisualisations Vercel restent en `noindex`. Voir [la configuration SEO](docs/seo.md).

Validation : 46 tests réussis, compilation webpack/TypeScript réussie, navigateur à 1440/768/390 px, recherche/catégories/tri/état vide/réinitialisation/clavier/liens vérifiés. Aucun script de lint disponible. Comparaisons visuelles dans `output/articles/` et rapport dans `design-qa.md`. Aucun déploiement ni modification du site source.

## Dépôt GitHub et récupération des médias

Le site possède son propre dépôt : https://github.com/sdmimouni-prog/site-salah-mimouni. Les fichiers de `public/videos/*.mp4` sont versionnés avec [Git LFS](https://docs.github.com/en/repositories/working-with-files/managing-large-files/configuring-git-large-file-storage). Après un clone, installer Git LFS puis récupérer le média avant de lancer le site :

```bash
git lfs install
git lfs pull
npm ci
npm test
npm run build -- --webpack
npm run start -- --hostname 127.0.0.1 --port 3009
```

Les dossiers locaux `output/`, `qa/` et `tmp/`, les dépendances, la compilation et les fichiers `.env` privés sont exclus du dépôt. Les sept justificatifs publics utilisés par les tests Podcasts sont conservés dans `tests/fixtures/youtube/`, indépendamment des exports de contrôle. `.env.example` contient uniquement les noms des paramètres et des valeurs non confidentielles ; les secrets d’envoi sont à renseigner localement ou chez l’hébergeur.

### Vidéo en production

La commande `npm run build` vérifie le média The Bridge avant de compiler. Si l’intégration Git a récupéré uniquement le pointeur LFS, `scripts/restore-lfs-media.mjs` télécharge le fichier depuis le même commit du dépôt public et vérifie sa taille et son SHA-256 avant de le remplacer. Un échec bloque la compilation, plutôt que de publier une vidéo illisible. Si le fichier original est déjà présent (clone avec Git LFS activé), aucun téléchargement supplémentaire n’est effectué. Aucun secret n’est nécessaire pour cette récupération depuis ce dépôt public.
