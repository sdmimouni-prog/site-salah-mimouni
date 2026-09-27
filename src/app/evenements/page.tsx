import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, CalendarDays, Clock3, MapPin } from 'lucide-react';
import { eventsPage as content } from '@/content/events';
import { theBridge } from '@/content/agenda';
import { VideoDialog } from '@/components/VideoDialog';
import s from './events.module.css';

export const metadata: Metadata = {
  title: content.title, description: content.description,
  openGraph: {
    title: content.title, description: content.description, type: 'website', locale: 'fr_FR',
    images: [{ url: theBridge.poster.src, width: 1080, height: 1920, alt: theBridge.poster.alt }],
  },
};

export default function EventsPage() {
  return <main className={s.page}>
    <section id="evenements" className={s.hero} aria-labelledby="events-title">
      <article id="agenda" className={`${s.frame} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <p className={s.eyebrow}>{content.hero.eyebrow}</p>
          <h1 id="events-title">{content.hero.title.map((line, index) => index === 0 ? <span key={line}>{line}</span> : <em key={line}>{line}</em>)}</h1>
          <p className={s.eventType}>Networking Day</p>
          <p className={s.intro}>{content.hero.introduction}</p>
          <ul className={s.details} aria-label="Informations pratiques">
            <li><CalendarDays size={21} aria-hidden="true"/><time dateTime={theBridge.date}>{new Intl.DateTimeFormat('fr-MA', { dateStyle: 'long', timeZone: 'Africa/Casablanca' }).format(new Date(theBridge.date))}</time></li>
            <li><MapPin size={21} aria-hidden="true"/><span>{theBridge.location}</span></li>
            <li><Clock3 size={21} aria-hidden="true"/><span>{theBridge.hours}</span></li>
          </ul>
          <div className={s.actions}>
            <a className="button" href={theBridge.registrationUrl} target="_blank" rel="noopener noreferrer">{content.hero.discover}<ArrowRight size={18}/></a>
            <a className={s.textLink} href={content.contactHref}>{content.hero.invite}<ArrowRight size={19}/></a>
          </div>
        </div>
        <figure className={s.heroMedia}>
          <div className={s.poster}>
            <Image src={theBridge.poster.src} alt={theBridge.poster.alt} width={1080} height={1920} sizes="(max-width: 600px) 80vw, 340px" preload/>
            <VideoDialog/>
          </div>
          <figcaption>{content.hero.caption}</figcaption>
        </figure>
      </article>
    </section>
    <section className={s.contact} aria-labelledby="events-contact-title"><div className={s.frame}>
      <div><p className={s.eyebrow}>{content.cta.eyebrow}</p><h2 id="events-contact-title">{content.cta.title}</h2><p>{content.cta.description}</p></div>
      <a className="button" href={content.contactHref}>{content.cta.action}<ArrowRight size={20}/></a>
    </div></section>
  </main>;
}
