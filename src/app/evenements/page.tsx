import type { Metadata } from 'next';
import { ArrowDown, ArrowRight, CalendarDays, MapPin, Mic } from 'lucide-react';
import { eventsPage as content, eventCategories, upcomingEvents } from '@/content/events';
import { EventArchive, EventGallery } from '@/components/events/Interactions';
import { EventVisual } from '@/components/events/EventVisual';
import { VideoDialog } from '@/components/VideoDialog';
import s from './events.module.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://127.0.0.1:3009'),
  title: content.title, description: content.description,
  openGraph: {
    title: content.title, description: content.description, type: 'website', locale: 'fr_FR',
    images: [{ url: '/assets/photos/studio.jpg', width: 5351, height: 3567, alt: content.hero.visual.alt }],
  },
};

function UpcomingEvents() {
  const copy = content.upcoming;
  return <section id="agenda" className={`${s.frame} ${s.upcoming}`} aria-labelledby="agenda-title">
    <div><p className={s.eyebrow}>{copy.eyebrow}</p><h2 id="agenda-title">{copy.title}</h2></div>
    <div className={s.agendaList}>{upcomingEvents.length ? upcomingEvents.map(event => <article key={event.id} className={s.agendaCard}>
      {event.poster ? <div className={s.agendaPoster}><img src={event.poster.src} alt={event.poster.alt} width={1080} height={1920} loading="lazy"/>{event.id === 'the-bridge-2026' && <VideoDialog/>}</div> : <CalendarDays className={s.agendaIcon} size={30} aria-hidden="true"/>}
      <div><p className={s.eyebrow}>{event.type}</p><h3>{event.title}</h3>
        <p><time dateTime={event.date}>{new Intl.DateTimeFormat('fr-MA', { dateStyle: 'long', timeZone: 'Africa/Casablanca' }).format(new Date(event.date))}</time></p>
        <p className={s.agendaLocation}><MapPin size={14} aria-hidden="true"/>{event.location}</p>
        {event.hours && <p>{event.hours}</p>}
        {event.status === 'confirmed' && event.registrationUrl ? <a className={s.textLink} href={event.registrationUrl} target="_blank" rel="noopener noreferrer">Programme & billetterie<ArrowRight size={16}/></a> : <small>{event.status === 'full' ? 'Complet' : event.status === 'cancelled' ? 'Annulé' : 'Inscriptions à venir'}</small>}
      </div>
    </article>) : <div className={s.agendaCard}>
      <CalendarDays className={s.agendaIcon} size={30} aria-hidden="true"/>
      <div><h3>{copy.emptyTitle}</h3><p>{copy.emptyDescription}</p><small className={s.agendaStatus}>{copy.status}</small></div>
    </div>}</div>
  </section>;
}

export default function EventsPage() {
  return <main className={s.page}>
    <section className={s.hero} aria-labelledby="events-title"><div className={`${s.frame} ${s.heroGrid}`}>
      <div className={s.heroCopy}>
        <p className={s.eyebrow}>{content.hero.eyebrow}</p>
        <h1 id="events-title">{content.hero.title.map((line, index) => index < 2 ? <span key={line}>{line}</span> : <em key={line}>{line}</em>)}</h1>
        <p className={s.intro}>{content.hero.introduction}</p>
        <div className={s.actions}>
          <a className="button" href={upcomingEvents.length ? '#agenda' : '#evenements'}>{content.hero.discover}<ArrowDown size={18}/></a>
          <a className={s.textLink} href={content.contactHref}>{content.hero.invite}<ArrowRight size={19}/></a>
        </div>
      </div>
      <div className={s.heroMedia}>
        <div className={s.heroPhoto}><EventVisual visual={content.hero.visual} hero/>
          <span className={s.imageBadge}>{content.hero.badge}</span>
          <p className={s.imageWords}>{content.hero.imageText.map(line => <span key={line}>{line}</span>)}</p>
        </div>
        <div className={s.heroChip}><Mic size={29} aria-hidden="true"/><div><p>{content.hero.chipTitle}</p><small>{content.hero.chipDescription}</small></div></div>
      </div>
    </div></section>
    <div className={s.topicBand}><div className={s.frame}>{eventCategories.map(category => <span key={category}>{category}</span>)}</div></div>
    <UpcomingEvents/>
    <EventArchive/>
    <EventGallery/>
    <section className={s.contact} aria-labelledby="events-contact-title"><div className={s.frame}>
      <div><p className={s.eyebrow}>{content.cta.eyebrow}</p><h2 id="events-contact-title">{content.cta.title}</h2><p>{content.cta.description}</p></div>
      <a className="button" href={content.contactHref}>{content.cta.action}<ArrowRight size={20}/></a>
    </div></section>
  </main>;
}
