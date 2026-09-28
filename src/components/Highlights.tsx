import { getTranslator } from '@/lib/translate';
import { podcastAudioLanguages } from '@/content/media-languages';
import { youtubeId } from '@/lib/podcasts';
import { ContentLanguage } from '@/components/i18n/ContentLanguage';
import { LocalizedLink } from '@/components/i18n/LocalizedLink';
import { ArrowRight, CalendarDays, ChevronRight, Play } from 'lucide-react';
import { VideoDialog } from './VideoDialog';
import { getHomeContent, homeCopy } from '@/content/home-localized';
import type { Locale } from '@/lib/i18n';
import { SectionHeading } from './primitives';

export function Highlights({ locale = 'fr' }: { locale?: Locale }) {
  const home = getHomeContent(locale), copy = homeCopy[locale], t = getTranslator(locale);
  return <section className="section" id="actualites" aria-label={copy.highlights}>
    <SectionHeading title={copy.highlights} href="#media" link={copy.allNews} />
    <div className="news-grid">{home.news.map((item, i) => <article className={`news-card card news-${i}`} key={item.title}>
      <img src={item.image} alt={i === 0 ? `${copy.thumbnail} — ${t(item.title)}` : item.alt} loading="eager" />
      <div className="news-copy"><p className="category"><span />{item.category}</p><h3>{t(item.title)}</h3><p className="muted">{i === 1 && <CalendarDays size={13} />}{item.description}</p>{i === 0 && <ContentLanguage locale={locale} kind="podcast" audioLanguage={podcastAudioLanguages[youtubeId(home.episodes[0]?.sourceUrl || null) || '']}/>}{i === 2 && <ContentLanguage locale={locale} kind="book"/>}{i === 2 && <LocalizedLink className="text-link" href={item.href}>{item.action}<ArrowRight size={14} /></LocalizedLink>}</div>
      {i === 1 ? <VideoDialog/> : i < 2 && <LocalizedLink className="round-link" href={item.href} aria-label={item.action}>{i === 0 ? <Play size={17} fill="currentColor" strokeWidth={0} /> : <ChevronRight size={18} />}</LocalizedLink>}
    </article>)}</div>
  </section>;
}
