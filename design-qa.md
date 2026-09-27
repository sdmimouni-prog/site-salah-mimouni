# Contrôle visuel — Quand les marques pensent et expertise option 3

Date : 27 septembre 2026.

## Sources et preuves
- Landing : `/Users/salaheddinemimouni/Downloads/ChatGPT Image Sep 27, 2026, 11_31_19 AM.png` (1800 × 4971).
- Expertise : `reference/expertise-option-3.png` (1866 × 843), troisième image effectivement affichée dans la série précédente, extraite de son résultat original.
- URL : http://127.0.0.1:3009/livres/quand-les-marques-pensent
- URL expertise : http://127.0.0.1:3009/#parcours
- Captures : `output/marques/desktop-hero-final.png`, `desktop-contents.png`, `desktop-order.png` (1440 × 1000), `tablet-hero.png`, `tablet-contents.png`, `tablet-author.png` (768 × 1000), `mobile-hero.png`, `mobile-contents.png`, `mobile-form.png` (390 × 844), `expertise-desktop-final.png`, `expertise-mobile.png`.
- Comparaison : référence complète et capture finale du hero ouvertes dans le même appel, puis référence expertise et capture finale réunies dans un second appel. Contrôle de la page longue par régions capturées, sans utiliser une image intégrale comme interface. Normalisation par largeur CSS ; captures à densité 1, reference desktop plus large que les viewports testés. Aucun modèle mobile fourni : adaptations évaluées pour lisibilité et fonctionnement, pas comme une correspondance pixel à pixel.

## Surfaces de fidélité
- Typographie : grands titres Georgia, graisse normale, mot marques et accents éditoriaux en italique doré ; corps Arial. Tailles de lecture adaptées au viewport, titre hero sur trois lignes. Expertise : sérif forte, grand compteur 05 en contour et filets indigo.
- Espacements et composition : page beige en dix sections pleine largeur, hero en deux colonnes, trois actes avec panneau central anthracite, deux citations, bande sombre, portrait/biographie/éditeur, commande en deux colonnes, FAQ et footer. Expertise asymétrique à colonne gauche et grille droite, dernière entrée sur toute la largeur.
- Couleurs : ivoire, sable, anthracite et doré pour la landing ; palette indigo du site conservée uniquement pour l’expertise demandée séparément. Styles isolés par CSS Modules.
- Assets : couverture avant extraite de la jaquette originale sans redessiner son contenu, logo officiel extrait du même fichier avec retrait du fond, motif de réseau repris du graphisme original, portrait réel intact. Pas de photographie ou couverture générée. Perspective et socle constitués par la mise en page. Différence attendue : le motif utilise le réseau de la couverture, et non les arcs décoratifs exacts de la maquette.
- Contenu : introduction et biographie fondées sur les DOCX locaux. Les deux citations contrôlées dans les chapitres 1 et 4 (apostrophes typographiques normalisées). Sommaire fourni par l’utilisateur. Aucun manuscrit publié, avis inventé ou prix supposé. Prix et modalités indépendants de l’autre livre et laissés à confirmer.

## Comparaison et corrections
1. Premier rendu : fond rectangulaire beige autour du logo recadré, moins intégré que la référence. Retrait du fond et nouvelle capture desktop finale : logo intégré au fond ivoire.
2. Expertise : retour à la ligne excessif de Fondateur & co-fondateur à 1440 px. Ajustement ciblé de taille et nouvelle capture `expertise-desktop-final.png`, ligne complète sur desktop ; retour normal sur mobile.
3. Contrôle responsive : largeur du document égale au viewport à 1440, 768 et 390 ; aucun débordement. Les trois actes s’empilent sur mobile. Formulaire mobile en une colonne, champs et erreurs accessibles.

## Vérifications effectuées
- Compilation Next.js et TypeScript réussie après les derniers changements.
- 8 tests Node réussis : 4 pour cette landing (identifiant dédié, e-mail facultatif, validation, limites, quantité, configuration sans prix et structure éditoriale), 4 existants de L’ancien pauvre.
- Menu tablette/mobile ouvert, fermé par Échap, lien Sommaire activé et menu refermé ; ancres et FAQ fonctionnelles.
- Formulaire vide : cinq erreurs attendues et focus au premier champ invalide. Formulaire valide sans e-mail : message explicite « aucune demande envoyée ni enregistrée ». Coordonnées réinitialisées après navigation/rechargement. Verrou synchrone et fieldset désactivé pendant la vérification empêchent les doubles soumissions.
- Lecture des extraits via ancre, FAQ dépliée dans le navigateur.
- Aucune image cassée détectée sur la version desktop finale.
- Les fiches Livres existantes pointent déjà vers `/livres/quand-les-marques-pensent` ; route statique dédiée substituée à son ancien rendu générique.
- Navigation directe de la landing, métadonnées titre/image/canonical renseignées.
- Pas d’inspection exhaustive de console, ni de test d’envoi email (mode démonstration et service non configuré).

