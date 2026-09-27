import { ArrowRight, CircleHelp } from 'lucide-react';
import type { ReactNode } from 'react';

export function Brand() {
  return <a className="brand" href="/" aria-label="Salah-Eddine MIMOUNI — accueil"><span className="monogram" aria-hidden="true"><img src="/assets/brand-monogram.webp" alt="" /></span><span><strong>Salah-Eddine MIMOUNI</strong><small>Entrepreneur • Auteur • Conférencier</small></span></a>;
}
export function SectionHeading({ title, href, link, demo = false }: { title: string; href?: string; link?: string; demo?: boolean }) {
  return <div className="section-heading"><h2>{title}<span className="heading-mark" aria-hidden="true" /></h2>{demo && <span className="demo-tag">À valider</span>}{href && <a className="section-link" href={href}>{link}<ArrowRight size={13}/></a>}</div>;
}
export function SourceAction({ href, children, unavailable = 'Lien à renseigner', className = '', download = false }: { href: string | null; children: ReactNode; unavailable?: string; className?: string; download?: boolean }) {
  return href ? <a className={className} href={href} download={download || undefined}>{children}</a> : <span className={`unavailable-action ${className}`}><button type="button" disabled title={unavailable}>{children}</button><small>{unavailable}</small></span>;
}
export function DemoNotice() {
  return <aside className="demo-notice"><CircleHelp size={14}/><p><strong>Aperçu de démonstration.</strong> Chiffres, citation et dates des événements à valider. Photographies originales intégrées.</p><a href="#contenus">Détails</a></aside>;
}
