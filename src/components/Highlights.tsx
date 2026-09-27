import { LocalizedLink } from '@/components/i18n/LocalizedLink';
import { ArrowRight, CalendarDays, ChevronRight, Play } from 'lucide-react';
import { VideoDialog } from './VideoDialog';
import { home } from '@/content/home';
import { SectionHeading } from './primitives';

export function Highlights() {
  return <section className="section" id="actualites" aria-label="En ce moment">
    <SectionHeading title="En ce moment" href="#media" link="Voir toute l’actualité" />
    <div className="news-grid">{home.news.map((item, i) => <article className={`news-card card news-${i}`} key={item.title}>
      <img src={item.image} alt={item.alt} loading="eager" />
      <div className="news-copy"><p className="category"><span />{item.category}</p><h3>{item.title}</h3><p className="muted">{i === 1 && <CalendarDays size={13} />}{item.description}</p>{i === 2 && <LocalizedLink className="text-link" href={item.href}>{item.action}<ArrowRight size={14} /></LocalizedLink>}</div>
      {i === 1 ? <VideoDialog/> : i < 2 && <LocalizedLink className="round-link" href={item.href} aria-label={item.action}>{i === 0 ? <Play size={17} fill="currentColor" strokeWidth={0} /> : <ChevronRight size={18} />}</LocalizedLink>}
    </article>)}</div>
  </section>;
}
