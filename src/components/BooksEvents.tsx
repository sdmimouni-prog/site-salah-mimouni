import { LocalizedLink } from '@/components/i18n/LocalizedLink';
import { MapPin, Clock3, ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { getHomeContent, homeCopy } from '@/content/home-localized';
import type { Locale } from '@/lib/i18n';
import { SectionHeading } from './primitives';
import { SectionReveal } from './SectionReveal';
import { BookCover } from './books/BookCover';
export function BooksEvents({ locale = 'fr' }: { locale?: Locale }) {
  const home = getHomeContent(locale), copy = homeCopy[locale];
  return <div className="books-events-columns">
    <section id="livres"><SectionHeading title={copy.books}/>
      {copy.originalBooks && <p className="media-availability">{copy.originalBooks}</p>}
      <SectionReveal className="books-grid">{home.books.map((book, index) =>
        <div className="section-reveal-item" data-reveal="visible" style={{ '--order': index } as CSSProperties} key={book.title}>
          <article className="book-card card"><LocalizedLink className="homepage-book-cover" href={book.url} aria-label={`${copy.explore} ${book.title}`}><BookCover book={book} locale={locale}/></LocalizedLink><div><h3 lang="fr">{book.title}</h3><p className="muted">{book.subtitle}</p><strong className="book-home-price">{book.price} {copy.currency}</strong>{book.url ? <LocalizedLink href={book.url} className="text-link">{copy.viewBook}<ArrowRight size={14}/></LocalizedLink> : <button className="text-link book-action" disabled title={copy.bookMissing}>{copy.viewBook}<ArrowRight size={14}/></button>}</div></article>
        </div>
      )}</SectionReveal>
    </section>
    <section id="events"><SectionHeading title={copy.events} link={copy.viewEvent} href="/evenements"/>
      <SectionReveal className="events-list">
        <div className="events card section-reveal-item" data-reveal="visible" style={{ '--order': 1 } as CSSProperties}>{home.events.map(event => <article className="event" key={event.id}><time className="event-date" dateTime={event.date}><strong>{event.day}</strong><span>{event.month}</span><small>{event.year}</small></time><div><p className="event-type"><span/>{copy.upcoming} · {event.type}</p><h3>{event.title}</h3><p className="event-location"><MapPin size={13}/>{event.location}</p>{event.hours && <p className="event-location event-hours"><Clock3 size={13}/>{event.hours}</p>}{event.registrationUrl && <LocalizedLink className="event-official" href={event.registrationUrl} target="_blank" rel="noopener noreferrer">{copy.officialSite}<ArrowRight size={14}/></LocalizedLink>}</div></article>)}</div>
      </SectionReveal>
    </section>
  </div>;
}
