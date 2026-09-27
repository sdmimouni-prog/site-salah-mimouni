import { Brain, ChartNoAxesColumnIncreasing, Lightbulb, UserRound, Orbit, Play, ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { getHomeContent, homeCopy } from '@/content/home-localized';
import type { Locale } from '@/lib/i18n';
import { SectionHeading } from './primitives';
import { SectionReveal } from './SectionReveal';
const icons = [Brain, ChartNoAxesColumnIncreasing, Lightbulb, UserRound, Orbit];
export function Media({ locale = 'fr' }: { locale?: Locale }) {
  const home = getHomeContent(locale), copy = homeCopy[locale];
  return <div className="media-columns">
    <section id="interventions">
      <SectionHeading title={copy.talks}/>
      <SectionReveal className="intervention-grid">
        <div className="section-reveal-item" data-reveal="visible">
          <article className="conference-card card">
            <div className="conference-image"><img src={home.conference.image} alt={copy.studio} loading="lazy"/></div>
            <div className="conference-copy">
              <p className="category category-pill"><span/>{copy.conference}</p>
              <h3>{locale === 'en' ? home.conference.title : home.conference.title.split(" : ").map((line, index) => <span key={line}>{line}{index === 0 ? "\u00a0:" : ""}</span>)}</h3><p className="muted">{home.conference.description}</p>
              {home.conference.videoUrl ? <a href={home.conference.videoUrl} className="media-watch">{copy.watch}<ArrowRight size={17}/></a> : <button className="media-watch" disabled title={copy.videoMissing} aria-label={`${copy.watch} — ${copy.videoMissing}`}>{copy.watch}<ArrowRight size={17}/></button>}
            </div>
          </article>
        </div>
        <div className="section-reveal-item" data-reveal="visible" style={{ '--order': 1 } as CSSProperties}>
          <div className="topics card"><h3>{copy.topics}</h3><ul>{home.topics.map((topic, i) => { const Icon = icons[i]; return <li key={topic}><Icon size={20} aria-hidden="true"/>{topic}</li>; })}</ul></div>
        </div>
      </SectionReveal>
      {!home.conference.videoUrl && <p className="media-availability">{copy.videoSoon}</p>}
    </section>
    <section id="podcasts">
      <SectionHeading title={copy.podcasts} href="/podcasts" link={copy.allEpisodes}/>
      <SectionReveal className="episodes card">{home.episodes.map((item, index) =>
        <div className="section-reveal-item" data-reveal="visible" style={{ '--order': index + 2 } as CSSProperties} key={item.title}>
          <article className="episode">
            <div className="episode-image"><img src={item.image} alt={`${copy.thumbnail} — ${item.title}`} loading="lazy"/></div>
            {item.sourceUrl ? <a className="play" href={item.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${copy.listen} — ${item.title}`}><Play size={18} fill="currentColor"/></a> : <button className="play" type="button" disabled title={copy.audioMissing} aria-label={`${copy.playbackUnavailable}: ${item.title}`}><Play size={18} fill="currentColor"/></button>}
            <div className="episode-copy"><h3 dir="auto">{item.title}</h3><p>{item.show}<span>·</span>{item.duration}</p></div>
            {item.sourceUrl ? <a className="episode-action" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">{copy.listen}<ArrowRight size={13}/></a> : <button className="episode-action" disabled title={copy.audioMissing} aria-label={`${copy.listen} — ${item.title} — ${copy.audioMissing}`}>{copy.listen}<ArrowRight size={13}/></button>}
          </article>
        </div>
      )}</SectionReveal>
      {home.episodes.some(item => !item.sourceUrl) && <p className="media-availability">{copy.episodesSoon}</p>}
    </section>
  </div>;
}
