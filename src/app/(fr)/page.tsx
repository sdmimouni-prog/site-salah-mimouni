import type { Metadata } from 'next';
import { homeSeo, siteName } from '@/lib/seo';
import { HomeContent } from '@/components/HomeContent';
export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    siteName,
    url: '/',
    title: homeSeo.title,
    description: homeSeo.description,
    images: [{ url: homeSeo.image, width: 1200, height: 630, alt: homeSeo.imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeSeo.title,
    description: homeSeo.description,
    images: [{ url: homeSeo.image, alt: homeSeo.imageAlt }],
  },
};
export default function Home() { return <HomeContent/>; }