## Périmètre et éléments restant à fournir
La page L’ancien pauvre n’a pas été modifiée. Le changement de l’accueil se limite au bloc Parcours & expertises, demandé séparément par le choix de la proposition 3. Aucun déploiement.

Pour activer les commandes : prix, livraison, moyens de paiement et configuration d’envoi email. Les avis restent « à venir ». Un logo source vectoriel indépendant serait utile pour les grands formats ; le logo utilisé vient bien de la jaquette officielle.

final result: passed

## Contact card — 27 September 2026

Reference: user attachment Screenshot 2026-09-27 at 11.05.09.png (PJ2).
Replaced the shallow homepage banner with an inset dark card: fine border, purple edge illumination, sans-serif heading, eyebrow rule, muted body and purple CTA beneath the copy. The supplied studio photograph replaces the reference's unrelated report mockup. Contact wording and recipient are preserved.

Verified visually at 1440×900 and 390×844; screenshots: output/contact/desktop.png and output/contact/mobile.png. No horizontal overflow at either size. Original photograph loads at 5351px and retains its aspect ratio. CTA targets mailto:sd.mimouni@richmedia.ma. Keyboard focus and reduced-motion styles provided. Production build and TypeScript passed. About-page contact styling remains isolated.

final result: passed

## Pour un like de plus — 27 September 2026

Source: /Users/salaheddinemimouni/Downloads/ChatGPT Image Sep 27, 2026, 12_23_04 PM.png and user instructions in attachment 13ac40c1-3380-4377-933b-c6ff0bb35277/pasted-text.txt.

Existing route preserved through a dedicated rendering branch; metadata and catalogue unchanged. Styles isolated in Influence.module.css. Visual comparison completed for navy/fuchsia hero, original unaltered cover with surrounding book thickness, alternating full-width sections, three editorial cards, original author portrait, white order form and dark related-books/footer. Original copy preserved; second editorial paragraphs are accessible disclosures to retain compact proportions. No invented author quote or commercial promises. Reference's generated portrait/covers intentionally replaced by originals.

Browser checks: 1440, 768, 390 pixels; no horizontal overflow or broken images. Mobile menu opens, lists six agreed destinations and closes with Escape; CTA reaches order section. FAQ and editorial disclosures expand. Empty form focuses required name; valid demo submission explicitly reports no transmission. Two copies updates subtotal to 290 Dhs. Console error log empty. Other book routes load with original design and required-field validations still active. Screenshots in output/influence/ (desktop.png, tablet.png, mobile-form.png, editorial-author.png).

Server validation covers delivery address for this book, quantities, consent, spoofed totals, fixed recipient and provider failures. Existing transactional email service preserved; demo mode is explicitly derived from missing server configuration. 15 tests passed, production build and TypeScript passed. Live email delivery not tested because Resend key/sender are not configured; delivery fees, deadlines and payment method remain unconfirmed.

final result: passed

## Main library /livres — 27 September 2026

Reference: ChatGPT Image Sep 27, 2026, 03_55_39 PM.png, with explicit implementation brief in attachment 2527507d-8b71-46e8-bca4-b86133d2365b/pasted-text.txt.

Created /livres using shared Header/Footer, existing fonts and buttons, with scoped CSS. Catalogue assets and verified quotations are imported from existing data. White/lavender layout, three independent hero covers, editorial topic strip, equal-height cards, two exact excerpts, original author portrait, official publisher logo and indigo contact band visually compared to the reference. Main navigation now targets /livres. No individual landing or form modified in this task, no prices or payment UI on the catalogue.

Verified at 1440×1000, 768×1000 and 390×844: no horizontal overflow, no broken images; all three hero books remain visible on mobile; menu opens and closes via Escape. Desktop cards have equal 652px heights with aligned bottom actions (hover deliberately lifts a card by 5px). All three Discover links and all three Commander links were clicked: correct routes and existing #commander form confirmed. No browser console errors. No form in /livres DOM. Build/TypeScript and existing 15 tests passed. Evidence: output/library/desktop-hero.png, desktop-cards.png, desktop-footer.png, tablet.png, mobile.png.

Known source-asset difference, disclosed to user: no original black L’ancien pauvre cover is available. The actual supplied Entre deux vols cover is used instead, without inventing artwork. Other covers and publisher logo are original. Social links without configured URLs are omitted on this page. No deployment.

