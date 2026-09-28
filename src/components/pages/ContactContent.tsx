import type { Locale } from '@/lib/i18n';
import { getTranslator } from '@/lib/translate';
import { LocalizedLink } from '@/components/i18n/LocalizedLink';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, BookOpen, Mail, MessageCircle, Mic, Phone, Sparkles } from 'lucide-react';
import { contact, contactSubject } from '@/content/contact';
import { ContactForm } from '@/components/contact/ContactForm';
import s from '@/app/contact/contact.module.css';

export const metadata: Metadata = {
  title: 'Contact — Salah-Eddine MIMOUNI',
  description: 'Une conférence, un podcast, une interview ou un projet à construire ensemble ? Contactez Salah-Eddine MIMOUNI.',
  openGraph: { title: 'Tout commence par une conversation — Salah-Eddine MIMOUNI', description: 'Conférences, podcasts, rencontres littéraires et collaborations : faisons le premier pas.', type: 'website', locale: 'fr_FR', images: [{ url: contact.portrait, alt: 'Portrait de Salah-Eddine MIMOUNI' }] },
};

export default async function ContactContent({ searchParams, locale = 'fr' }: { searchParams: Promise<Record<string, string | string[] | undefined>>; locale?: Locale }) {
 const t = getTranslator(locale);
  const initialSubject = contactSubject((await searchParams).objet);
  return <main className={s.page}>
    <section className={s.mainSection} aria-labelledby="contact-page-title"><div className={`${s.frame} ${s.mainGrid}`}>
      <div className={s.introduction}><p className={s.eyebrow}>{t("CONTACT & COLLABORATIONS")}</p><h1 id="contact-page-title"><span>{t("Tout commence")}</span><span>{t("par une")}</span><em>{t("conversation.")}</em></h1>
        <p className={s.intro}>{t("Une conférence, un podcast, une interview ou un projet à construire ensemble ? Échangeons.")}</p>
        <div className={s.author}><div className={s.portrait}><Image src={contact.portrait} alt={t("Portrait original de Salah-Eddine MIMOUNI")} fill sizes="(max-width: 600px) 110px, 155px" style={{ objectFit: 'cover', objectPosition: 'center 18%' }} preload/></div>
          <div><p className={s.eyebrow}>{t("FAISONS CONNAISSANCE")}</p><h2>Salah-Eddine<br/>{' '}MIMOUNI</h2><p className={s.signature}>{t("Entrepreneur · Auteur · Conférencier")}</p><p className={s.authorWords}>{t("Des idées à partager.")}<br/>{t("Des projets à construire.")}</p></div>
        </div>
        <p className={s.topics}><span>{t("Conférences")}</span><span>{t("Podcasts & médias")}</span><span>Collaborations</span></p>
      </div>
      <ContactForm key={initialSubject} initialSubject={initialSubject}/>
    </div></section>
    <section className={`${s.frame} ${s.direct}`} id="contact-direct" aria-labelledby="direct-title"><div className={s.directHeading}><h2 id="direct-title">{t("Vous préférez un échange direct ?")}</h2><p>{t("Choisissez le canal qui vous convient.")}</p></div>
      <div className={s.channels}>
        <LocalizedLink href={`mailto:${contact.email}`} className={s.channel}><span className={s.channelIcon}><Mail size={23} aria-hidden="true"/></span><div><span className={s.channelLabel}>{t("PAR E-MAIL")}</span><strong>{contact.email}</strong></div></LocalizedLink>
        <LocalizedLink href={contact.phoneHref} className={s.channel}><span className={s.channelIcon}><Phone size={23} aria-hidden="true"/></span><div><span className={s.channelLabel}>{t("PAR TÉLÉPHONE")}</span><strong>{locale === 'en' ? '+212 661 172 885' : contact.phone}</strong></div></LocalizedLink>
        <LocalizedLink href={contact.whatsappHref} className={`${s.channel} ${s.whatsapp}`} target="_blank" rel="noopener noreferrer"><span className={s.channelIcon}><MessageCircle size={23} aria-hidden="true"/></span><div><span className={s.channelLabel}>{t("SUR WHATSAPP")}</span><strong>{t("Écrire un message")}<ArrowRight size={20} aria-hidden="true"/></strong></div></LocalizedLink>
      </div>
    </section>
    <section className={s.closing}><div className={s.frame}><div><h2>{t("Une idée peut devenir une belle rencontre.")}</h2><p>{t("Conférences, échanges et projets à imaginer ensemble.")}</p></div><ul><li><Mic size={18} aria-hidden="true"/>{t("Prendre la parole")}</li><li><BookOpen size={18} aria-hidden="true"/>{t("Partager un regard")}</li><li><Sparkles size={18} aria-hidden="true"/>{t("Construire ensemble")}</li></ul></div></section>
  </main>;
}
