import type { Metadata } from 'next';
import { homeSeo, homeStructuredData, siteName } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Highlights } from '@/components/Highlights';
import { Expertise } from '@/components/Expertise';
import { Companies } from '@/components/Companies';
import { Media } from '@/components/Media';
import { BooksEvents } from '@/components/BooksEvents';
import { Contact } from '@/components/Footer';
import { DemoNotice } from '@/components/primitives';
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
export default function Home() {
  return <div id="accueil"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData).replace(/</g, '\\u003c') }}/><main id="main"><Hero/><div className="content-wrap"><Highlights/><Expertise/><Companies/><div id="media"><Media/></div><BooksEvents/></div><Contact/></main><DemoNotice/></div>;
}
