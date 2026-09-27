'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Image as ImageIcon, MapPin, Mic, UsersRound, X } from 'lucide-react';
import { eventCategories, eventEntries, eventsPage as content, type EventCategory, type EventEntry } from '@/content/events';
import { EventVisual } from './EventVisual';
import { contactLink } from '@/content/contact';
import s from '@/app/evenements/events.module.css';

const categoryIcons = { 'Conférences & panels': Mic, Masterclasses: UsersRound, 'Rencontres littéraires': BookOpen };

function useAccessibleDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);
  const open = (button: HTMLButtonElement) => {
    opener.current = button;
    dialog.current?.showModal();
    setIsOpen(true);
  };
  const close = () => dialog.current?.close();
  const onClose = () => { setIsOpen(false); opener.current?.focus({ preventScroll: true }); };
  return { dialog, open, close, onClose };
}

function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== 'Tab') return;
  const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]'));
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
}

function EventCard({ event, onDiscover }: { event: EventEntry; onDiscover: (event: EventEntry, button: HTMLButtonElement) => void }) {
  const Icon = categoryIcons[event.category];
  return <article className={s.eventCard}>
    <div className={s.cardImage}>
      <EventVisual visual={event.image}/>
      {event.isPlaceholder && <span className={s.imageBadge}>{content.archive.imageBadge}</span>}
      <span className={s.categoryIcon}><Icon size={21} aria-hidden="true"/></span>
    </div>
    <div className={s.cardBody}>
      <p className={s.category}>{event.category}</p><h3>{event.title}</h3><p className={s.description}>{event.description}</p>
      <div className={s.meta}><span><CalendarDays size={13} aria-hidden="true"/>{event.date || content.archive.datePlaceholder}</span><span><MapPin size={13} aria-hidden="true"/>{event.location || content.archive.locationPlaceholder}</span></div>
      <div className={s.cardBottom}><small>{event.isPlaceholder ? content.archive.placeholderTitle : event.status === 'cancelled' ? 'Annulé' : 'Événement confirmé'}</small><button type="button" className={s.textLink} onClick={e => onDiscover(event, e.currentTarget)} aria-label={`Découvrir : ${event.title}`}>{content.archive.discover}<ArrowRight size={17}/></button></div>
    </div>
  </article>;
}

export function EventArchive({ entries = eventEntries }: { entries?: EventEntry[] }) {
  const [category, setCategory] = useState<EventCategory | 'Tous'>('Tous');
  const [selected, setSelected] = useState<EventEntry | null>(null);
  const modal = useAccessibleDialog();
  const filtered = category === 'Tous' ? entries : entries.filter(event => event.category === category);
  const copy = content.archive;
  return <section id="evenements" className={s.archive} aria-labelledby="archive-title"><div className={s.frame}>
    <div className={s.sectionHeading}><div><p className={s.eyebrow}>{copy.eyebrow}</p><h2 id="archive-title">{copy.title}</h2></div><p>{copy.introduction}</p></div>
    <div className={s.filterRow}><div className={s.filters} role="group" aria-label="Filtrer les événements">
      {(['Tous', ...eventCategories] as const).map(item => <button type="button" key={item} aria-pressed={category === item} aria-controls="event-results" className={category === item ? s.filterActive : ''} onClick={() => setCategory(item)}>{item}</button>)}
    </div><p>{copy.note}</p></div>
    <p className={s.srOnly} role="status">{filtered.length} {filtered.length > 1 ? 'fiches affichées' : 'fiche affichée'} · {category}</p>
    <div id="event-results" className={s.eventGrid}>
      {filtered.length ? filtered.map(event => <EventCard key={event.id} event={event} onDiscover={(entry, button) => { setSelected(entry); modal.open(button); }}/>) : <div className={s.emptyState}><CalendarDays size={34} aria-hidden="true"/><h3>{copy.emptyTitle}</h3><p>{copy.emptyDescription}</p><button type="button" className={s.textLink} onClick={() => setCategory('Tous')}>Voir toutes les catégories<ArrowRight size={18}/></button></div>}
    </div>
    <dialog ref={modal.dialog} className={`${s.dialog} ${s.detailsDialog}`} aria-labelledby="event-dialog-title" onClose={modal.onClose} onKeyDown={containFocus} onClick={event => { if (event.target === event.currentTarget) modal.close(); }}>
      <div className={s.detailsPanel}><button autoFocus type="button" className={s.closeButton} aria-label="Fermer la fiche" onClick={modal.close}><X size={22}/></button>
        {selected && <><div className={s.detailImage}><EventVisual visual={selected.image}/>{selected.isPlaceholder && <span className={s.imageBadge}>{copy.imageBadge}</span>}</div>
          <div className={s.detailBody}><p className={s.category}>{selected.category}</p><h2 id="event-dialog-title">{selected.title}</h2><p>{selected.description}</p>
            <div className={s.meta}><span><CalendarDays size={15}/>{selected.date || copy.datePlaceholder}</span><span><MapPin size={15}/>{selected.location || copy.locationPlaceholder}</span></div>
            {selected.isPlaceholder && <aside className={s.detailNote}><strong>{copy.placeholderTitle}</strong><p>{copy.placeholderDescription}</p></aside>}
            <a className="button" href={contactLink(selected.category === 'Rencontres littéraires' ? 'litteraire' : 'conference')}>{content.hero.invite}<ArrowRight size={18}/></a>
          </div></>}
      </div>
    </dialog>
  </div></section>;
}

