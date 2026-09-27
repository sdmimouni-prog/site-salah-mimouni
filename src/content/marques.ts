const confirmedPrice = 145;

export const marques = {
  id: 'quand-les-marques-pensent', title: 'Quand les marques pensent', author: 'Salah-Eddine MIMOUNI',
  subtitle: 'La révolution de l’IA qui bouleverse le marketing et l’influence.',
  cover: '/assets/books/marques-front.webp', logo: '/assets/books/editions-actuelles.png', portrait: '/assets/photos/portrait.jpeg',
  commerce: { mode: 'demo', price: confirmedPrice, currency: 'MAD', delivery: 'À confirmer', payment: 'Aucun paiement demandé à cette étape.', recipient: 'sd.mimouni@richmedia.ma' },
  navigation: [['Le livre','#le-livre'],['Sommaire','#sommaire'],['Extraits','#extraits'],['L’auteur','#auteur'],['L’éditeur','#editeur']],
  facts: [['10','chapitres','Pour repenser le marketing'],['3','actes','Comprendre, s’adapter, anticiper'],['FR','Un livre en français','Stratégie, terrain et réflexion'],['↗','Maroc & Afrique','Un regard ancré dans le terrain']],
  intro: 'Ni manuel académique, ni catalogue d’outils : ce livre croise l’expérience du chercheur et celle du praticien pour explorer le passage du marketing planifié au marketing augmenté par l’IA.',
  axes: [ ['Garder une voix singulière','Identité de marque et IA générative.'], ['Passer de l’idée à l’action','VITA, REACT et Brand DNA.'], ['Repenser l’influence','Data, création et mesure de l’impact.'], ['Préserver la place de l’humain','Confiance, relations et décisions.'] ],
  acts: [
    { label: 'ACTE I', title: 'Le monde d’avant est mort', start: 1, chapters: ['Du marketing planifié au marketing augmenté','L’attention, la nouvelle devise','Le marketing du chaos — vitesse, micro-tendances et instantanéité'] },
    { label: 'ACTE II', title: 'Comment les marques qui pensent s’adaptent', start: 4, chapters: ['La marque augmentée — identité, voix et IA générative','Le marketing d’influence réinventé par l’IA','Data, ciblage et personnalisation — la fin de la masse','Créer, distribuer, mesurer — le nouveau cycle du contenu','Le vrai business ne se fait pas sur LinkedIn — et l’IA ne change pas ça'] },
    { label: 'ACTE III', title: 'Ce qui vient, et comment s’y préparer', start: 9, chapters: ['Les marchés émergents à l’ère de l’IA — focus Maroc & Afrique','2030 — quand les marques pensent vraiment'] },
  ],
  excerpts: [
    { text: 'L’augmentation suppose que l’humain reste au centre : plus éclairé, plus rapide, plus pertinent. Pas remplacé. Amplifié.', source: 'Chapitre 1 · Du marketing planifié au marketing augmenté' },
    { text: 'La marque augmentée n’est pas une marque qui utilise l’IA. C’est une marque qui a suffisamment bien défini ce qu’elle est pour que l’IA puisse l’amplifier sans la trahir.', source: 'Chapitre 4 · La marque augmentée' },
  ],
  bio: 'Ingénieur d’État en informatique, expert en marketing digital et doctorant en intelligence artificielle, il partage dans cet ouvrage le double regard de la recherche et de l’entrepreneuriat.',
  faq: [
    ['À qui s’adresse ce livre ?', 'Aux professionnels du marketing, entrepreneurs, créateurs de contenu et lecteurs qui souhaitent comprendre comment l’IA transforme les marques et l’influence, tout en préservant la place de l’humain.'],
    ['Puis-je découvrir un extrait avant de commander ?', 'Oui. Les deux passages de la section Extraits permettent de découvrir le propos du livre. Ils sont issus des chapitres 1 et 4 ; le manuscrit complet n’est pas publié sur ce site.'],
    ['Comment connaître le prix et les modalités de livraison ?', `Le livre coûte ${confirmedPrice} Dhs l’exemplaire, hors livraison. Les frais et les modalités de livraison restent à confirmer. Le formulaire est actuellement en démonstration et n’envoie aucune demande. Vous pouvez contacter directement sd.mimouni@richmedia.ma.`],
  ],
};
export type MarquesRequest = { book: string; name: string; phone: string; email: string; city: string; address: string; quantity: string; consent: boolean };
export function validateMarquesRequest(v: MarquesRequest) {
 const errors: Partial<Record<keyof MarquesRequest,string>> = {};
 if(v.book!==marques.id) errors.book='Livre non reconnu.';
 if(v.name.trim().length<2||v.name.length>100) errors.name='Indiquez votre nom complet (2 à 100 caractères).';
 if(!/^\+?[\d ()\-.]{6,24}$/.test(v.phone.trim()) || v.phone.replace(/\D/g,'').length<6) errors.phone='Indiquez un numéro de téléphone valide.';
 if(v.email && (v.email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))) errors.email='Vérifiez votre adresse e-mail.';
 if(v.city.trim().length<2||v.city.length>100) errors.city='Indiquez votre ville.';
 if(v.address.trim().length<8||v.address.length>500) errors.address='Indiquez une adresse complète (8 à 500 caractères).';
 if(!/^\d+$/.test(v.quantity)||!Number.isSafeInteger(Number(v.quantity))||Number(v.quantity)<1) errors.quantity='Choisissez une quantité entière, au minimum 1.';
 if(!v.consent) errors.consent='Votre accord est nécessaire pour le suivi de la demande.';
 return errors;
}
