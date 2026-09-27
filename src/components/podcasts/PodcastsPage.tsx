'use client';
import { LocalizedLink } from '@/components/i18n/LocalizedLink';


import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import { ArrowRight, AudioLines, ChevronDown, Headphones, Pause, Play, Quote, Search, X } from 'lucide-react';
import { podcastChannels, podcastEditorial, podcastHero, podcastPlatforms, podcastStats, podcastTopics, type PodcastEpisode } from '@/content/podcasts';
import { dateLabel, durationLabel, episodeSource, filterEpisodes, latestPlayableEpisode, platformUrl } from '@/lib/podcasts';
import { contactLink } from '@/content/contact';
import { MediaDialog } from '@/components/media/MediaDialog';
import s from '@/app/podcasts/podcasts.module.css';
import { Newsletter } from './Newsletter';

export function PodcastsPage({ episodes, preview }: { episodes: PodcastEpisode[]; preview: boolean }) {
  const [query, setQuery] = useState(''), [topic, setTopic] = useState(''), [limit, setLimit] = useState(4);
  const [selected, setSelected] = useState<PodcastEpisode | null>(null), [open, setOpen] = useState(false), [playing, setPlaying] = useState(false);
  const search = useRef<HTMLInputElement>(null);
  const latest = useMemo(() => latestPlayableEpisode(episodes), [episodes]);
  const featured = selected || latest;
  const matches = useMemo(() => filterEpisodes(episodes, query, topic), [episodes, query, topic]);
  const shown = matches.slice(0, limit);
  const stats = podcastStats.filter(stat => stat.verified && stat.value || preview);
  const platforms = podcastPlatforms.filter(platform => platform.verified && platformUrl(platform.url) || preview);
  const selectedSource = selected ? episodeSource(selected) : null;
  const play = (episode: PodcastEpisode) => { if (!episodeSource(episode)) return; setSelected(episode); setPlaying(false); setOpen(true); };
  const reset = () => { setQuery(''); setTopic(''); setLimit(4); search.current?.focus(); };
  const playButton = (episode: PodcastEpisode | undefined | null, large = false) => {
    const available = !!episode && !!episodeSource(episode);
    const active = episode?.id === selected?.id && playing;
    return <button type="button" className={`${s.play} ${large ? s.playLarge : ''}`} disabled={!available} aria-label={available ? `${active ? 'Mettre en pause' : 'Écouter'} : ${episode!.title}` : 'Lecture indisponible — source à fournir'} title={available ? undefined : 'Source audio ou vidéo à fournir'} onClick={() => episode && play(episode)}>{active ? <Pause size={21} fill="currentColor"/> : <Play size={21} fill="currentColor" strokeWidth={0}/>}</button>;
  };

  return <main className={s.page}>
    <section className={s.hero} aria-labelledby="podcast-title"><div className={`${s.frame} ${s.heroGrid}`}>
      <div className={s.heroCopy}><p className={s.eyebrow}>PODCASTS & MÉDIAS</p><h1 id="podcast-title">Des conversations<em>qui font avancer.</em></h1><p className={s.introduction}>Entrepreneuriat, IA et marketing : retrouvez mes échanges, interviews et interventions pour comprendre les transformations de notre époque.</p>
        <div className={s.heroActions}><button type="button" className="button" disabled={!latest} onClick={() => latest && play(latest)}><Play size={18} fill="currentColor"/>Écouter le dernier épisode</button><LocalizedLink href="#episodes" className={s.textLink}>Voir tous les épisodes<ArrowRight size={17}/></LocalizedLink></div>
        {!latest && <p className={s.sourcePending}>Les sources des épisodes seront ajoutées prochainement.</p>}
        {stats.length > 0 && <div className={s.stats}>{stats.map(stat => <div key={stat.label}><strong>{stat.verified ? stat.value : stat.previewValue}</strong><span>{stat.label}</span></div>)}</div>}
        {preview && stats.some(stat => !stat.verified) && <p className={s.previewNote}>Données à confirmer · aperçu</p>}
      </div>
      <div className={s.heroMedia}><div className={s.studio}><Image src={podcastHero.image} alt={podcastHero.alt} fill sizes="(max-width: 850px) 95vw, 650px" preload/>
        {(preview || podcastHero.inscriptionVerified) && <div className={s.inscription}><p>Partager<br/>pour aller<br/>plus loin.</p><img src={podcastHero.signature} alt="" width={201} height={31}/>{!podcastHero.inscriptionVerified && <small>Texte d’aperçu</small>}</div>}
      </div><div className={s.featured}><div className={s.featuredImage}><Image src={featured?.thumbnail || podcastHero.image} alt="" fill sizes="70px"/></div><div className={s.featuredCopy}><p className={s.eyebrow}>{featured ? playing ? 'ÉPISODE EN COURS' : 'À L’ÉCOUTE' : 'PROCHAINEMENT À L’ÉCOUTE'}</p><h2 dir="auto">{featured?.title || 'Des conversations à découvrir.'}</h2>{!featured && <p className={s.sourcePending}>Épisodes en attente de leurs sources.</p>}</div>{playButton(featured, true)}{featured && durationLabel(featured.duration) && <span className={s.duration}>{durationLabel(featured.duration)}</span>}<AudioLines className={s.soundIcon} size={32} aria-hidden="true"/></div></div>
    </div></section>
    <div className={s.topicStrip}><div className={s.frame}>{podcastTopics.map(label => <span key={label}>{label}</span>)}</div></div>
    <section className={`${s.frame} ${s.catalogue}`} id="episodes" aria-labelledby="episodes-title">
      <div className={s.catalogueHeader}><div><p className={s.eyebrow}>TOUS LES ÉPISODES</p><h2 id="episodes-title">Les derniers épisodes.</h2></div><div className={s.filters}>
        <div className={s.search}><Search size={18} aria-hidden="true"/><label className={s.srOnly} htmlFor="episode-search">Rechercher un épisode</label><input ref={search} id="episode-search" type="search" placeholder="Rechercher un épisode…" value={query} onChange={event => { setQuery(event.target.value); setLimit(4); }}/>{query && <button type="button" aria-label="Effacer la recherche" onClick={() => { setQuery(''); setLimit(4); search.current?.focus(); }}><X size={16}/></button>}</div>
        <div className={s.select}><label className={s.srOnly} htmlFor="episode-topic">Filtrer par thématique</label><select id="episode-topic" value={topic} onChange={event => { setTopic(event.target.value); setLimit(4); }}><option value="">Toutes les thématiques</option>{podcastTopics.map(value => <option key={value}>{value}</option>)}</select><ChevronDown size={15} aria-hidden="true"/></div>
      </div></div>
      <div className={s.catalogueGrid}><div><p className={s.catalogueNote}>Podcasts, interviews et conférences · Dates de publication sur YouTube</p><p className={s.srOnly} role="status">{matches.length} {matches.length > 1 ? 'épisodes trouvés' : 'épisode trouvé'}, {shown.length} affichés.</p>
        <div className={s.episodeList}>{shown.map(episode => {
          const source = episodeSource(episode), date = dateLabel(episode.publishedAt);
          return <article key={episode.id} id={`podcast-episode-${episode.id}`} tabIndex={-1} className={`${s.episodeCard} ${selected?.id === episode.id ? s.selected : ''}`} data-episode-id={episode.id}>
            <button type="button" className={s.thumbnail} onClick={() => play(episode)} disabled={!source} aria-label={`Voir la vidéo : ${episode.title}`}><Image src={episode.thumbnail} alt={`Miniature YouTube — ${episode.title}`} fill sizes="(max-width: 600px) 100px, (max-width: 1150px) 160px, 200px"/></button>
            <div className={s.episodeCopy}><p className={s.meta}>{episode.showName && <span>{episode.showName}</span>}{episode.episodeNumber !== null && <span>Épisode {episode.episodeNumber}</span>}{date && <time dateTime={episode.publishedAt!}>{date}</time>}{episode.role && <span>{episode.role === 'host' ? 'À l’animation' : 'Invité'}</span>}{episode.status === 'demo' && <span className={s.demoBadge}>Démonstration</span>}</p><h3 dir="auto">{episode.title}</h3><p className={s.description} dir="auto">{episode.description}</p><ul className={s.tags}>{episode.topics.map(tag => <li key={tag}>{tag}</li>)}</ul></div>
            <div className={s.episodeControls}>{playButton(episode)}{durationLabel(episode.duration) && <span className={s.duration}>{durationLabel(episode.duration)}</span>}{!source && <span className={s.noSource}>Source à fournir</span>}</div>
          </article>;
        })}</div>
        {!matches.length && <div className={s.empty}><Headphones size={32} aria-hidden="true"/><h3>{episodes.length ? 'Aucun épisode trouvé' : 'Les conversations arrivent bientôt.'}</h3><p>{episodes.length ? 'Essayez un autre mot-clé ou une autre thématique.' : 'Les épisodes seront disponibles ici dès leur publication.'}</p>{episodes.length > 0 && <button type="button" className={s.textLink} onClick={reset}>Réinitialiser les filtres<ArrowRight size={18}/></button>}</div>}
        {shown.length < matches.length && <button type="button" className={s.showAll} onClick={() => { const nextId = matches[shown.length].id; setLimit(matches.length); requestAnimationFrame(() => document.getElementById(`podcast-episode-${nextId}`)?.focus({ preventScroll: true })); }}>Voir tous les épisodes<ArrowRight size={19}/></button>}
      </div><aside className={s.sidebar} aria-label="Plateformes et actualités du podcast">
        {platforms.length > 0 && <section aria-labelledby="platforms-title"><h3 id="platforms-title" className={s.eyebrow}>ÉCOUTER SUR VOS PLATEFORMES PRÉFÉRÉES</h3><ul className={s.platforms}>{platforms.map(platform => { const url = platform.verified ? platformUrl(platform.url) : null; const content = <><span className={`${s.platformIcon} ${s[platform.id]}`}><img src={`/assets/platforms/${platform.id}.svg`} width={25} height={25} alt=""/></span><span className={s.platformName}>{platform.name}</span>{url ? <span className={s.platformAction}>{platform.id === 'youtube' ? 'Voir' : 'Écouter'}<ArrowRight size={13}/></span> : <span className={s.platformPending}>À renseigner</span>}</>; return <li key={platform.id}>{url ? <LocalizedLink href={url} target="_blank" rel="noopener noreferrer" aria-label={`Écouter sur ${platform.name}`}>{content}</LocalizedLink> : <div>{content}</div>}</li>; })}</ul></section>}
        <section aria-labelledby="channels-title"><h3 id="channels-title" className={s.eyebrow}>LES CHAÎNES QUI M’ACCUEILLENT</h3><ul className={s.channels}>{podcastChannels.map(channel => <li key={channel.url}><LocalizedLink href={channel.url} target="_blank" rel="noopener noreferrer"><span>{channel.name}</span><ArrowRight size={15} aria-hidden="true"/></LocalizedLink></li>)}</ul></section>
        {(preview || podcastEditorial.verified) && <figure className={s.quote}><Quote size={30} fill="currentColor" strokeWidth={0} aria-hidden="true"/><blockquote>{podcastEditorial.text}</blockquote><figcaption>{podcastEditorial.author}{!podcastEditorial.verified && <small>Citation d’aperçu · à valider</small>}</figcaption></figure>}
        <Newsletter/>
      </aside></div>
    </section>
    <section className={s.contactBand}><div className={s.frame}><div><p className={s.eyebrow}>UNE IDÉE D’INVITÉ&nbsp;?</p><h2>Une conversation à proposer&nbsp;?</h2><p>Je suis toujours ouvert aux échanges avec des personnes qui ont une histoire à partager.</p></div><LocalizedLink href={contactLink('podcast')} className="button">Me contacter<ArrowRight size={19}/></LocalizedLink></div></section>
    <MediaDialog item={open && selected && selectedSource ? { id: selected.id, title: selected.title, source: selectedSource, poster: selected.thumbnail } : null} onClose={() => { setOpen(false); setPlaying(false); }} onPlaybackChange={setPlaying}/>
  </main>;
}