final result: passed

## Shared homepage header and footer — 27 September 2026

Moved the existing homepage Header/Footer into the root layout through SiteChrome. Removed page-level copies and book-specific headers/footers. The shared components now sit outside themed content wrappers, so library/book styles cannot override their appearance. Active menu is derived from the pathname; all book routes select Livres. Invitez-moi targets /#contact consistently. Existing content, forms and metadata remain intact.

Browser audit of /, /a-propos, /livres, /livres/lancien-pauvre, /livres/quand-les-marques-pensent, /livres/pour-un-like-de-plus and /livres/entre-deux-vols: exactly one header and one footer per page, identical menu labels/destinations, identical background/font colors and sizing. At 1440px every header is 124px tall with 20px navigation text and every footer is 1360px wide / 130px tall. Original white header/footer also visually inspected against the dark influence landing. At 390px every header is 96px tall; six-item menu opens on every page and Escape closes it. No horizontal overflow. All book #commander forms still present. Existing 15 tests pass; production webpack build and TypeScript pass (Turbopack was interrupted after stalling in the restricted environment).

final result: passed

## Événements /evenements — 27 September 2026

**Source and evidence**
- Source visual: `/Users/salaheddinemimouni/Downloads/ChatGPT Image Sep 27, 2026, 04_19_38 PM.png` (2160 × 3746 pixels). Implementation brief: attachment `9a0f0d18-725a-45a7-8096-6395c157d3c9/pasted-text.txt`.
- Rendered implementation: `http://127.0.0.1:3009/evenements` in the in-app browser.
- Full composition comparison: `output/events/comparison-full.png`. Reference and implementation normalized to 720px wide and placed together in one comparison image. Implementation assembled from verified 1440 × 1000 viewport captures at observed scroll offsets 0, 977.5 and 1649; stitched size 1440 × 2649. The automatic full-page capture produced duplicate strips and was discarded, not used as evidence.
- Focused cards comparison: `output/events/comparison-cards.png`, source above implementation, both normalized to a 1280px content frame. Final implementation source is `desktop-cards-final.png` (1440 × 1100 CSS/pixel capture), card bounds 1280 × 487.5px, equal heights across all three cards.
- Additional evidence in `output/events/`: desktop-top.png, desktop-gallery.png, tablet-hero.png, tablet-events.png, mobile-hero.png, mobile-events.png, mobile-lightbox.png. Tablet 768 × 1024; mobile 390 × 844. Capture pixels correspond 1:1 to these CSS viewport sizes.
- State: all filters selected for composition; alternate category and modal states verified separately. No confirmed upcoming events; informative agenda visible. All cards and gallery imagery explicitly illustrative.

**Findings and comparison history**
1. Initial P2: portrait thumbnail cropped the top of the head. Changed original portrait object-position from 27% to 5%. The final focused comparison and gallery screenshot show the complete head, with no deformation or resynthesis.
2. Initial P2: small metadata and note colors were too faint. Darkened scoped text tokens while preserving the lavender/navy palette. Final desktop and mobile captures confirm readable date/location/illustration labels.
3. Mobile polish: kept the French colon attached to “rencontres littéraires” with a non-breaking space.
4. Re-captured and compared the full composition and cards after these changes. No remaining actionable P0/P1/P2 findings.

**Required fidelity surfaces**
- Typography: existing Times/Arial site fonts reused; navy serif headings, four-line hero with violet italic final lines, uppercase spaced eyebrows and sans-serif UI. Shared enlarged homepage header remains unchanged in appearance, as explicitly required. Card titles wrap naturally without truncation.
- Layout: 1280px centered frame; full-width lavender/white/gradient backgrounds; two-column hero and agenda; three equal desktop cards; asymmetric three-image gallery; final CTA. Section rhythm follows the approved source. Extra overall height versus normalized source comes mainly from the required larger shared header/footer. Tablet stacks hero/agenda and uses a two-column card layout; mobile stacks cards/gallery with full-width primary CTAs.
- Colors: navy, indigo, pale lavender, soft coral CTA edge, discreet borders, small radii and subtle hover elevation. Focus states visible; scoped reduced-motion CSS disables animation and transforms.
- Assets: intentionally use original high-resolution studio photograph, original portrait and existing book covers rather than the old generated low-resolution scene images. All are marked illustrative; the studio caption explicitly says it is not a conference photograph. Original Entre deux vols cover remains in use because the black L’ancien pauvre original is not available. Next Image serves responsive optimized images; originals are not altered.
- Content: all requested sections and copy present; central data in `src/content/events.ts`, including typed future agenda and placeholder events. No invented dates, venues, organizers, partners, registrations or real-event claims. Native HTML/selectable text throughout.

