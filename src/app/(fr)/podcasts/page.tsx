import type { Metadata } from 'next';
import { PodcastsPage } from '@/components/podcasts/PodcastsPage';
import { podcastEpisodes, podcastHero } from '@/content/podcasts';
import { visibleEpisodes } from '@/lib/podcasts';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Podcasts — Salah-Eddine MIMOUNI',
  description: 'Des conversations qui font avancer : entrepreneuriat, intelligence artificielle, marketing, société et parcours inspirants.',
  openGraph: { title: 'Des conversations qui font avancer — Salah-Eddine MIMOUNI', description: 'Comprendre, transmettre et construire à travers le podcast.', type: 'website', locale: 'fr_FR', images: [{ url: podcastHero.image, alt: podcastHero.alt }] },
};
export default function Page() {
  const preview = process.env.PODCASTS_PREVIEW === 'true';
  return <PodcastsPage preview={preview} episodes={visibleEpisodes(podcastEpisodes, preview)}/>;
}
