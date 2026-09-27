import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { home } from '@/content/home';
import { SectionHeading } from './primitives';
import { SectionReveal } from './SectionReveal';
const links = ['https://richmedia.ma/', 'https://www.hypeo.ai/fr', 'https://lemonmind.agency/', 'https://richmedia.ma/produits/in-talks/'];
export function Companies() {
  return <section className="section companies-section" id="societes">
    <SectionHeading title="Mes sociétés"/>
    <SectionReveal className="companies-grid">{home.companies.map((company, index) =>
      <div className="section-reveal-item" data-reveal="visible" style={{ '--order': index } as CSSProperties} key={company.name}>
        <a className={`company-card card company-${index}`} href={links[index]} target="_blank" rel="noopener noreferrer" aria-label={`${company.name} — visiter le site (nouvel onglet)`}>
          <div className="company-logo"><img src={company.image} alt={company.name} width={index === 2 ? 842 : 888} height={index === 2 ? 572 : 200} loading="lazy"/></div>
          <p className="muted">{company.description}</p><ArrowUpRight className="company-arrow" size={17} aria-hidden="true"/>
        </a>
      </div>
    )}</SectionReveal>
  </section>;
}
