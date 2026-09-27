import { getBook } from './books';
const existingBook = getBook('entre-deux-vols')!;
export const ancienPauvre = {
  title: 'L’ancien pauvre', subtitle: '(Entre deux vols)', author: 'Salah-Eddine MIMOUNI',
  cover: existingBook.image, portrait: '/assets/photos/portrait.jpeg',
  commerce: {
    price: existingBook.price, currency: 'MAD', mode: 'demo' as const,
    delivery: 'Livraison : modalités à confirmer', timing: 'Délai à confirmer',
    payment: 'Moyens de paiement à confirmer', maxQuantity: 10,
    recipient: 'sd.mimouni@richmedia.ma',
  },
  navigation: [['Accueil','#accueil-livre'],['Le livre','#le-livre'],['Extraits','#extraits'],['L’auteur','#auteur'],['Témoignages','#temoignages'],['Commander','#commander']],
  information: [
    {icon:'book',title:'Autobiographie',text:'Un parcours personnel'},
    {icon:'pages',title:'Extraits authentiques',text:'Issus du manuscrit'},
    {icon:'edition',title:'Les Éditions Actuelles',text:'Maison d’édition'},
    {icon:'message',title:'Une question ?',text:'Contact direct avec l’auteur'},
  ],
  heroQuote: {text:'ce n’est pas l’objectif qui importe, mais la personne que l’on devient en chemin.',credit:'Hind El Grari · Avant-propos, p. 9'},
  summary: 'De l’enfance à l’entrepreneuriat, Salah-Eddine MIMOUNI revient sur les expériences, les rencontres et les remises en question qui ont façonné son parcours. Un récit personnel sur la réussite, les relations humaines et ce qui donne du sens au chemin parcouru.',
  arguments: ['Un récit autobiographique personnel','Des réflexions sur les épreuves et la résilience','Un regard sur l’entrepreneuriat au Maroc','Une interrogation sur la réussite et le sens'],
  excerpts: [
    {title:'Ce qui reste',text:'Ce qui restait, c’était les relations, les souvenirs partagés, et le temps bien utilisé.',source:'Chapitre 13 — L’ancien pauvre, p. 148'},
    {title:'Écrire pour comprendre',text:'Écrire, c’est aussi une forme de libération. On porte tous en nous des souvenirs, certains lumineux, d’autres plus sombres. Les bons souvenirs, on les chérit. Les mauvais, on essaie souvent de les enterrer, mais ils continuent de peser sur nous.',source:'Introduction, p. 15'},
    {title:'Les rencontres',text:'Le business, j’ai compris, ne se limite pas à des contrats ou des transactions. C’est une affaire de personnes, de confiance, et d’alchimie.',source:'Chapitre 12 — Le vrai business ne se fait pas sur LinkedIn, p. 140'},
  ],
  // Fictional examples retained at the author's request; always label them in the UI.
  testimonials: [
    {name:'Youssef A.',role:'Entrepreneur',text:'Un récit bouleversant et motivant. On se reconnaît dans ses doutes, ses combats et ses victoires.',isFictional:true},
    {name:'Amina B.',role:'Étudiante',text:'Une lecture incontournable pour tous ceux qui rêvent d’entreprendre au Maroc.',isFictional:true},
    {name:'Karim T.',role:'Cadre marketing',text:'Sincère, authentique et inspirant. Un livre qui fait du bien.',isFictional:true},
  ] as {name:string;role:string;text:string;isFictional:boolean}[],
  socials: [] as {label:string;url:string}[],
};
export type LandingOrder = {name:string;phone:string;city:string;address:string;quantity:string;consent:boolean};
export function validateLandingOrder(value:LandingOrder) {
  const errors:Partial<Record<keyof LandingOrder,string>>={};
  if(value.name.trim().length<2||value.name.length>100)errors.name='Indiquez votre nom complet (2 à 100 caractères).';
  if(!/^[+\d][\d\s().-]{6,24}$/.test(value.phone.trim()))errors.phone='Indiquez un numéro de téléphone valide.';
  if(value.city.trim().length<2||value.city.length>100)errors.city='Indiquez votre ville (2 à 100 caractères).';
  if(value.address.trim().length<8||value.address.length>500)errors.address='Précisez votre adresse de livraison (8 à 500 caractères).';
  if(!/^\d+$/.test(value.quantity)||Number(value.quantity)<1||Number(value.quantity)>ancienPauvre.commerce.maxQuantity)errors.quantity=`Choisissez un nombre entier de 1 à ${ancienPauvre.commerce.maxQuantity}.`;
  if(!value.consent)errors.consent='Votre accord est nécessaire pour traiter une demande.';
  return errors;
}