**Functional and accessibility verification**
- Desktop filters: Tous = 3 cards; each of the three categories = 1 corresponding card; visible pressed state and live result count verified. Empty category state implemented, but not exercised in-browser because every supplied category contains a sample.
- Event details: correct title and explicit example notice, dates/locations pending. Close button receives initial focus, Shift+Tab wraps to final link, Escape closes and returns focus to the invoking button; body scroll locked while open.
- Gallery: open via Explorer and thumbnails; previous/next buttons and keyboard arrows cycle all three visuals and wrap; Escape closes and restores invoking focus. Initial close-button focus and mobile 366px-wide dialog verified. All content and controls fit 390px viewport.
- Menu opens at 768px and 390px, contains the exact six agreed destinations, and closes with Escape. Events is active. Exactly one root-level shared header/footer.
- Primary hero anchor reaches event section. Contact CTA clicked and verified: `/contact` redirects to the existing `/#contact` block. No new contact page design. Shared Events navigation now targets `/evenements`; shared Invitez-moi uses the requested `/contact` route.
- No horizontal overflow at 1440, 768 or 390px. Visible images loaded successfully. Browser error log empty after interaction checks.
- Production webpack build and TypeScript passed. Existing 15 tests passed. No deployment, no form submission or external message sent. Local server remains running on port 3009.

**Content still needed / non-blocking differences**
Confirmed event titles, dates, locations, formats/statuses and registration links; identified event photographs/captions and any additional gallery images. Existing global social links are still unconfigured (shared footer keeps its existing disabled state). Production domain can be supplied via NEXT_PUBLIC_SITE_URL; local Open Graph URL points to port 3009 during this preview.

**Implementation checklist**
- [x] Approved composition integrated using shared chrome and scoped CSS.
- [x] Central event data, agenda empty state, filters, details and accessible gallery.
- [x] Responsive and interaction checks, final visual comparison, build/tests.
- [x] Preview left open on /evenements; no deployment.

final result: passed

## Contact /contact — 27 September 2026

**Source and comparison evidence**
- Approved source: `/Users/salaheddinemimouni/Downloads/ChatGPT Image Sep 27, 2026, 04_45_25 PM.png` (2160 × 2072). Explicit brief: attachment `56794584-4499-4cab-8f6e-a50034edbbb3/pasted-text.txt`.
- Final local implementation: `http://127.0.0.1:3009/contact`.
- `output/contact/comparison-final.png`: source left, implementation right, both normalized to 720px width. Final implementation assembled from 1440 × 1000 viewport captures with observed offsets 0 and 635; full document 1440 × 1635. No unreliable automatic full-page screenshot used.
- Additional evidence: desktop-top-final.png, desktop-bottom-final.png, tablet-top-final.png, tablet-form.png, mobile-top.png, mobile-form.png and mobile-direct-footer.png. Viewports: 1440 × 1000, 768 × 1024 and 390 × 844.
- Form state captures: desktop-errors.png, desktop-sending.png, desktop-provider-error.png, desktop-success.png. Tests use an isolated local server with intercepted Resend calls; no real email or network call to the provider.

**Comparison findings**
- Initial P2: removing the author name line break at tablet width joined two words. Added an explicit space; final DOM reads “Salah Eddine Mimouni”.
- Initial P2: mobile author eyebrow/signature/topics were too small; enlarged them while keeping the introduction compact. Mobile form input text uses 16px; all fields fit their column.
- Rechecked final desktop source/render comparison and mobile screenshots after these fixes. No remaining actionable P0/P1/P2 layout or interaction defects found.

**Fidelity surfaces**
- Typography: site serif headings, navy body title, violet italic “conversation.”, uppercase spaced eyebrows and existing sans-serif text. Exact required text and line composition retained.
- Layout: 1280px content frame, white/lavender full-width background, 2-column introduction/form aligned at the top, white direct-contact section, indigo closing band. Stacked introduction and form at tablet; single-column fields and contacts at mobile. No added map or section.
- Color/surface: discreet lavender borders, white rounded form, subtle shadow, indigo/violet primary action, violet contact icons and fine separators. Entry animation and hover/focus treatment, with reduced-motion override.
- Assets: existing original portrait reused unchanged; no face modification, new portrait, logo or placeholder artwork. Responsive Next Image loads successfully.
- Content/chrome: one shared homepage header/footer, exact six destinations, Contact active twice (header/footer). Shared enlarged header and existing footer intentionally differ from the smaller mockup. Extra form height comes from the explicitly requested unavailable-service notice. No invented privacy document or legal/social URLs; existing disabled social indicators preserved in the common footer.

