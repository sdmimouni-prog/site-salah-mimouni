import { home } from './home';
import type { Locale } from '@/lib/i18n';

// Keep the real books, events, episode titles, media and destinations in one source.
// English copy describes the original works; it does not imply an English edition.
const bookSubtitles: Record<string, string> = {
  'entre-deux-vols': 'Stories of a mind in transit',
  'quand-les-marques-pensent': 'The AI revolution reshaping marketing and influence',
  'pour-un-like-de-plus': 'The hidden cost of popularity and influence',
};
const companyDescriptions: Record<string, string> = {
  RICHMEDIA: 'Digital marketing and communications agency',
  'Hypeo AI': 'Artificial intelligence solutions for businesses',
  'Lemon Mind': 'A creative agency for ambitious brands',
  InTalks: 'Conversations with people who have something to share',
};

const englishHome = {
  ...home,
  signature: 'Entrepreneur • Author • Speaker',
  eyebrow: 'IDEAS THAT MAKE A DIFFERENCE',
  subtitle: 'Entrepreneur, author & speaker',
  introduction: 'As a computer engineer, AI doctoral researcher and entrepreneur, I bring technology and people together. Through my work, books and talks, I help individuals and organisations turn ideas into opportunities and positive change.',
  quote: 'I believe in a more human approach to technology — one that helps people thrive and shapes a better future.',
  stats: home.stats.map((stat, index) => ({
    ...stat,
    value: index === 0 ? '10+' : index === 2 ? 'Thousands' : stat.value,
    label: ['years of experience', 'companies co-founded', 'of people trained'][index],
  })),
  news: home.news.map((item, index) => ({
    ...item,
    category: ['Podcast', 'Upcoming event', 'New book'][index],
    description: index === 1 ? '17 October 2026 · Casablanca' : index === 2 ? 'Behind the scenes of a world shaped by influence' : item.description,
    alt: index === 0 ? `YouTube thumbnail — ${item.title}` : index === 1 ? 'The Bridge 2026 poster featuring Salah-Eddine MIMOUNI' : `Original cover of ${item.title}`,
    action: ['Explore the podcasts', 'Watch the testimonial', 'Explore the book'][index],
  })),
  companies: home.companies.map(company => ({ ...company, description: companyDescriptions[company.name] })),
  conference: {
    ...home.conference,
    title: 'Artificial intelligence: an opportunity for everyone',
    description: 'A talk exploring the challenges, practical applications and opportunities of AI in today’s world.',
  },
  topics: ['Artificial intelligence', 'Digital marketing', 'Entrepreneurship', 'Personal branding', 'Influence and content creation'],
  books: home.books.map(book => ({ ...book, subtitle: bookSubtitles[book.slug] })),
  events: home.events.map(event => ({
    ...event,
    month: new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'Africa/Casablanca' }).format(new Date(event.date)).toUpperCase(),
    hours: event.id === 'the-bridge-2026' ? '8:30 am – 8:00 pm' : event.hours,
  })),
  contactDescription: 'I’m always open to new conversations, collaborations and opportunities.',
} satisfies typeof home;

export function getHomeContent(locale: Locale) {
  return locale === 'en' ? englishHome : home;
}

export const homeCopy = {
  fr: {
    portrait: 'Portrait de Salah-Eddine MIMOUNI, en costume bleu',
    journey: 'Découvrir mon parcours', invite: 'Invitez-moi à intervenir', stats: 'Indicateurs à confirmer',
    highlights: 'En ce moment', allNews: 'Voir toute l’actualité', companies: 'Mes sociétés',
    visitSite: 'visiter le site (nouvel onglet)', talks: 'Interventions', conference: 'Conférence',
    studio: 'Salah-Eddine MIMOUNI en studio', watch: 'Voir la vidéo', videoMissing: 'Vidéo à fournir',
    videoSoon: 'Vidéo à venir.', topics: 'Thématiques d’intervention', podcasts: 'Podcasts & médias',
    allEpisodes: 'Tous les épisodes', thumbnail: 'Miniature YouTube', listen: 'Écouter',
    audioMissing: 'Audio à fournir', playbackUnavailable: 'Lecture indisponible', episodesSoon: 'Épisodes à venir.',
    books: 'Mes livres', explore: 'Découvrir', viewBook: 'Voir le livre', bookMissing: 'Lien du livre à fournir',
    currency: 'Dhs', originalBooks: '', events: 'Événements', viewEvent: 'Voir l’événement',
    upcoming: 'À venir', officialSite: 'Site officiel',
    expertise: 'Parcours & expertises', expertiseLead: 'Des regards complémentaires, une même envie de créer de la valeur.',
    horizons: 'Un parcours, plusieurs horizons', connect: 'Relier les idées.', impact: 'Créer de l’impact.',
  },
  en: {
    portrait: 'Portrait of Salah-Eddine MIMOUNI in a blue suit',
    journey: 'Explore my journey', invite: 'Invite me to speak', stats: 'Figures awaiting confirmation',
    highlights: 'In the spotlight', allNews: 'Explore talks & podcasts', companies: 'My companies',
    visitSite: 'visit website (opens in a new tab)', talks: 'Speaking', conference: 'Talk',
    studio: 'Salah-Eddine MIMOUNI in the studio', watch: 'Watch the video', videoMissing: 'Video not yet available',
    videoSoon: 'Video coming soon.', topics: 'Speaking topics', podcasts: 'Podcasts & media',
    allEpisodes: 'All episodes', thumbnail: 'YouTube thumbnail', listen: 'Listen',
    audioMissing: 'Audio not yet available', playbackUnavailable: 'Playback unavailable', episodesSoon: 'Episodes coming soon.',
    books: 'My books', explore: 'Explore', viewBook: 'Explore the book', bookMissing: 'Book link not yet available',
    currency: 'MAD', originalBooks: 'Books in French · Original titles', events: 'Events', viewEvent: 'Explore the event',
    upcoming: 'Upcoming', officialSite: 'Official website',
    expertise: 'Experience & expertise', expertiseLead: 'Different perspectives, a shared ambition to create lasting value.',
    horizons: 'One journey, many perspectives', connect: 'Connecting ideas.', impact: 'Making a difference.',
  },
} satisfies Record<Locale, Record<string, string>>;

export const englishRoles = [
  { title: 'Computer engineer', subtitle: 'Engineering & information systems', description: 'A strong foundation in computer engineering and information systems.', label: 'Build' },
  { title: 'AI doctoral researcher', subtitle: 'Research & applications', description: 'Research focused on practical solutions to real challenges.', label: 'Explore' },
  { title: 'Founder & co-founder', subtitle: 'From idea to business', description: 'Building ventures in digital technology, education and AI.', label: 'Create' },
  { title: 'Certified specialist', subtitle: 'Meta Ads · Google Ads · Analytics', description: 'Expertise that turns digital strategy into measurable performance.', label: 'Optimise' },
  { title: 'Author & speaker', subtitle: 'Share. Connect. Inspire.', description: 'Bringing ideas to life through books and conversations.', label: 'Share' },
];
