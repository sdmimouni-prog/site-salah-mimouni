import type { Locale } from '@/lib/i18n';
import { getTranslator, localizeContent } from '@/lib/translate';
import { LocalizedLink } from '@/components/i18n/LocalizedLink';
import { ArrowRight, Brain, BriefcaseBusiness, ChartNoAxesColumnIncreasing, Download, Globe, GraduationCap, Lightbulb, Mic, Quote, UsersRound } from 'lucide-react';
import type { CSSProperties } from 'react';
import { about as originalAbout } from '@/content/about';
import { home } from '@/content/home';
import { SourceAction } from '@/components/primitives';
import { SectionReveal } from '@/components/SectionReveal';
const icons = { chart: ChartNoAxesColumnIncreasing, brain: Brain, lightbulb: Lightbulb, users: UsersRound, graduate: GraduationCap, mic: Mic };
export function AboutHero({ locale = 'fr' }: { locale?: Locale }) {
 const t = getTranslator(locale), about = localizeContent(originalAbout, locale);
  return <section className="bio-hero" aria-labelledby="about-title">
    <div className="bio-scene"><img src="/assets/photos/hero-retouched.png" alt={t("Portrait retouché de Salah-Eddine MIMOUNI en costume bleu")} fetchPriority="high"/></div>
    <div className="bio-hero-inner"><div className="bio-hero-copy"><p className="eyebrow">{t("À PROPOS")}</p><h1 id="about-title">{t("Un parcours guidé")}<br/>{' '}{t("par la curiosité,")}<br/>{' '}{t("l’impact et l’action.")}</h1><p className="bio-intro">{about.introduction}</p><div className="bio-actions"><SourceAction href={home.cvUrl} download className="bio-cv" unavailable={t("CV à fournir")}>{t("Télécharger mon CV")}<Download size={16}/></SourceAction><LocalizedLink href="/contact" className="button button-outline">{t("Me contacter")}<ArrowRight size={17}/></LocalizedLink></div></div>

    </div>
  </section>;
}
export function AboutJourney({ locale = 'fr' }: { locale?: Locale }) {
 const t = getTranslator(locale), about = localizeContent(originalAbout, locale);
  return <section className="bio-journey bio-journey--compact" id="histoire" aria-labelledby="story-title">
    <SectionReveal className="bio-journey-grid">
      <div className="bio-story section-reveal-item" data-reveal="visible"><p className="eyebrow">{t("MON HISTOIRE")}</p><h2 id="story-title">{t("De la passion de l’informatique à l’entrepreneuriat d’impact")}</h2><p>{about.story}</p><LocalizedLink className="button button-outline" href="#philosophie">{t("Ma philosophie")}<ArrowRight size={16}/></LocalizedLink></div>
      <figure className="bio-story-photo section-reveal-item" data-reveal="visible" style={{'--order':1} as CSSProperties}><img src="/assets/photos/studio.jpg" alt={t("Salah-Eddine MIMOUNI en conversation dans un studio, devant un microphone")} width={5351} height={3567} loading="lazy"/></figure>
      <div className="bio-timeline section-reveal-item" data-reveal="visible" style={{'--order':2} as CSSProperties}><h2>{t("Les grandes étapes")}</h2><ol>{about.timeline.map(item => <li key={item.year}><time>{item.year}</time><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ol></div>
    </SectionReveal>
  </section>;
}
export function AboutPersonal({ locale = 'fr' }: { locale?: Locale }) {
 const t = getTranslator(locale), about = localizeContent(originalAbout, locale);
  const stats = [{Icon:BriefcaseBusiness,value:t("+10"),label:t("années d’expérience")},{Icon:UsersRound,value:'6',label:t("sociétés co-fondées")},{Icon:UsersRound,value:t("Des milliers"),label:t("de personnes formées")},{Icon:Globe,value:t("Présence"),label:t("au Maroc et à l’international")}];
  return <><section className="bio-stats" aria-labelledby="numbers-title"><h2 id="numbers-title">{t("Quelques chiffres")}</h2><SectionReveal className="bio-stats-grid">{stats.map(({Icon,value,label},index)=><div className="section-reveal-item" data-reveal="visible" style={{'--order':index} as CSSProperties} key={value}><article><Icon size={38} aria-hidden="true"/><div><h3>{value}</h3><p>{label}</p></div></article></div>)}</SectionReveal></section>
    <section className="bio-expertise" id="philosophie" aria-labelledby="expertise-title"><div className="bio-philosophy"><p className="eyebrow">{t("MES DOMAINES D’EXPERTISE")}</p><h2 id="expertise-title">{t("Des expertises")}<br/>{' '}{t("complémentaires,")}<br/>{' '}{t("au service d’un même objectif")}</h2><p>{t("Je combine une vision stratégique, une expertise technique et une compréhension fine des enjeux humains pour concevoir des projets utiles, durables et à fort impact.")}</p><LocalizedLink href="/#interventions" className="button button-outline">{t("Découvrir mes interventions")}<ArrowRight size={16}/></LocalizedLink></div><SectionReveal className="bio-expertise-grid">{about.expertise.map((item,index)=>{const Icon=icons[item.icon as keyof typeof icons];return <div className="section-reveal-item" data-reveal="visible" style={{'--order':index} as CSSProperties} key={item.title}><article><Icon size={37} aria-hidden="true"/><h3>{item.title}</h3><p>{item.description}</p></article></div>;})}</SectionReveal></section></>;
}
export function AboutContact({ locale = 'fr' }: { locale?: Locale }) {
 const t = getTranslator(locale), about = localizeContent(originalAbout, locale);
  return <section id="contact" className="contact-band bio-contact"><SectionReveal className="contact-inner"><div className="section-reveal-item" data-reveal="visible"><p className="eyebrow">{t("UNE IDÉE, UN PROJET, UNE CONFÉRENCE ?")}</p><h2>{t("Échangeons sur les opportunités.")}</h2></div><SourceAction href={home.contactUrl} className="button contact-button" unavailable={t("Coordonnées de contact à renseigner")}>{t("Me contacter")}<ArrowRight size={18}/></SourceAction></SectionReveal></section>;
}
