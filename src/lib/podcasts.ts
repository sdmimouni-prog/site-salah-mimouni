import type { PodcastEpisode } from '../content/podcasts';

export const normalizeSearch = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('fr').trim();
export function filterEpisodes(episodes: PodcastEpisode[], query: string, topic: string) {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  return episodes.filter(episode => {
    const haystack = normalizeSearch([episode.title, episode.originalTitle || '', episode.showName || '', episode.description, ...(episode.guests || []), ...episode.topics].join(' '));
    return (!topic || episode.topics.includes(topic)) && terms.every(term => haystack.includes(term));
  });
}
export function sortEpisodes(episodes: PodcastEpisode[]) {
  const date = (value: string | null) => value && Number.isFinite(Date.parse(value)) ? Date.parse(value) : -Infinity;
  return [...episodes].sort((a, b) => {
    const left = date(a.publishedAt), right = date(b.publishedAt);
    return left === right ? 0 : right > left ? 1 : -1;
  });
}
export function visibleEpisodes(episodes: PodcastEpisode[], preview: boolean) { return sortEpisodes(episodes.filter(episode => preview || episode.status === 'published')); }
export function safeMediaUrl(value: string | null) {
  if (!value) return null;
  if (/^\/(?!\/)[^\s\\]*$/.test(value)) return value;
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : null; } catch { return null; }
}
export function youtubeId(value: string | null) {
  if (!value) return null;
  if (/^[\w-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    const host = url.hostname.replace(/^www\./, '');
    const id = host === 'youtu.be' ? url.pathname.slice(1).split('/')[0] : ['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host) ? (url.pathname === '/watch' ? url.searchParams.get('v') : /^\/(embed|shorts|live)\//.test(url.pathname) ? url.pathname.split('/')[2] : null) : null;
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}
export type MediaSource = { kind: 'youtube' | 'video' | 'audio' | 'external'; url: string; videoId?: string };
export function episodeSource(episode: Pick<PodcastEpisode, 'videoId' | 'sourceUrl' | 'audioUrl'>): MediaSource | null {
  const videoId = youtubeId(episode.videoId) || youtubeId(episode.sourceUrl);
  if (videoId) return { kind: 'youtube', videoId, url: `https://www.youtube.com/watch?v=${videoId}` };
  const audio = safeMediaUrl(episode.audioUrl);
  if (audio) return { kind: 'audio', url: audio };
  const source = safeMediaUrl(episode.sourceUrl);
  if (source) return { kind: /\.(mp4|webm|mov)(?:[?#]|$)/i.test(source) ? 'video' : /\.(mp3|m4a|ogg|wav)(?:[?#]|$)/i.test(source) ? 'audio' : 'external', url: source };
  return null;
}
export function latestPlayableEpisode(episodes: PodcastEpisode[]) { return sortEpisodes(episodes).find(episode => episode.status === 'published' && episodeSource(episode)); }
export function durationLabel(seconds: number | null) {
  if (!seconds || !Number.isFinite(seconds) || seconds < 0) return null;
  const whole = Math.floor(seconds), minutes = Math.floor(whole / 60), remainder = String(whole % 60).padStart(2, '0');
  return minutes >= 60 ? `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}:${remainder}` : `${minutes}:${remainder}`;
}
export function dateLabel(date: string | null, locale: 'fr' | 'en' = 'fr') {
  if (!date || !Number.isFinite(Date.parse(date))) return null;
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
}
export function platformUrl(value: string | null) {
  const safe = safeMediaUrl(value);
  if (!safe || safe.startsWith('/')) return null;
  const url = new URL(safe);
  return url.pathname.replace(/\//g, '') ? safe : null;
}