**Functional verification**
- Desktop, tablet and mobile: no horizontal overflow; images loaded. Header and footer present exactly once. Tablet/mobile menu opens and closes with Escape. Contact active. Invitez-moi on this page anchors to #formulaire.
- Initial subject blank. Verified all four URL presets: conference/podcast/litteraire/collaboration. Unknown values leave the select blank. Conference and literary requests expose optional date, location and format; switching to podcast removes and clears them. Native date accepts a valid keyboard-entered date. Mobile international phone/location/format fields remain usable.
- Empty simulated submission shows five individual errors and focuses the first invalid field. Mobile invalid email also shows a field-specific accessible error on blur. Inputs have labels, aria-invalid/describedby; feedback uses a live status region. Consent starts unchecked.
- Sending simulation shows busy state and disables the fieldset/button. First provider attempt fails: explicit error, no success and all entered fields retained. Retry receives provider acceptance: success then becomes visible and fields stay disabled until “Écrire un autre message”. Explicit reset clears the form and focuses name.
- Without credentials, actual page shows unavailable notice and disables submission; direct email, international telephone and WhatsApp hrefs verified. Direct-coordinate anchor reaches the correct section. No real email sent or external messaging app opened.
- No browser console errors. No localStorage or PII logging. Server rejects malformed fields, unsupported enums, invalid dates, bad origins/types, oversized bodies and honeypot submissions. Fixed recipient cannot be changed by a payload. Concurrent same-ID requests send once; changed data with same ID is rejected. Provider failures remain retryable. Global/address rate limits and expiry verified.
- 27 tests pass (12 contact tests plus all 15 existing book tests). Final production webpack build and TypeScript pass. Book page bodies and order handlers unchanged. No deployment. Isolated mock server stopped; actual preview remains on 3009.

**Configuration still needed**
RESEND_API_KEY and an authorized CONTACT_FROM (or existing BOOK_ORDERS_FROM); SITE_URL for the real public origin. These are absent locally, so delivery is intentionally unavailable. Privacy text and its published URL are also missing. The limiter is process-local and is documented for adaptation if deployment uses multiple instances. Recipient is already fixed to sd.mimouni@richmedia.ma.

final result: passed

## Podcasts /podcasts — 27 September 2026

**Source and comparison evidence**
- Approved reference: `/Users/salaheddinemimouni/Downloads/ChatGPT Image Sep 27, 2026, 04_58_17 PM.png` (1024 × 1536). Implementation brief: attachment `96de468e-ad42-4a4b-bae8-80e38d66a1d3/pasted-text.txt`.
- Local implementation: `http://127.0.0.1:3009/podcasts`, with `PODCASTS_PREVIEW=true`. Initial state: no query, all themes, four demonstration cards, unavailable source/registration actions explicitly indicated.
- Full source/render comparison: `output/podcasts/comparison-full.png`, both normalized to 720px wide. Final implementation is 1440 × 2262 pixels, assembled from 1440 × 1000 viewport screenshots at observed document offsets 0, 758 and 1262. No automatic full-page screenshot used. CSS viewport and screenshot pixels correspond 1:1.
- Focused list/sidebar comparison: `output/podcasts/comparison-cards.png`, source above implementation, normalized to the same 1280px content width. Shows first two cards, typography, thumbnails, spacing, playback actions and platform rows. Editorial fields intentionally differ from mockup examples.
- Additional captures: desktop-top-final.png, desktop-catalogue-final.png, desktop-bottom-final.png; tablet-top.png/tablet-catalogue.png at 768 × 1024; mobile-top.png/mobile-catalogue.png/mobile-newsletter.png at 390 × 844.
- Playback evidence: qa-video.png, qa-audio.png, qa-media-error.png. Those use a clearly labeled temporary fixture with the supplied local testimonial file, not a fabricated podcast source. The fixture route was removed and the app rebuilt before handoff.

**Findings and iteration history**
1. P2: initial hero title was visibly smaller and the studio panel shorter than the reference. Increased desktop title from 64px to 74px and studio height from 445px to 480px. Removed the extra boxed background from the decorative inscription. The final combined full comparison verifies corrected proportions and the two-line title. Original photograph differs intentionally from the generated source scene.
2. P2: revealing all episodes removed the button and dropped keyboard focus to the body. Focus now moves to the first newly revealed article; verified on tablet (five cards, hidden show-more control, active element equals the fifth article ID).
3. Error-state refinement: native playback failures now distinguish a browser autoplay block from an unavailable file. No playing state is claimed on failure; a source link remains available.
4. Production-only layout: a lone newsletter panel spans the sidebar width when unverified platforms/citation are hidden. Verified production mode has no demo cards, sample statistics or platform section and no overflow at mobile width.
5. Final full and focused comparisons reviewed after visual fixes. No remaining actionable P0/P1/P2 findings.

