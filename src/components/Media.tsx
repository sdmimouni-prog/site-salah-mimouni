import { Brain, ChartNoAxesColumnIncreasing, Lightbulb, UserRound, Orbit, Play, ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { home } from '@/content/home';
import { SectionHeading } from './primitives';
import { SectionReveal } from './SectionReveal';
const icons = [Brain, ChartNoAxesColumnIncreasing, Lightbulb, UserRound, Orbit];
export function Media() {
  return <div className="media-columns">
    <section id="interventions">
      <SectionHeading title="Interventions"/>
      <SectionReveal className="intervention-grid">
        <div className="section-reveal-item" data-reveal="visible">
          <article className="conference-card card">
            <div className="conference-image"><img src={home.conference.image} alt="Salah-Eddine MIMOUNI en studio" loading="lazy"/></div>
            <div className="conference-copy">
              <p className="category category-pill"><span/>Conférence</p>
              <h3>{home.conference.title.split(" : ").map((line, index) => <span key={line}>{line}{index === 0 ? "\u00a0:" : ""}</span>)}</h3><p className="muted">{home.conference.description}</p>
              {home.conference.videoUrl ? <a href={home.conference.videoUrl} className="media-watch">Voir la vidéo<ArrowRight size={17}/></a> : <button className="media-watch" disabled title="Vidéo à fournir" aria-label="Voir la vidéo — vidéo à fournir">Voir la vidéo<ArrowRight size={17}/></button>}
            </div>
          </article>
        </div>
        <div className="section-reveal-item" data-reveal="visible" style={{ '--order': 1 } as CSSProperties}>
          <div className="topics card"><h3>Thématiques d’intervention</h3><ul>{home.topics.map((topic, i) => { const Icon = icons[i]; return <li key={topic}><Icon size={20} aria-hidden="true"/>{topic}</li>; })}</ul></div>
        </div>
      </SectionReveal>
      {!home.conference.videoUrl && <p className="media-availability">Vidéo à venir.</p>}
    </section>
    <section id="podcasts">
      <SectionHeading title="Podcasts & médias" href="/podcasts" link="Tous les épisodes"/>
      <SectionReveal className="episodes card">{home.episodes.map((item, index) =>
        <div className="section-reveal-item" data-reveal="visible" style={{ '--order': index + 2 } as CSSProperties} key={item.title}>
          <article className="episode">
            <div className="episode-image"><img src={item.image} alt={`Miniature YouTube — ${item.title}`} loading="lazy"/></div>
            {item.sourceUrl ? <a className="play" href={item.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Écouter ${item.title}`}><Play size={18} fill="currentColor"/></a> : <button className="play" type="button" disabled title="Audio à fournir" aria-label={`Lecture indisponible : ${item.title}`}><Play size={18} fill="currentColor"/></button>}
            <div className="episode-copy"><h3 dir="auto">{item.title}</h3><p>{item.show}<span>·</span>{item.duration}</p></div>
            {item.sourceUrl ? <a className="episode-action" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Écouter<ArrowRight size={13}/></a> : <button className="episode-action" disabled title="Audio à fournir" aria-label={`Écouter ${item.title} — audio à fournir`}>Écouter<ArrowRight size={13}/></button>}
          </article>
        </div>
      )}</SectionReveal>
      {home.episodes.some(item => !item.sourceUrl) && <p className="media-availability">Épisodes à venir.</p>}
    </section>
  </div>;
}
