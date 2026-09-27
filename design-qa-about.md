# QA — Page À propos

final result: passed

Périmètre : intégration de la maquette fournie dans le site existant, avec les visuels provisoires et les contenus à valider. Aucun déploiement.

## Sources et comparaison

- Source : `reference/about.png`, 1024 × 1536 pixels.
- Route : `http://127.0.0.1:3008/a-propos`.
- Comparaison côte à côte ouverte et examinée : `qa/about-comparison.png` (2048 × 1630), source à gauche, rendu à droite.
- Comparaison du hero : `qa/about-hero-comparison.png` (2048 × 555).
- Rendu complet : `qa/about-full.png` (1024 × 1630), assemblé à partir de deux captures du navigateur à 1024 × 900. Capture supérieure à scrollY=0, inférieure à scrollY=730 ; aucun redimensionnement.
- Captures supplémentaires : `qa/about-desktop-1440.png`, `qa/about-tablet-768.png`, `qa/about-mobile-390.png`.
- Viewports CSS contrôlés : 1440 × 1000, 1024 × 900, 768 × 1024 et 390 × 844. devicePixelRatio=1.
- État de référence : menu fermé, cartes repliées, thème clair. L’export du haut a été recapturé après suppression de l’ancre de contact pour garantir scrollY=0.

## Corrections et constats

1. [P2 corrigé] Cartes de résumé de hauteurs différentes. Police sans-serif affinée et corps corrigé pour conserver les descriptions en deux lignes sur desktop. Espacement de la frise rapproché de la référence. Captures finales : `about-comparison.png`.
2. [P2 corrigé] Portrait tronqué à l’épaule. Extraction photographique élargie, cadrage conservant le visage et l’épaule dans un seul visuel, exclusion par découpe CSS de la citation raster de la source ; la citation affichée est du vrai texte HTML. Version resserrée sans texte pour mobile/tablette. Preuve : `about-hero-comparison.png`.
3. Police Roboto Condensed servie localement, avec licence OFL, pour se rapprocher du texte courant de la maquette. Times New Roman conservée pour les titres. Titres et proportions contrôlés dans la comparaison du hero.
4. Les cartes Formation, Expérience et Engagement sont de vrais éléments details/summary, utilisables au clavier. Aucun lien de détail sans destination.

## Surfaces de fidélité

- Typographie : serif pour titres/citations, sans-serif condensée pour contenus, Arial pour sous-titre. H1 sur deux lignes. Textes HTML sélectionnables ; les seuls mots conservés dans une image sont la signature et l’inscription manuscrite du bandeau.
- Composition : hero texte/portrait/citation, bande de trois valeurs, neuf repères chronologiques, trois cartes, trois colonnes personnelles, bandeau photographique et footer. Recomposition tablette/mobile sans débordement.
- Couleurs : blanc, bleu nuit, indigo, gris lavande très clair ; détails corail/rose du fond, jauges indigo/violet et bandeau bleu.
- Images : exclusivement des extraits de la nouvelle maquette. Aucun visage, paysage ou logo généré. La photo source HD reste nécessaire pour les contours, le fond complet et la netteté finale du hero. Le fond photo du bandeau est recadré afin d’exclure les textes et boutons d’interface de la maquette.
- Contenu : dates, expériences, citations et pourcentages identifiés comme à valider ; liens CV/contact désactivés tant que leurs sources restent nulles. Les valeurs de jauge sont de vrais éléments meter avec noms accessibles. Footer à l’année courante.

La page mesure 1630 px contre 1536 px pour la maquette à largeur 1024 : différence notamment liée aux indications de disponibilité, à la notice de démonstration et au volet de contenus manquants. Le fond du hero reste une approximation provisoire en attente de la photo originale ; ce n’est pas une validation photographique pixel par pixel.

## Contrôles effectués

- Build Next.js : succès, `/` et `/a-propos` pré-rendus.
- TypeScript : `npm run typecheck`, succès.
- Largeurs 1440, 768 et 390 : scrollWidth égal à innerWidth ; aucun débordement horizontal.
- Images : aucune ressource cassée après actualisation des nouveaux fichiers.
- Liens : aucun href vide ; Accueil → À propos et retour testés réellement dans le navigateur.
- État actif À propos : aria-current=page dans le header/footer.
- Menu mobile : ouverture, visibilité, fermeture Échap et retour du focus au déclencheur vérifiés.
- Formation : ouverture/fermeture par Entrée et visibilité des détails vérifiées.
- Expérience et Engagement : ouverture/fermeture et contenus visibles vérifiés.
- Ancre Me contacter : navigation vers le bandeau de la même page vérifiée.
- Console : aucune erreur ni avertissement lors du contrôle final.

## Éléments à fournir

Portrait et fond HD originaux, photographie du bandeau, signature originale, CV PDF, coordonnées de contact ; validation de la chronologie, des citations et des pourcentages. Les données se modifient dans `src/content/about.ts` ; CV et contact restent partagés depuis `src/content/home.ts`.

Aucun P0/P1/P2 restant dans le périmètre de l’aperçu avec assets provisoires. Remplacement des originaux et réglages photographiques fins à effectuer lorsqu’ils seront disponibles. Pas d’audit multi-navigateurs ni de test complet avec lecteur d’écran.
