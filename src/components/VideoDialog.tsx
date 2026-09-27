'use client';
import { useState } from 'react';
import { Play } from 'lucide-react';
import { MediaDialog } from './media/MediaDialog';
import { theBridge } from '@/content/agenda';
import { useLocale } from './i18n/LocaleProvider';
import { commonCopy } from '@/content/common-copy';
export function VideoDialog() {
  const copy = commonCopy[useLocale()];
  const [open, setOpen] = useState(false);
  return <><button className="round-link" type="button" aria-label={copy.watchTestimonial} onClick={() => setOpen(true)}><Play size={17} fill="currentColor" strokeWidth={0}/></button><MediaDialog item={open ? { id: theBridge.id, title: copy.testimonial, source: { kind: 'video', url: theBridge.videoUrl }, poster: theBridge.poster.src } : null} onClose={() => setOpen(false)}/></>;
}
