import type { Locale } from '@/lib/i18n';
import { getTranslator, localizeContent } from '@/lib/translate';
import type { Metadata } from 'next';
import { AboutContact, AboutHero, AboutJourney, AboutPersonal } from '@/components/about/AboutSections';
import '@/app/a-propos/about.css';
export const metadata: Metadata = { title: 'À propos — Salah-Eddine MIMOUNI', description: 'Parcours, valeurs et engagements de Salah-Eddine MIMOUNI. Entreprendre, apprendre et partager pour créer un impact positif.' };
export default function AboutContent({ locale = 'fr' }: { locale?: Locale }) {
 const t = getTranslator(locale);
  return <div className="about-page"><main id="about-main"><AboutHero locale={locale}/><div className="about-content"><AboutJourney locale={locale}/><AboutPersonal locale={locale}/></div><AboutContact locale={locale}/></main><aside className="about-demo-note"><strong>{t("Aperçu · contenus à valider.")}</strong>{t(" Dates, expériences, chiffres et citation repris de la maquette. Visuels provisoires, originaux à fournir.")}</aside></div>;
}
