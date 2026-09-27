import { LocalizedLink } from '@/components/i18n/LocalizedLink';
import Image from 'next/image';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { getHomeContent, homeCopy } from '@/content/home-localized';
import type { Locale } from '@/lib/i18n';
import { contactLink } from '@/content/contact';

export function Hero({ locale = 'fr' }: { locale?: Locale }) {
  const home = getHomeContent(locale), copy = homeCopy[locale];
  const introductionLines = locale === 'en' ? [home.introduction] : home.introduction.replace('artificielle, ', 'artificielle,|').replace('au service ', 'au service|').split('|');
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-visual">
        <picture>
          <Image className="hero-portrait" src="/assets/photos/hero-retouched.png" alt={copy.portrait} width={1386} height={1135} sizes="(max-width: 600px) 100vw, 55vw" preload />
        </picture>

      </div>
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{home.eyebrow}</p>
          <h1 id="hero-title"><span>Salah-Eddine</span><span>MIMOUNI</span></h1>
          <p className="hero-subtitle">{home.subtitle}<strong>{home.specialty}</strong></p>
          <p className="hero-intro">{introductionLines.map((line, i) => <span key={line}>{line}{i < introductionLines.length - 1 ? ' ' : ''}</span>)}</p>
          <div className="hero-actions">
            <LocalizedLink className="button" href="/a-propos">{copy.journey}<ArrowRight size={16} /></LocalizedLink>
            <LocalizedLink className="button button-outline" href={contactLink('conference')}><CalendarDays size={18} />{copy.invite}</LocalizedLink>
          </div>
          <div className="stats" aria-label={copy.stats}>
            {home.stats.map(stat => <div key={stat.value}><span className="stat-dot" /><div><strong>{stat.value}</strong><small>{stat.label}</small></div></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
