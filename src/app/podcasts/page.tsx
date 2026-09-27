import type { Metadata } from 'next';
import { PodcastsPage } from '@/components/podcasts/PodcastsPage';
import { podcastEpisodes, podcastHero } from '@/content/podcasts';
import { visibleEpisodes } from '@/lib/podcasts';
import { newsletterMailConfig } from '@/lib/newsletter-service';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://127.0.0.1:3009'),
  title: 'Podcasts — Salah-Eddine MIMOUNI',
  description: 'Des conversations qui font avancer : entrepreneuriat, intelligence artificielle, marketing, société et parcours inspirants.',
  openGraph: { title: 'Des conversations qui font avancer — Salah-Eddine MIMOUNI', description: 'Comprendre, transmettre et construire à travers le podcast.', type: 'website', locale: 'fr_FR', images: [{ url: podcastHero.image, alt: podcastHero.alt }] },
};
export default function Page() {
  const preview = process.env.PODCASTS_PREVIEW === 'true';
  return <PodcastsPage preview={preview} episodes={visibleEpisodes(podcastEpisodes, preview)} newsletterAvailable={newsletterMailConfig(process.env).available}/>;
}
