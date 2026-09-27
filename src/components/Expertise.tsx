import { ArrowRight, ArrowUpRight, BookOpen, BrainCircuit, ChartNoAxesCombined, Code2, Mic2, Rocket } from 'lucide-react';
import type { CSSProperties } from 'react';
import { SectionReveal } from './SectionReveal';
import s from './Expertise.module.css';

const roles = [
  { title: 'Ingénieur d’État', subtitle: 'Informatique & systèmes', description: 'Une base solide en ingénierie et en systèmes d’information.', href: '/a-propos', icon: Code2, theme: 'engineering', label: 'Construire' },
  { title: 'Doctorant en IA', subtitle: 'Recherche & applications', description: 'Une recherche tournée vers des solutions concrètes et utiles.', href: '/a-propos', icon: BrainCircuit, theme: 'research', label: 'Explorer' },
  { title: 'Fondateur & co-fondateur', subtitle: 'Du projet à l’entreprise', description: 'Des projets dans le digital, l’éducation et l’IA.', href: '#societes', icon: Rocket, theme: 'founder', label: 'Entreprendre' },
  { title: 'Expert certifié', subtitle: 'Meta Ads · Google Ads · Analytics', description: 'Une expertise au service de la performance digitale.', href: '/a-propos', icon: ChartNoAxesCombined, theme: 'performance', label: 'Optimiser' },
  { title: 'Auteur & conférencier', subtitle: 'Partager. Transmettre. Inspirer.', description: 'Des livres aux conversations, faire circuler les idées.', href: '#interventions', icon: Mic2, theme: 'author', label: 'Transmettre' },
];

export function Expertise() {
  return (
    <section className={s.section} id="parcours" aria-labelledby="expertise-title">
      <header className={s.heading}>
        <h2 id="expertise-title">Parcours & expertises<span aria-hidden="true">.</span></h2>
        <p>Des regards complémentaires, une même envie de créer de la valeur.</p>
      </header>
      <SectionReveal className={s.grid}>
        <div className={s.reveal} data-reveal="visible" style={{ '--order': 0 } as CSSProperties}>
          <div className={s.intro}>
            <div className={s.orbits} aria-hidden="true"><i /><i /><i /><span /></div>
            <p className={s.eyebrow}>Un parcours, plusieurs horizons</p>
            <p className={s.statement}>Relier les idées.<br /><em>Créer de l’impact.</em></p>
            <a className={s.journey} href="/a-propos">Découvrir mon parcours <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        {roles.map((role, index) => (
          <div key={role.theme} className={`${s.reveal} ${index === 4 ? s.wide : ''}`} data-reveal="visible" style={{ '--order': index + 1 } as CSSProperties}>
            <a className={`${s.card} ${s[role.theme]}`} href={role.href}>
              <div className={s.cardTop}>
                <span className={s.icon}><role.icon size={25} strokeWidth={1.6} aria-hidden="true" /></span>
                <span className={s.label}>{role.label}</span>
                <ArrowUpRight className={s.arrow} size={20} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <div className={s.copy}>
                <h3>{role.title}</h3>
                <p className={s.subtitle}>{role.subtitle}</p>
                <p className={s.description}>{role.description}</p>
              </div>
              {index === 4 && <div className={s.transmission} aria-hidden="true">
                <span className={s.bookSymbol}><BookOpen size={54} strokeWidth={1.1} /></span>
                <span className={s.micSymbol}><Mic2 size={32} strokeWidth={1.4} /></span>
                <i /><i />
              </div>}
            </a>
          </div>
        ))}
      </SectionReveal>
    </section>
  );
}
