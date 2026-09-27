'use client';
import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, Expand, Images, X } from 'lucide-react';
import { home } from '@/content/home';
export function Gallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState(0);
  const open = (index: number, button: HTMLButtonElement) => { opener.current = button; setSelected(index); dialog.current?.showModal(); };
  const change = (direction: number) => setSelected(i => (i + direction + home.gallery.length) % home.gallery.length);
  const close = () => dialog.current?.close();
  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      change(event.key === 'ArrowRight' ? 1 : -1);
    }
    if (event.key === 'Tab') {
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  };
  return <><div className="gallery-grid">{home.gallery.map((photo,i) => <button className="gallery-item" type="button" key={photo.src} onClick={event => open(i,event.currentTarget)} aria-label={`Agrandir la photo ${i+1} : ${photo.alt}`}><img src={photo.src} alt={photo.alt} loading="lazy"/><Expand size={17} aria-hidden="true"/></button>)}<button type="button" className="gallery-count" onClick={event => open(0,event.currentTarget)}><Images size={23}/><strong>{home.gallery.length} photos</strong><span>Voir la galerie</span></button></div><dialog ref={dialog} className="lightbox" aria-labelledby="lightbox-title" onClose={() => opener.current?.focus()} onClick={event => { if(event.target === event.currentTarget) close(); }} onKeyDown={onKeyDown}><div className="lightbox-panel"><button autoFocus className="lightbox-close" type="button" onClick={close} aria-label="Fermer la galerie"><X/></button><h2 id="lightbox-title">Events & galerie</h2><img src={home.gallery[selected].src} alt={home.gallery[selected].alt}/><p>{home.gallery[selected].alt}</p><small>Photographie originale fournie par Salah-Eddine Mimouni</small><div className="lightbox-controls"><button type="button" onClick={() => change(-1)} aria-label="Photo précédente"><ArrowLeft/></button><span aria-live="polite">{selected+1} / {home.gallery.length}</span><button type="button" onClick={() => change(1)} aria-label="Photo suivante"><ArrowRight/></button></div></div></dialog></>;
}
