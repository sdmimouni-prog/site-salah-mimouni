import { library } from './library';
import { contactLink } from './contact';

export const eventCategories = ['Conférences & panels', 'Masterclasses', 'Rencontres littéraires'] as const;
export type EventCategory = typeof eventCategories[number];
export type EventVisual = {
  kind: 'photo' | 'books';
  src: string;
  alt: string;
  position?: string;
};
export type EventEntry = {
  id: string;
  title: string;
  category: EventCategory;
  description: string;
  date: string | null;
  location: string | null;
  image: EventVisual;
  status: 'example' | 'confirmed' | 'cancelled';
  featured: boolean;
  isPlaceholder: boolean;
};
export type UpcomingEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  type: EventCategory;
  registrationUrl: string | null;
  status: 'confirmed' | 'full' | 'cancelled';
};

// No confirmed agenda was supplied. The dates in the original home mockup
// are demo content and must not be promoted to confirmed events here.
export const upcomingEvents: UpcomingEvent[] = [];

// Original photographs supplied by the author, used as illustrations only.
// Replace these with identified event photographs when available.
const studio: EventVisual = {
  kind: 'photo', src: '/assets/photos/studio.jpg',
  alt: 'Salah-Eddine Mimouni au microphone en studio — photographie utilisée à titre illustratif',
  position: '52% 43%',
};
const portrait: EventVisual = {
  kind: 'photo', src: '/assets/photos/portrait.jpeg',
  alt: 'Portrait original de Salah-Eddine Mimouni en costume bleu — visuel d’illustration',
  position: '50% 5%',
};
const books: EventVisual = {
  kind: 'books', src: '',
  alt: 'Les trois ouvrages de Salah-Eddine Mimouni : Entre deux vols, Quand les marques pensent et Pour un like de plus…',
};

export const eventEntries: EventEntry[] = [
  {
    id: 'intelligence-artificielle', category: 'Conférences & panels',
    title: 'L’intelligence artificielle, au-delà des idées reçues.',
    description: 'Comprendre les transformations et ouvrir le débat.',
    date: null, location: null, image: studio,
    status: 'example', featured: true, isPlaceholder: true,
  },
  {
    id: 'marketing-action', category: 'Masterclasses',
    title: 'Du marketing à l’action : apprendre ensemble.',
    description: 'Des échanges concrets autour des pratiques du digital.',
    date: null, location: null, image: portrait,
    status: 'example', featured: false, isPlaceholder: true,
  },
  {
    id: 'rencontres-litteraires', category: 'Rencontres littéraires',
    title: 'Un livre, des questions, une conversation.',
    description: 'Partager un regard et prolonger la lecture par la rencontre.',
    date: null, location: null, image: books,
    status: 'example', featured: false, isPlaceholder: true,
  },
];

export const eventsPage = {
  title: 'Événements & rencontres — Salah-Eddine Mimouni',
  description: 'Conférences, masterclasses et rencontres littéraires avec Salah-Eddine Mimouni. Des espaces pour échanger, transmettre et ouvrir de nouvelles perspectives.',
  contactHref: contactLink('conference'),
  hero: {
    eyebrow: 'ÉVÉNEMENTS & RENCONTRES',
    title: ['Des idées', 'à partager.', 'Des rencontres', 'à vivre.'],
    introduction: 'Conférences, masterclasses et rencontres littéraires : des espaces pour échanger, transmettre et ouvrir de nouvelles perspectives.',
    discover: 'Découvrir les événements', invite: 'M’inviter à intervenir',
    visual: studio, badge: 'Mise en situation · visuel provisoire',
    imageText: ['Partager.', 'Transmettre.', 'Construire', 'ensemble.'],
    chipTitle: 'Sur scène. Au plus près des idées.',
    chipDescription: 'Partager l’expérience, ouvrir la conversation.',
  },
  upcoming: {
    eyebrow: 'ON SE RETROUVE ?', title: 'Prochains rendez-vous.',
    emptyTitle: 'Un espace pour vos prochains rendez-vous.',
    emptyDescription: 'Dates, lieux et inscriptions seront affichés après confirmation.',
    status: 'AGENDA À COMPLÉTER',
  },
  archive: {
    eyebrow: 'PARTAGER · TRANSMETTRE · RENCONTRER', title: 'Retour sur les événements.',
    introduction: 'Des idées qui prennent vie dans l’échange.',
    note: 'Fiches d’exemple · événements réels à renseigner',
    emptyTitle: 'De nouvelles rencontres à partager.',
    emptyDescription: 'Les événements de cette catégorie seront ajoutés après confirmation de leurs informations.',
    placeholderTitle: 'Exemple de fiche',
    placeholderDescription: 'Cette fiche présente un format de rencontre. Elle ne correspond pas à un événement confirmé. La date, le lieu et les informations pratiques seront renseignés dès leur validation.',
    datePlaceholder: 'Date à renseigner', locationPlaceholder: 'Lieu à préciser',
    imageBadge: 'Visuel d’illustration', discover: 'Découvrir',
  },
  gallery: {
    eyebrow: 'EN IMAGES', title: 'Des moments au-delà des mots.',
    explore: 'Explorer la galerie', note: 'Galerie illustrative · à remplacer par les photos de vos événements',
    topics: 'Conférences · Coulisses · Rencontres',
    items: [
      { title: 'Sur scène', image: studio, caption: 'Photographie originale en studio, utilisée pour illustrer la prise de parole. Ce visuel ne documente pas une conférence.' },
      { title: 'Dans l’échange', image: portrait, caption: 'Portrait original de Salah-Eddine Mimouni, utilisé à titre illustratif en attendant les photographies de rencontres.' },
      { title: 'Autour des livres', image: books, caption: 'Composition des couvertures originales des trois ouvrages. Visuel illustratif des rencontres littéraires.' },
    ],
  },
  covers: library.books.map(book => ({ src: book.cover, title: book.title })),
  cta: {
    eyebrow: 'ET SI ON SE RENCONTRAIT ?', title: 'La prochaine rencontre, chez vous ?',
    description: 'Une conférence, une masterclass ou une rencontre littéraire à imaginer ensemble.',
    action: 'M’inviter à intervenir',
  },
};
