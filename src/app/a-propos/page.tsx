import type { Metadata } from 'next';
import { AboutContact, AboutHero, AboutJourney, AboutPersonal } from '@/components/about/AboutSections';
import './about.css';
export const metadata: Metadata = { title: 'À propos — Salah-Eddine Mimouni', description: 'Parcours, valeurs et engagements de Salah-Eddine Mimouni. Entreprendre, apprendre et partager pour créer un impact positif.' };
export default function AboutPage() {
  return <div className="about-page"><main id="about-main"><AboutHero/><div className="about-content"><AboutJourney/><AboutPersonal/></div><AboutContact/></main><aside className="about-demo-note"><strong>Aperçu · contenus à valider.</strong> Dates, expériences, chiffres et citation repris de la maquette. Visuels provisoires, originaux à fournir.</aside></div>;
}
