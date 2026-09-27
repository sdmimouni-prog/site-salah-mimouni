'use client';
import { useState } from 'react';
import { Play } from 'lucide-react';
import { MediaDialog } from './media/MediaDialog';
export function VideoDialog() {
  const [open, setOpen] = useState(false);
  return <><button className="round-link" type="button" aria-label="Voir le témoignage The Bridge" onClick={() => setOpen(true)}><Play size={17} fill="currentColor" strokeWidth={0}/></button><MediaDialog item={open ? { id: 'the-bridge', title: 'The Bridge · Témoignage', source: { kind: 'video', url: '/videos/salah-eddine-mimouni.mp4' }, poster: '/assets/photos/testimonial.jpeg' } : null} onClose={() => setOpen(false)}/></>;
}
