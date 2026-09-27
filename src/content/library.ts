import { getBook } from './books';
import { ancienPauvre } from './ancien-pauvre';
import { marques } from './marques';
const influence = getBook('pour-un-like-de-plus')!;
export const library = {
  intro: 'Un parcours personnel, la transformation des marques et les coulisses de l’influence. Trois portes d’entrée pour nourrir la réflexion.',
  books: [
    { title: ancienPauvre.title, subtitle: 'Entre deux vols', category: 'Autobiographie', cover: ancienPauvre.cover, href: '/livres/lancien-pauvre', tone: 'journey', summary: 'Un récit personnel sur l’ambition, les apparences et la recherche d’un équilibre au-delà de la réussite matérielle.' },
    { title: marques.title, subtitle: marques.subtitle, category: getBook(marques.id)!.category, cover: marques.cover, href: '/livres/quand-les-marques-pensent', tone: 'brands', summary: 'Le regard croisé du chercheur et du praticien sur le passage du marketing planifié au marketing augmenté.' },
    { title: influence.title, subtitle: influence.subtitle, category: influence.category, cover: influence.image, href: '/livres/pour-un-like-de-plus', tone: 'influence', summary: 'Une réflexion sur la comparaison, le désir de visibilité et la place que les réseaux sociaux prennent dans nos vies.' },
  ],
  excerpts: [
    { text: ancienPauvre.excerpts[0].text, source: 'L’ancien pauvre · Chapitre 13, p. 148' },
    { text: marques.excerpts[0].text, source: 'Quand les marques pensent · Chapitre 1' },
  ],
  portrait: ancienPauvre.portrait,
  publisherLogo: marques.logo,
};
