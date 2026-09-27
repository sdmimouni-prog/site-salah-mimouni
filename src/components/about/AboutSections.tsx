import { ArrowRight, Brain, BriefcaseBusiness, ChartNoAxesColumnIncreasing, Download, Globe, GraduationCap, Lightbulb, Mic, Quote, UsersRound } from 'lucide-react';
import type { CSSProperties } from 'react';
import { about } from '@/content/about';
import { home } from '@/content/home';
import { SourceAction } from '@/components/primitives';
import { SectionReveal } from '@/components/SectionReveal';
const icons = { chart: ChartNoAxesColumnIncreasing, brain: Brain, lightbulb: Lightbulb, users: UsersRound, graduate: GraduationCap, mic: Mic };
export function AboutHero() {
  return <section className="bio-hero" aria-labelledby="about-title">
    <div className="bio-scene"><img src="/assets/photos/hero-retouched.png" alt="Portrait retouché de Salah-Eddine Mimouni en costume bleu" fetchPriority="high"/></div>
    <div className="bio-hero-inner"><div className="bio-hero-copy"><p className="eyebrow">À PROPOS</p><h1 id="about-title">Un parcours guidé<br/>{' '}par la curiosité,<br/>{' '}l’impact et l’action.</h1><p className="bio-intro">{about.introduction}</p><div className="bio-actions"><SourceAction href={home.cvUrl} download className="bio-cv" unavailable="CV à fournir">Télécharger mon CV<Download size={16}/></SourceAction><a href="/contact" className="button button-outline">Me contacter<ArrowRight size={17}/></a></div></div>

    </div>
  </section>;
}
export function AboutJourney() {
  return <section className="bio-journey bio-journey--compact" id="histoire" aria-labelledby="story-title">
    <SectionReveal className="bio-journey-grid">
      <div className="bio-story section-reveal-item" data-reveal="visible"><p className="eyebrow">MON HISTOIRE</p><h2 id="story-title">De la passion de l’informatique à l’entrepreneuriat d’impact</h2><p>{about.story}</p><a className="button button-outline" href="#philosophie">Ma philosophie<ArrowRight size={16}/></a></div>
      <figure className="bio-story-photo section-reveal-item" data-reveal="visible" style={{'--order':1} as CSSProperties}><img src="/assets/photos/studio.jpg" alt="Salah Eddine Mimouni en conversation dans un studio, devant un microphone" width={5351} height={3567} loading="lazy"/></figure>
      <div className="bio-timeline section-reveal-item" data-reveal="visible" style={{'--order':2} as CSSProperties}><h2>Les grandes étapes</h2><ol>{about.timeline.map(item => <li key={item.year}><time>{item.year}</time><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ol></div>
    </SectionReveal>
  </section>;
}
export function AboutPersonal() {
  const stats = [{Icon:BriefcaseBusiness,value:'+10',label:'années d’expérience'},{Icon:UsersRound,value:'6',label:'sociétés co-fondées'},{Icon:UsersRound,value:'Des milliers',label:'de personnes formées'},{Icon:Globe,value:'Présence',label:'au Maroc et à l’international'}];
  return <><section className="bio-stats" aria-labelledby="numbers-title"><h2 id="numbers-title">Quelques chiffres</h2><SectionReveal className="bio-stats-grid">{stats.map(({Icon,value,label},index)=><div className="section-reveal-item" data-reveal="visible" style={{'--order':index} as CSSProperties} key={value}><article><Icon size={38} aria-hidden="true"/><div><h3>{value}</h3><p>{label}</p></div></article></div>)}</SectionReveal></section>
    <section className="bio-expertise" id="philosophie" aria-labelledby="expertise-title"><div className="bio-philosophy"><p className="eyebrow">MES DOMAINES D’EXPERTISE</p><h2 id="expertise-title">Des expertises<br/>{' '}complémentaires,<br/>{' '}au service d’un même objectif</h2><p>Je combine une vision stratégique, une expertise technique et une compréhension fine des enjeux humains pour concevoir des projets utiles, durables et à fort impact.</p><a href="/#interventions" className="button button-outline">Découvrir mes interventions<ArrowRight size={16}/></a></div><SectionReveal className="bio-expertise-grid">{about.expertise.map((item,index)=>{const Icon=icons[item.icon as keyof typeof icons];return <div className="section-reveal-item" data-reveal="visible" style={{'--order':index} as CSSProperties} key={item.title}><article><Icon size={37} aria-hidden="true"/><h3>{item.title}</h3><p>{item.description}</p></article></div>;})}</SectionReveal></section></>;
}
export function AboutContact() {
  return <section id="contact" className="contact-band bio-contact"><SectionReveal className="contact-inner"><div className="section-reveal-item" data-reveal="visible"><p className="eyebrow">UNE IDÉE, UN PROJET, UNE CONFÉRENCE ?</p><h2>Échangeons sur les opportunités.</h2></div><SourceAction href={home.contactUrl} className="button contact-button" unavailable="Coordonnées de contact à renseigner">Me contacter<ArrowRight size={18}/></SourceAction></SectionReveal></section>;
}