**Required fidelity surfaces**
- Typography: shared site fonts; large navy serif title with violet italic second line; spaced uppercase eyebrows; serif card titles and sans-serif controls/descriptions. Text is selectable HTML. Arabic headings use local `dir=auto`, not a page-wide RTL setting. Existing enlarged shared header is intentionally preserved.
- Layout/rhythm: centered 1280px frame, white/lavender hero, two desktop columns with a floating player card, editorial theme strip, horizontal episode cards occupying about 70% and sidebar about 30%. Four cards initially, additional records revealed in-place; white space, thin borders and compact rounded corners follow the approved layout. Tablet stacks hero and catalogue/sidebar; mobile stacks filter controls and makes episode cards compact.
- Color/tokens: navy, indigo/violet, pale lavender, discreet borders/shadows, coral edge in the contact gradient. Disabled actions are visibly muted. Hover and keyboard focus styles present; reduced-motion disables decorative animation and transforms. No fake progress or animated waveforms.
- Assets: original supplied studio photo and portraits, unchanged faces. Existing decorative signature reused. No image-generated replacement and no fake guest portrait. Platform pictograms are original Simple Icons assets, with provenance in public/assets/platforms/SOURCES.md. Current Deezer glyph differs from the older reference icon. Next Image reserves image dimensions; all images loaded.
- Copy/data: existing three homepage episode records and their source fields retained by reference; unverified durations discarded from the podcast metadata. Two additional preview cards explicitly labeled demonstration, including the existing homepage news item. No invented dates, guest identity, host/guest role, episode number or duration. Original mockup statistics and quote only appear with approval-pending labels in preview, absent by default in production. Hero shows a pending-source card rather than falsely naming a currently playing episode. The provided photographic pose and unavailable controls are intentional differences required by the brief.

**Functional and accessibility verification**
- Navigation: exactly one shared header/footer, six agreed destinations, Podcasts active in both. Main Podcasts links now go to /podcasts. Invitez-moi on this page goes to /contact. Final Me contacter reaches /contact?objet=podcast#formulaire and the contact select was verified as podcast.
- Search: EDUCATION finds the accented title; combined Marketing filter yields no results; reset restores all initial cards and focuses search. Search covers title/show/description/guest/topics in automated tests. Arabic search without diacritics matches the intact Arabic test title.
- More records: four initially, five after reveal, button removed when exhausted, correct focus target. Theme filter tested on mobile; no horizontal overflow at 1440, 768 or 390px. Menus open and close with Escape at tablet/mobile widths.
- Newsletter: invalid email displays a field error, no service configured message is visible, submit stays disabled. No request, email, subscription or localStorage storage performed. No false loading/success state. All five unavailable platform rows have no clickable placeholder links; production hides them. Link parser rejects platform homepages and unsafe schemes.
- Media: no audio/video/iframe before interaction. Temporary fixture opens supplied video after explicit click; native time advances and readyState=4. Pause changes the hero, card and modal states together. Escape removes the media, unlocks body scroll and restores triggering-button focus. Opening the next audio fixture leaves exactly one AUDIO element and no video/iframe; time advances. Shift+Tab from close wraps to the source link. Invalid file exposes a message/source fallback, never a success/playing indication. No simultaneous playback. The fixture is not in the final route table.
- YouTube: URL/ID recognition, supported hosts and safe source handling unit tested; on-demand visible iframe integration uses the documented YouTube API. A real episode embed was not exercised because no validated YouTube episode URL exists in this project. This is a remaining content-dependent integration check, not a claimed successful playback test.
- Browser error log empty on the final /podcasts page. Missing-audio 404 was an intentional fixture test. One real original portrait per thumbnail; no broken loaded images. Source links were inspected; no external messaging or newsletter action was triggered.
- 36 tests pass, including all 27 existing contact/book tests and 9 podcast tests. Final webpack production build and TypeScript pass. No lint script exists. Existing forms and content bodies unchanged. Test server stopped, final preview remains on port 3009, no deployment.

**Missing data / follow-up**
Validated episode sources and metadata, genuine platform URLs, verified audience indicators, approved quote/decorative inscription, newsletter provider and its server-side configuration. Preview mode must stay off in production until content is approved. YouTube playback should be checked with the supplied real link when available. The shared footer retains its existing disabled social icons until their URLs are supplied.

