import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteRoutes, findRoute } from '@/lib/i18n';
import { HomeContent } from '@/components/HomeContent';
import { englishHomeSeo, isIndexable, siteName } from '@/lib/seo';
import AboutContent from '@/components/pages/AboutContent';
import ArticlesContent from '@/components/pages/ArticlesContent';
import { PodcastsPage } from '@/components/podcasts/PodcastsPage';
import { podcastEpisodes } from '@/content/podcasts';
import { visibleEpisodes } from '@/lib/podcasts';
import { englishPageMetadata } from '@/lib/page-metadata';
import LibraryContent from '@/components/pages/LibraryContent';
import EventsContent from '@/components/pages/EventsContent';
import ContactContent from '@/components/pages/ContactContent';
import AncienPauvreContent from '@/components/pages/AncienPauvreContent';
import MarquesContent from '@/components/pages/MarquesContent';
import BookContent from '@/components/pages/BookContent';

type Props = {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamicParams = false;
export function generateStaticParams() {
  return siteRoutes.map(route => ({ path: route.en.slice(3).split('/').filter(Boolean) }));
}

async function currentRoute(params: Props['params']) {
  const segments = (await params).path || [];
  return findRoute('/en' + (segments.length ? '/' + segments.join('/') : ''));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = await currentRoute(params);
  if (!route) notFound();
  if (route.id === 'home') return {
    title: englishHomeSeo.title,
    description: englishHomeSeo.description,
    alternates: { canonical: '/en', languages: { fr: '/', en: '/en', 'x-default': '/' } },
    robots: isIndexable
      ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } }
      : { index: false, follow: false },
    openGraph: {
      type: 'website', locale: 'en_GB', alternateLocale: 'fr_MA', siteName, url: '/en',
      title: englishHomeSeo.title, description: englishHomeSeo.description,
      images: [{ url: englishHomeSeo.image, width: 1200, height: 630, alt: englishHomeSeo.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image', title: englishHomeSeo.title, description: englishHomeSeo.description,
      images: [{ url: englishHomeSeo.image, alt: englishHomeSeo.imageAlt }],
    },
  };
  return englishPageMetadata(route);
}

export default async function EnglishPage({ params, searchParams }: Props) {
  const route = await currentRoute(params);
  if (!route) notFound();
  let content: React.ReactNode;
  switch (route.id) {
    case 'home': return <HomeContent locale="en"/>;
    case 'about': content = <AboutContent locale="en"/>; break;
    case 'articles': content = <ArticlesContent locale="en"/>; break;
    case 'podcasts': content = <PodcastsPage preview={process.env.PODCASTS_PREVIEW === 'true'} episodes={visibleEpisodes(podcastEpisodes, process.env.PODCASTS_PREVIEW === 'true')}/>; break;
    case 'books': content = <LibraryContent locale="en"/>; break;
    case 'events': content = <EventsContent locale="en"/>; break;
    case 'contact': content = <ContactContent locale="en" searchParams={searchParams}/>; break;
    case 'ancien-pauvre': content = <AncienPauvreContent locale="en"/>; break;
    case 'marques': content = <MarquesContent locale="en"/>; break;
    case 'entre-deux-vols': content = <BookContent locale="en" params={Promise.resolve({ slug: 'entre-deux-vols' })}/>; break;
    case 'like': content = <BookContent locale="en" params={Promise.resolve({ slug: 'pour-un-like-de-plus' })}/>; break;
  }
  return content;
}
