import Image from 'next/image';
import { eventsPage, type EventVisual as Visual } from '@/content/events';
import s from '@/app/evenements/events.module.css';

export function EventVisual({ visual, hero = false, contain = false }: { visual: Visual; hero?: boolean; contain?: boolean }) {
  if (visual.kind === 'books') {
    return <div className={s.bookCollection} role="img" aria-label={visual.alt}>
      {eventsPage.covers.map(cover => <div className={s.book} key={cover.src}>
        <Image src={cover.src} alt="" fill sizes="(max-width: 600px) 28vw, 180px" style={{ objectFit: 'contain' }}/>
      </div>)}
    </div>;
  }
  return <Image src={visual.src} alt={visual.alt} fill
    sizes={contain ? '(max-width: 900px) 90vw, 1000px' : hero ? '(max-width: 800px) 90vw, 650px' : '(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 430px'}
    preload={hero} style={{ objectFit: contain ? 'contain' : 'cover', objectPosition: contain ? 'center' : visual.position }}/>
}
