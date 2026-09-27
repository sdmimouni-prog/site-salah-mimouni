import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, BookOpen, Mail, MessageCircle, Mic, Phone, Sparkles } from 'lucide-react';
import { contact, contactSubject } from '@/content/contact';
import { contactMailConfig } from '@/lib/contact-service';
import { ContactForm } from '@/components/contact/ContactForm';
import s from './contact.module.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://127.0.0.1:3009'),
  title: 'Contact — Salah Eddine Mimouni',
  description: 'Une conférence, un podcast, une interview ou un projet à construire ensemble ? Contactez Salah Eddine Mimouni.',
  openGraph: { title: 'Tout commence par une conversation — Salah Eddine Mimouni', description: 'Conférences, podcasts, rencontres littéraires et collaborations : faisons le premier pas.', type: 'website', locale: 'fr_FR', images: [{ url: contact.portrait, alt: 'Portrait de Salah Eddine Mimouni' }] },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const initialSubject = contactSubject((await searchParams).objet);
  return <main className={s.page}>
    <section className={s.mainSection} aria-labelledby="contact-page-title"><div className={`${s.frame} ${s.mainGrid}`}>
      <div className={s.introduction}><p className={s.eyebrow}>CONTACT & COLLABORATIONS</p><h1 id="contact-page-title"><span>Tout commence</span><span>par une</span><em>conversation.</em></h1>
        <p className={s.intro}>Une conférence, un podcast, une interview ou un projet à construire ensemble&nbsp;? Échangeons.</p>
        <div className={s.author}><div className={s.portrait}><Image src={contact.portrait} alt="Portrait original de Salah Eddine Mimouni" fill sizes="(max-width: 600px) 110px, 155px" style={{ objectFit: 'cover', objectPosition: 'center 18%' }} preload/></div>
          <div><p className={s.eyebrow}>FAISONS CONNAISSANCE</p><h2>Salah Eddine<br/>{' '}Mimouni</h2><p className={s.signature}>Entrepreneur · Auteur · Conférencier</p><p className={s.authorWords}>Des idées à partager.<br/>Des projets à construire.</p></div>
        </div>
        <p className={s.topics}><span>Conférences</span><span>Podcasts & médias</span><span>Collaborations</span></p>
      </div>
      <ContactForm key={initialSubject} initialSubject={initialSubject} available={contactMailConfig(process.env).available}/>
    </div></section>
    <section className={`${s.frame} ${s.direct}`} id="contact-direct" aria-labelledby="direct-title"><div className={s.directHeading}><h2 id="direct-title">Vous préférez un échange direct&nbsp;?</h2><p>Choisissez le canal qui vous convient.</p></div>
      <div className={s.channels}>
        <a href={`mailto:${contact.email}`} className={s.channel}><span className={s.channelIcon}><Mail size={23} aria-hidden="true"/></span><div><span className={s.channelLabel}>PAR E-MAIL</span><strong>{contact.email}</strong></div></a>
        <a href={contact.phoneHref} className={s.channel}><span className={s.channelIcon}><Phone size={23} aria-hidden="true"/></span><div><span className={s.channelLabel}>PAR TÉLÉPHONE</span><strong>{contact.phone}</strong></div></a>
        <a href={contact.whatsappHref} className={`${s.channel} ${s.whatsapp}`} target="_blank" rel="noopener noreferrer"><span className={s.channelIcon}><MessageCircle size={23} aria-hidden="true"/></span><div><span className={s.channelLabel}>SUR WHATSAPP</span><strong>Écrire un message<ArrowRight size={20} aria-hidden="true"/></strong></div></a>
      </div>
    </section>
    <section className={s.closing}><div className={s.frame}><div><h2>Une idée peut devenir une belle rencontre.</h2><p>Conférences, échanges et projets à imaginer ensemble.</p></div><ul><li><Mic size={18} aria-hidden="true"/>Prendre la parole</li><li><BookOpen size={18} aria-hidden="true"/>Partager un regard</li><li><Sparkles size={18} aria-hidden="true"/>Construire ensemble</li></ul></div></section>
  </main>;
}
