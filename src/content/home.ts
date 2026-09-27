import { books } from './books';
import { podcastEpisodes } from './podcasts';
import { theBridge, upcomingEvents } from './agenda';
import { durationLabel, visibleEpisodes } from '../lib/podcasts';
const latestPodcasts = visibleEpisodes(podcastEpisodes, false);
const latestPodcast = latestPodcasts[0];
// Source unique des contenus. null = action indisponible, jamais de faux lien.
// Photographies originales fournies par l’auteur ; logos de marque originaux dans /assets/brands.
export const home = {
  name: 'Salah-Eddine MIMOUNI',
  signature: 'Entrepreneur • Auteur • Conférencier',
  eyebrow: 'DES IDÉES AU SERVICE D’UN IMPACT RÉEL',
  subtitle: 'Entrepreneur, auteur & conférencier',
  specialty: 'Digital Marketing & AI Expert',
  introduction: 'Ingénieur d’État en informatique, doctorant en intelligence artificielle, entrepreneur, auteur et intervenant, je mets la technologie et le digital au service des individus et des organisations pour créer plus d’opportunités et d’impact positif.',
  portrait: '/assets/photos/portrait.jpeg',
  quote: 'Je crois en un digital plus humain, au service des talents et d’un meilleur avenir.',
  demo: true,
  cvUrl: null as string | null,
  contactUrl: '/contact' as string | null,
  stats: [ { value: '+10', label: 'années d’expérience' }, { value: '6', label: 'sociétés co-fondées' }, { value: 'Des milliers', label: 'de personnes formées' } ],
  nav: [ ['Accueil', '/'], ['À propos', '/a-propos'], ['Articles', '/articles'], ['Podcasts', '/podcasts'], ['Livres', '/livres'], ['Événements', '/evenements'], ['Contact', '/contact'] ],
  news: [
    { category: 'Podcast', title: latestPodcast.title, description: latestPodcast.showName || latestPodcast.channelName, image: latestPodcast.thumbnail, alt: `Miniature YouTube — ${latestPodcast.title}`, href: '/podcasts', action: 'Découvrir les podcasts' },
    { category: 'Prochain événement', title: theBridge.title, description: '17 octobre 2026 · Casablanca', image: theBridge.poster.src, alt: theBridge.poster.alt, href: theBridge.videoUrl, action: 'Voir le témoignage' },
    { category: 'Nouveau livre', title: 'Pour un like de plus…', description: 'Les coulisses d’un monde sous influence', image: '/assets/books/pour-un-like-de-plus.png', alt: 'Couverture originale de Pour un like de plus…', href: '/livres/pour-un-like-de-plus', action: 'Découvrir le livre' },
  ],
  expertise: [
    { icon: 'graduate', title: 'Ingénieur d’État en informatique', description: 'Une base solide en ingénierie et en systèmes d’information.' },
    { icon: 'brain', title: 'Doctorant en intelligence artificielle', description: 'Une recherche tournée vers des solutions concrètes et utiles.' },
    { icon: 'rocket', title: 'Fondateur & co-fondateur', description: 'Plusieurs projets et sociétés dans le digital, l’éducation et l’IA.' },
    { icon: 'chart', title: 'Expert certifié', description: 'Meta Ads, Google Ads et Google Analytics.' },
    { icon: 'people', title: 'Auteur & conférencier', description: 'Partager, transmettre, inspirer.' },
  ],
  companies: [
    { name: 'RICHMEDIA', image: '/assets/brands/richmedia.png', description: 'Agence de marketing digital et de communication', url: null as string | null },
    { name: 'Hypeo AI', image: '/assets/brands/hypeo.png', description: 'Solutions d’intelligence artificielle pour les entreprises', url: null as string | null },
    { name: 'Lemon Mind', image: '/assets/brands/lemon.png', description: 'Agence créative au service des marques ambitieuses', url: null as string | null },
    { name: 'InTalks', image: '/assets/brands/intalks.png', description: 'Le podcast qui donne la parole aux esprits qui comptent', url: null as string | null },
  ],
  conference: { title: 'L’intelligence artificielle : une opportunité pour tous', description: 'Une conférence inspirante sur les enjeux, les usages et les opportunités de l’IA dans le monde actuel.', image: '/assets/photos/studio.jpg', videoUrl: null as string | null },
  topics: ['Intelligence artificielle', 'Marketing digital', 'Entrepreneuriat', 'Personal branding', 'Influence et création de contenu'],
  episodes: latestPodcasts.slice(0, 3).map(episode => ({ title: episode.title, show: episode.showName || episode.channelName, duration: durationLabel(episode.duration), image: episode.thumbnail, sourceUrl: episode.sourceUrl })),
  books: books.map(book => ({ ...book, url: `/livres/${book.slug}` })),
  events: upcomingEvents.filter(event => event.status === 'confirmed').map(event => ({
    ...event,
    day: event.date.slice(8, 10),
    month: new Intl.DateTimeFormat('fr-MA', { month: 'short', timeZone: 'Africa/Casablanca' }).format(new Date(event.date)).replace('.', '').toUpperCase(),
    year: event.date.slice(0, 4),
  })),
  gallery: [
    { src: '/assets/photos/studio.jpg', alt: 'Salah-Eddine MIMOUNI en studio, devant un microphone' },
    { src: '/assets/photos/portrait.jpeg', alt: 'Portrait de Salah-Eddine MIMOUNI en costume bleu' },
    { src: '/assets/photos/testimonial.jpeg', alt: 'Affiche The Bridge — témoignage de Salah-Eddine MIMOUNI' },
    { src: '/assets/photos/portrait-white.png', alt: 'Portrait de Salah-Eddine MIMOUNI sur fond blanc' },
  ],
  socials: [ { name: 'LinkedIn', url: null as string | null }, { name: 'YouTube', url: null as string | null }, { name: 'Instagram', url: null as string | null } ],
  contactTitle: 'Une conférence, un podcast ou un projet ? Parlons-en.',
  contactDescription: 'Je suis toujours ouvert aux échanges, aux collaborations et aux nouvelles opportunités.',
};
