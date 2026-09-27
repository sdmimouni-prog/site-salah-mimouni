import { LocalizedLink } from '@/components/i18n/LocalizedLink';
import { ArrowRight } from 'lucide-react';
import { home } from '@/content/home';
import { commonCopy } from '@/content/common-copy';
import { Brand, SourceAction } from './primitives';
import { SectionReveal } from './SectionReveal';
import styles from './Contact.module.css';
import { navigationCopy, navigationRoutes, type Locale } from '@/lib/i18n';
export function Contact({ locale = 'fr' }: { locale?: Locale }) {
  const copy = commonCopy[locale];
  return <section id="contact" className={styles.section} aria-labelledby="contact-title"><SectionReveal className={styles.frame}><div className={`${styles.card} section-reveal-item`} data-reveal="visible"><div className={styles.content}><p className={styles.eyebrow}>{copy.contactEyebrow}</p><h2 id="contact-title">{copy.contactTitle}<br/><span>{copy.contactInvitation}</span></h2><p className={styles.description}>{copy.contactDescription}</p><SourceAction href={home.contactUrl} unavailable={copy.contactMissing} className={styles.button}>{copy.contact}<ArrowRight size={20}/></SourceAction></div><figure className={styles.photo}><img src="/assets/photos/studio.jpg" alt={copy.studio} width={5351} height={3567} loading="lazy"/><figcaption>Salah-Eddine MIMOUNI<span>{copy.signature}</span></figcaption></figure></div></SectionReveal></section>;
}
export function Footer({ active = 'home', clean = false, locale = 'fr' }: { active?: string; clean?: boolean; locale?: Locale }) {
  const copy = navigationCopy[locale], common = commonCopy[locale];
  const icons = ['/assets/social-linkedin.webp', '/assets/social-youtube.webp', '/assets/social-instagram.webp'];
  return <><SectionReveal className="footer-reveal"><footer className="footer section-reveal-item" data-reveal="visible"><Brand locale={locale}/><nav aria-label={copy.footer}>{navigationRoutes.map(route => <LocalizedLink href={route[locale]} key={route.id} aria-current={active === route.section ? 'page' : undefined}>{route.label[locale]}</LocalizedLink>)}</nav><div className="socials">{home.socials.filter(item=>item.url).map((item,i) => { const icon = icons[home.socials.indexOf(item)]; return item.url ? <LocalizedLink href={item.url} key={item.name} aria-label={item.name}><img src={icon} width={16} height={16} alt=""/></LocalizedLink> : <button disabled key={item.name} aria-label={`${item.name} — ${common.linkMissing}`} title={`${item.name} — ${common.linkMissing}`}><img src={icon} width={16} height={16} alt=""/></button>; })}</div><small>© {new Date().getFullYear()} Salah-Eddine MIMOUNI. {copy.rights}</small></footer></SectionReveal>{!clean && <details lang={locale} id="contenus" className="content-notes"><summary>{common.notesTitle}</summary><p>{common.notesDescription}</p><ul><li>{common.notesBooks}</li><li>{common.notesLinks}</li></ul></details>}</>;
}
