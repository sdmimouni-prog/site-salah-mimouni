'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Pause, Play, X } from 'lucide-react';
import type { MediaSource } from '@/lib/podcasts';
import s from './media.module.css';
import { useLocale } from '../i18n/LocaleProvider';
import { commonCopy } from '@/content/common-copy';

type YoutubePlayer = { playVideo: () => void; pauseVideo: () => void; destroy: () => void; getIframe: () => HTMLIFrameElement };
type YoutubeAPI = { Player: new (element: HTMLElement, options: Record<string, unknown>) => YoutubePlayer };
type YoutubeWindow = Window & { YT?: YoutubeAPI; onYouTubeIframeAPIReady?: () => void };
let youtubeLoading: Promise<YoutubeAPI> | null = null;
function loadYoutube() {
  const scope = window as YoutubeWindow;
  if (scope.YT?.Player) return Promise.resolve(scope.YT);
  if (!youtubeLoading) youtubeLoading = new Promise<YoutubeAPI>((resolve, reject) => {
    const script = document.createElement('script');
    const previous = scope.onYouTubeIframeAPIReady;
    const timer = setTimeout(() => { script.remove(); youtubeLoading = null; reject(new Error('timeout')); }, 12_000);
    scope.onYouTubeIframeAPIReady = () => { previous?.(); clearTimeout(timer); if (scope.YT) resolve(scope.YT); };
    script.src = 'https://www.youtube.com/iframe_api'; script.async = true;
    script.onerror = () => { clearTimeout(timer); script.remove(); youtubeLoading = null; reject(new Error('unavailable')); };
    document.head.append(script);
  });
  return youtubeLoading;
}

// Shared native-dialog player: used by the existing testimonial and /podcasts.
// Children exist only while open, so closing/unmounting stops every media source.
export function MediaDialog({ item, onClose, onPlaybackChange }: {
  item: { id: string; title: string; source: MediaSource; poster?: string } | null;
  onClose: () => void; onPlaybackChange?: (playing: boolean) => void;
}) {
  const copy = commonCopy[useLocale()];
  const dialog = useRef<HTMLDialogElement>(null), media = useRef<HTMLMediaElement | null>(null);
  const youtubeContainer = useRef<HTMLDivElement>(null), youtube = useRef<YoutubePlayer | null>(null);
  const callback = useRef(onPlaybackChange); callback.current = onPlaybackChange;
  const closeCallback = useRef(onClose); closeCallback.current = onClose;
  const [playing, setPlaying] = useState(false), [error, setError] = useState('');
  const report = (value: boolean) => { setPlaying(value); callback.current?.(value); };

  useEffect(() => {
    if (!item) return;
    const opener = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; dialog.current?.showModal();
    setError(''); report(false);
    let cancelled = false;
    if (item.source.kind === 'youtube' && youtubeContainer.current) {
      const host = document.createElement('div'); youtubeContainer.current.append(host);
      loadYoutube().then(api => {
        if (cancelled) return;
        youtube.current = new api.Player(host, {
          host: 'https://www.youtube-nocookie.com', videoId: item.source.videoId,
          playerVars: { playsinline: 1, origin: location.origin, rel: 0 },
          events: {
            onReady: () => { youtube.current?.getIframe().setAttribute('title', item.title); youtube.current?.playVideo(); },
            onStateChange: (event: { data: number }) => { if (!cancelled) report(event.data === 1); },
            onError: () => { if (!cancelled) { report(false); setError(copy.videoError); } },
          },
        });
      }).catch(() => { if (!cancelled) setError(copy.playerError); });
    } else if (media.current) {
      media.current.play().catch((failure: unknown) => { if (!cancelled) { report(false); setError(failure instanceof DOMException && failure.name === 'NotAllowedError' ? copy.autoplayError : copy.episodeError); } });
    }
    return () => {
      cancelled = true; media.current?.pause(); youtube.current?.destroy(); youtube.current = null;
      youtubeContainer.current?.replaceChildren(); callback.current?.(false);
      dialog.current?.close(); document.body.style.overflow = originalOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [item?.id, item?.source.url, copy]);

  const toggle = () => {
    if (youtube.current) playing ? youtube.current.pauseVideo() : youtube.current.playVideo();
    else if (media.current) { if (playing) media.current.pause(); else media.current.play().catch(() => setError(copy.playbackError)); }
  };
  return <dialog ref={dialog} className={s.dialog} aria-labelledby="shared-media-title" onCancel={event => { event.preventDefault(); closeCallback.current(); }} onClick={event => { if (event.target === event.currentTarget) closeCallback.current(); }} onKeyDown={event => {
    if (event.key !== 'Tab') return;
    const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], audio, video, iframe')];
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }}>
    {item && <div className={s.panel}><div className={s.heading}><h2 id="shared-media-title" dir="auto">{item.title}</h2><button autoFocus type="button" onClick={onClose} aria-label={copy.closePlayer}><X size={23}/></button></div>
      {item.source.kind === 'youtube' && <div className={s.youtube} ref={youtubeContainer}/>}
      {item.source.kind === 'video' && <video ref={element => { media.current = element; }} src={item.source.url} poster={item.poster} controls playsInline preload="none" onPlay={() => { setError(''); report(true); }} onPause={() => report(false)} onEnded={() => report(false)} onError={() => { report(false); setError(copy.localVideoError); }}/ >}
      {item.source.kind === 'audio' && <div className={s.audio}><img src={item.poster} alt=""/><audio ref={element => { media.current = element; }} src={item.source.url} controls preload="none" onPlay={() => { setError(''); report(true); }} onPause={() => report(false)} onEnded={() => report(false)} onError={() => { report(false); setError(copy.audioError); }}/></div>}
      {item.source.kind === 'external' && <p className={s.notice}>{copy.externalEpisode}</p>}
      {error && <p className={s.notice} role="status">{error}</p>}
      <div className={s.controls}>{item.source.kind !== 'external' && <button type="button" onClick={toggle} aria-label={playing ? copy.pauseLabel : copy.playLabel}>{playing ? <Pause size={18}/> : <Play size={18}/>} {playing ? copy.pause : copy.play}</button>}<a href={item.source.url} target="_blank" rel="noopener noreferrer">{copy.openSource}<ExternalLink size={16}/></a></div>
    </div>}
  </dialog>;
}
