'use client';
import { useState } from 'react';
import { Play } from 'lucide-react';
import { MediaDialog } from './media/MediaDialog';
import { theBridge } from '@/content/agenda';
export function VideoDialog() {
  const [open, setOpen] = useState(false);
  return <><button className="round-link" type="button" aria-label="Voir le témoignage The Bridge" onClick={() => setOpen(true)}><Play size={17} fill="currentColor" strokeWidth={0}/></button><MediaDialog item={open ? { id: theBridge.id, title: 'The Bridge · Témoignage', source: { kind: 'video', url: theBridge.videoUrl }, poster: theBridge.poster.src } : null} onClose={() => setOpen(false)}/></>;
}
