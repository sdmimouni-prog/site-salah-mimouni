import { MapPin, Clock3, ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { home } from '@/content/home';
import { SectionHeading } from './primitives';
import { SectionReveal } from './SectionReveal';
import { BookCover } from './books/BookCover';
export function BooksEvents() {
  return <div className="books-events-columns">
    <section id="livres"><SectionHeading title="Mes livres"/>
      <SectionReveal className="books-grid">{home.books.map((book, index) =>
        <div className="section-reveal-item" data-reveal="visible" style={{ '--order': index } as CSSProperties} key={book.title}>
          <article className="book-card card"><a className="homepage-book-cover" href={book.url} aria-label={`Découvrir ${book.title}`}><BookCover book={book}/></a><div><h3>{book.title}</h3><p className="muted">{book.subtitle}</p><strong className="book-home-price">{book.price} Dhs</strong>{book.url ? <a href={book.url} className="text-link">Voir le livre<ArrowRight size={14}/></a> : <button className="text-link book-action" disabled title="Lien du livre à fournir">Voir le livre<ArrowRight size={14}/></button>}</div></article>
        </div>
      )}</SectionReveal>
    </section>
    <section id="events"><SectionHeading title="Événements" link="Voir l’événement" href="/evenements"/>
      <SectionReveal className="events-list">
        <div className="events card section-reveal-item" data-reveal="visible" style={{ '--order': 1 } as CSSProperties}>{home.events.map(event => <article className="event" key={event.id}><time className="event-date" dateTime={event.date}><strong>{event.day}</strong><span>{event.month}</span><small>{event.year}</small></time><div><p className="event-type"><span/>À venir · {event.type}</p><h3>{event.title}</h3><p className="event-location"><MapPin size={13}/>{event.location}</p>{event.hours && <p className="event-location event-hours"><Clock3 size={13}/>{event.hours}</p>}{event.registrationUrl && <a className="event-official" href={event.registrationUrl} target="_blank" rel="noopener noreferrer">Site officiel<ArrowRight size={14}/></a>}</div></article>)}</div>
      </SectionReveal>
    </section>
  </div>;
}