**Implementation checklist**
- [x] Approved list/sidebar composition and shared chrome integrated.
- [x] Canonical data adapter, combined search/filter, reveal, responsive/RTL handling.
- [x] Shared accessible media player, native playback/error checks and honest unavailable states.
- [x] Production content gating, no fabricated playback/subscription/platform links.
- [x] Build/tests and final visual comparison completed; local preview only.

final result: passed

## Podcasts — intégration du contenu réel (27 septembre 2026)

- Les sept URL YouTube fournies sont publiées dans le catalogue, avec titres originaux (arabe conservé), chaînes, dates de publication et durées vérifiées via oEmbed et les métadonnées publiques du lecteur. Les descriptions françaises sont des résumés éditoriaux des titres/descriptions de source.
- Sept miniatures originales récupérées et inspectées : quatre 1280 × 720, deux 640 × 480 et une 480 × 360. Aucune miniature manquante, aucune retouche ou reconstruction. Provenance : `public/assets/podcasts/SOURCES.md` ; contact sheet : `output/podcasts/thumbnails-contact-sheet.png`.
- Catalogue unique partagé avec les aperçus de l’accueil. Les exemples et anciennes durées fictives de ces aperçus ont été remplacés. L’aperçu tourne désormais avec `PODCASTS_PREVIEW=false` ; compteurs calculés sur la sélection (7 vidéos, 6 chaînes, 5 h 28), liens des six chaînes issus de YouTube.
- Desktop 1440 px : sept fiches après « Voir tous les épisodes », sept images chargées avec `object-fit: contain`, aucun débordement. Mobile 390 px : titre, compteur, filtres et titres arabes sans débordement. Recherche `الذكاء` → deux résultats ; combinée à Marketing → TOUIL TALKS uniquement.
- Lecture réelle de Maghrebnow/Gitex dans le lecteur YouTube intégré, état de lecture confirmé ; pause, fermeture via Échap, arrêt/destruction de l’iframe et restitution du focus vérifiés. Correction du centrage du dialogue. Lien direct vers la source toujours disponible. Les métadonnées publiques déclarent les sept vidéos lisibles ; lecture manuelle contrôlée sur la vidéo mise en avant.
- Page d’accueil : trois aperçus, titres, miniatures et liens YouTube vérifiés ; actualité podcast mise à jour. Header/footer communs conservés. Aucune erreur console sur l’aperçu final.
- 36 tests réussis, compilation production webpack et TypeScript réussie. Captures : `output/podcasts/real-mobile.png`, `real-desktop-catalogue.png`, `real-youtube-player.png`.
- Aucun déploiement ni abonnement. Le formulaire de newsletter reste explicitement indisponible tant qu’un service d’inscription n’est pas configuré.

## Articles — import Richmedia et maquette (27 septembre 2026)

**Scope and reference**

- Route: `/articles`, local preview `http://127.0.0.1:3009/articles`. Existing Next.js stack, shared fonts and site chrome retained. No CMS, new backend, newsletter, individual article route or deployment.
- User reference: `ChatGPT Image Sep 27, 2026, 05_35_52 PM.png`, 2160 × 4307, normalized to 1440 × 2871 in `output/articles/reference-1440.png`.
- Content authority: the exact « Articles publiés » section of https://www.richmedia.ma/auteurs/salah-eddine-mimouni/. Ten publications, one author listing page, no additional pagination, four categories. Recommended articles and unrelated navigation excluded.

**Visual evidence and comparison**

- Reference and final implementation were both opened and inspected. `output/articles/comparison-full.png`: same-width source at left, implementation at right. `comparison-cards.png`: source first row above implementation first row, both at the same 1280px content width.
- Full-page browser capture duplicated strips, a capture-tool issue rather than page overflow. `desktop-stitched.png` is reconstructed from four unscaled 1440 × 1000 viewport captures at observed scroll offsets 0, 956, 1912 and 2116.5; composition rounds the final offset to 2117. Source captures and `compare.mjs` are retained. Do not use `desktop-full.png` as layout evidence.
- Desktop: `desktop-top.png`, `desktop-scroll-1.png`, `desktop-scroll-2.png`, `desktop-bottom.png`. Tablet 768 × 1024: `tablet-top.png`, `tablet-catalogue.png`. Mobile 390 × 844: `mobile-top.png`, `mobile-menu.png`, `mobile-catalogue.png`, `mobile-filter.png`. Empty state: `empty-results.png`.

**Fidelity surfaces reviewed**

