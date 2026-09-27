// Ephemeral browser QA fixture: copy into src/app/qa-podcast-player/page.tsx,
// then remove the route and rebuild before handoff. Never deploy this fixture.
import { PodcastsPage } from '@/components/podcasts/PodcastsPage';
import { podcastEpisodes } from '@/content/podcasts';
export default function Page() {
  const episodes = [
    { ...podcastEpisodes[0], videoId: null, audioUrl: null, id: 'qa-video', title: 'TEST LOCAL — vidéo fournie, pas un épisode', status: 'published' as const, sourceUrl: '/videos/salah-eddine-mimouni.mp4', publishedAt: '2026-09-27' },
    { ...podcastEpisodes[1], videoId: null, sourceUrl: null, id: 'qa-audio', title: 'TEST LOCAL — piste audio du fichier fourni', status: 'published' as const, audioUrl: '/videos/salah-eddine-mimouni.mp4', publishedAt: '2026-09-26' },
    { ...podcastEpisodes[2], videoId: null, sourceUrl: null, id: 'qa-error', title: 'TEST LOCAL — fichier introuvable', status: 'published' as const, audioUrl: '/qa-missing-audio.mp3' },
    { ...podcastEpisodes[3], videoId: null, sourceUrl: null, audioUrl: null, id: 'qa-arabic', title: 'الذّكاء الاصطناعي والمجتمع — اختبار', status: 'demo' as const },
    podcastEpisodes[4],
  ];
  return <PodcastsPage episodes={episodes} preview/>;
}