export function EventGallery() {
  const copy = content.gallery;
  const modal = useAccessibleDialog();
  const [selected, setSelected] = useState(0);
  const current = copy.items[selected];
  const change = (direction: number) => setSelected(index => (index + direction + copy.items.length) % copy.items.length);
  function open(index: number, button: HTMLButtonElement) { setSelected(index); modal.open(button); }
  return <section id="galerie" className={`${s.frame} ${s.gallery}`} aria-labelledby="gallery-title">
    <div className={s.sectionHeading}><div><p className={s.eyebrow}>{copy.eyebrow}</p><h2 id="gallery-title">{copy.title}</h2></div><button type="button" className={s.textLink} onClick={event => open(0, event.currentTarget)}>{copy.explore}<ArrowRight size={20}/></button></div>
    <div className={s.galleryGrid}>{copy.items.map((item, index) => <button type="button" className={s.galleryImage} key={item.title} onClick={event => open(index, event.currentTarget)} aria-label={`Agrandir : ${item.title} — visuel d’illustration`}>
      <EventVisual visual={item.image}/><span className={s.galleryCaption}>{item.title}<ImageIcon size={18} aria-hidden="true"/></span>
    </button>)}</div>
    <div className={s.galleryNotes}><p>{copy.note}</p><span>{copy.topics}</span></div>
    <dialog ref={modal.dialog} className={`${s.dialog} ${s.galleryDialog}`} aria-labelledby="gallery-dialog-title" aria-describedby="gallery-dialog-caption" onClose={modal.onClose} onClick={event => { if (event.target === event.currentTarget) modal.close(); }} onKeyDown={event => {
      containFocus(event);
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); change(event.key === 'ArrowRight' ? 1 : -1); }
    }}>
      <div className={s.lightboxPanel}><div className={s.lightboxHeading}><div><p className={s.eyebrow}>GALERIE ILLUSTRATIVE</p><h2 id="gallery-dialog-title">{current.title}</h2></div><button autoFocus type="button" className={s.closeButton} aria-label="Fermer la galerie" onClick={modal.close}><X size={24}/></button></div>
        <div className={s.lightboxImage}><EventVisual visual={current.image} contain/></div>
        <p id="gallery-dialog-caption" className={s.lightboxCaption}>{current.caption}</p>
        <div className={s.lightboxControls}><button type="button" onClick={() => change(-1)} aria-label="Image précédente"><ArrowLeft size={21}/></button><span aria-live="polite" aria-atomic="true">{selected + 1} / {copy.items.length}<span className={s.srOnly}> · {current.title}</span></span><button type="button" onClick={() => change(1)} aria-label="Image suivante"><ArrowRight size={21}/></button></div>
      </div>
    </dialog>
  </section>;
}