- Typography: shared serif navy headings, violet italic hero line, shared sans-serif body and controls, uppercase spaced eyebrows. Selectable real HTML throughout. Complete titles retained, including long three-line titles; no truncation.
- Layout and rhythm: 1280px desktop frame, full-width pale lavender/white backgrounds, two-column hero, portrait/text author card, 47/53 featured card and three-column article grid. Metadata and reading actions align at the bottom of equal-height cards. Tablet uses two grid columns; mobile uses one and stacks controls. No horizontal overflow at any requested width.
- Color, decoration and interaction: indigo/violet buttons, fine pale borders, small radii, source-like gradient CTA, subtle hover lift/image zoom, visible keyboard focus and reduced-motion support. Original source images occupy consistent aspect-ratio frames with dimensions reserved through Next Image.
- Assets: all ten original article images load (nine unique assets because the source reuses one). The supplied unmodified original author portrait is reused. No generated replacement, face modification, copied screenshot cards or decorative stock substituted for official images.
- Shared chrome: exactly one header and footer. Seven entries in desktop/mobile/footer, Articles active. Existing enlarged navigation and existing footer arrangement deliberately differ from the smaller mockup chrome to preserve the user's shared-site requirement. Unconfigured social icons are omitted, not fabricated.
- Copy and data: exact titles and source descriptions, real publication dates and reading times. Most recent verified publication is 24 August 2026; dateModified is never used for ranking. Real images and source descriptions intentionally differ from the illustrative mockup. Slightly taller rows accommodate full source descriptions, not clipped copy.

**Findings and corrections**

1. Import parser initially concatenated adjacent metadata text nodes. Reading duration extraction now inserts spaces and rejects year-length numeric values; dedicated tests verify 12 minutes is not read as 202612. The corrected catalog was re-imported successfully.
2. Source taxonomy differs on one guide's detail page. The author listing category Guides is preserved as the authoritative category rather than replacing it with Secteurs. SEO / GEO is a single filter. Counts are dynamically derived: Stratégie 5, SEO / GEO 2, Média & performance 2, Guides 1.
3. Browser fullPage screenshot defect handled with unscaled viewport captures as above. Desktop, tablet and mobile viewport images were visually inspected; actual DOM width matches viewport width.
4. Final full and focused comparisons reviewed. No remaining actionable P0/P1/P2 issues. Intentional differences are original images/descriptions and the existing common header/footer.

**Functional and accessibility verification**

- Initial render: exactly ten unique publications, one featured plus nine grid cards. Every card's three links (image/title/action) point to its exact original Richmedia URL, with target `_blank`, `noopener noreferrer` and an accessible new-tab indication. All ten source pages and original images were successfully fetched during import; no generic-homepage or `#` reading links.
- Search `CRITERES` returns the accented title of the featured article as one grid result and hides the featured section. Combining SEO / GEO gives zero results and the explicit empty/reset state.
- Reset restores ten articles, the featured composition and newest-first order; keyboard focus returns to the search input.
- Stratégie filter yields five articles, including the latest featured publication. Oldest-first orders them 3 April, 28 April, 9 May, 14 May, 24 August 2026. Combining SEO / GEO, `QUALITE` and oldest-first returns the correct single article. Mobile Guides filter returns its one article.
- Filter counters describe the full catalog, while results count describes matching records. No duplicated featured result, fixed limit or fake pagination. All records accessible.
- Desktop/tablet/mobile widths: 1440/768/390px with document scroll width equal to viewport. Grid columns respectively 3/2/1. All images loaded; browser error log empty.
- Tablet and mobile menus include the seven destinations, open correctly and close with Escape. Keyboard tab reaches a real card link with a visible solid focus outline. CTA navigates to `/contact`, which retains the same shared navigation and marks Contact active. No form submitted.
- Server-rendered metadata, canonical `/articles`, OG portrait and sitemap route verified. No client-side source scraping or source trackers. Existing noindex remains intact for the local preview.

**Import and checks**

- `npm run import:articles` is rerunnable and was run twice successfully; 10 records, 4 categories, 1 author page, zero warnings. No data field or image missing in this import.
- Atomic preservation on fetch failure, canonical deduplication, pagination scope, null metadata, verified-date selection, accent-insensitive combined search, sort, featured exclusion and local asset integrity covered by tests.
- 46 tests pass, including all existing book/contact/podcast tests. Production webpack compilation and TypeScript pass. No lint script configured in this project. Preview remains running locally on port 3009.
- README documents the import, data locations, provenance, error handling and public origin configuration. No deployment, source-site change, outbound message or subscription performed.

final result: passed
