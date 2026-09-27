import { ArrowRight, CalendarDays, Quote } from 'lucide-react';
import { home } from '@/content/home';
import { contactLink } from '@/content/contact';

export function Hero() {
  const introductionLines = home.introduction.replace('artificielle, ', 'artificielle,|').replace('au service ', 'au service|').split('|');
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-visual">
        <picture>
          <img className="hero-portrait" src="/assets/photos/hero-retouched.png" alt="Portrait de Salah-Eddine Mimouni, en costume bleu" fetchPriority="high" />
        </picture>

      </div>
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{home.eyebrow}</p>
          <h1 id="hero-title"><span>Salah-Eddine</span><span>Mimouni</span></h1>
          <p className="hero-subtitle">{home.subtitle}<strong>{home.specialty}</strong></p>
          <p className="hero-intro">{introductionLines.map((line, i) => <span key={line}>{line}{i < introductionLines.length - 1 ? ' ' : ''}</span>)}</p>
          <div className="hero-actions">
            <a className="button" href="/a-propos">Découvrir mon parcours<ArrowRight size={16} /></a>
            <a className="button button-outline" href={contactLink('conference')}><CalendarDays size={18} />Invitez-moi à intervenir</a>
          </div>
          <div className="stats" aria-label="Indicateurs à confirmer">
            {home.stats.map(stat => <div key={stat.value}><span className="stat-dot" /><div><strong>{stat.value}</strong><small>{stat.label}</small></div></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
