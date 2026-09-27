import { LocalizedLink } from '@/components/i18n/LocalizedLink';
import { ArrowRight, CircleHelp } from 'lucide-react';
import type { ReactNode } from 'react';
import { localizedHref, navigationCopy, type Locale } from '@/lib/i18n';
import { commonCopy } from '@/content/common-copy';

export function Brand({ locale = 'fr' }: { locale?: Locale }) {
  return <LocalizedLink className="brand" href={localizedHref('/', locale)} aria-label={`Salah-Eddine MIMOUNI — ${navigationCopy[locale].home}`}><span className="monogram" aria-hidden="true"><img src="/assets/brand-monogram.webp" alt="" /></span><span><strong>Salah-Eddine MIMOUNI</strong><small>{navigationCopy[locale].brand}</small></span></LocalizedLink>;
}
export function SectionHeading({ title, href, link, demo = false }: { title: string; href?: string; link?: string; demo?: boolean }) {
  return <div className="section-heading"><h2>{title}<span className="heading-mark" aria-hidden="true" /></h2>{demo && <span className="demo-tag">À valider</span>}{href && <LocalizedLink className="section-link" href={href}>{link}<ArrowRight size={13}/></LocalizedLink>}</div>;
}
export function SourceAction({ href, children, unavailable = 'Lien à renseigner', className = '', download = false }: { href: string | null; children: ReactNode; unavailable?: string; className?: string; download?: boolean }) {
  return href ? <LocalizedLink className={className} href={href} download={download || undefined}>{children}</LocalizedLink> : <span className={`unavailable-action ${className}`}><button type="button" disabled title={unavailable}>{children}</button><small>{unavailable}</small></span>;
}
export function DemoNotice({ locale = 'fr' }: { locale?: Locale }) {
  const copy = commonCopy[locale];
  return <aside className="demo-notice"><CircleHelp size={14}/><p><strong>{copy.demoTitle}</strong> {copy.demoDescription}</p><LocalizedLink href="#contenus">{copy.details}</LocalizedLink></aside>;
}
