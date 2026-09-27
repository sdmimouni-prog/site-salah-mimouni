import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteRoutes, findRoute } from '@/lib/i18n';
import { HomeContent } from '@/components/HomeContent';
import AboutPage from '@/app/(fr)/a-propos/page';
import ArticlesPage from '@/app/(fr)/articles/page';
import PodcastsPage from '@/app/(fr)/podcasts/page';
import BooksPage from '@/app/(fr)/livres/page';
import EventsPage from '@/app/(fr)/evenements/page';
import ContactPage from '@/app/(fr)/contact/page';
import AncienPauvrePage from '@/app/(fr)/livres/lancien-pauvre/page';
import MarquesPage from '@/app/(fr)/livres/quand-les-marques-pensent/page';
import BookPage from '@/app/(fr)/livres/[slug]/page';

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
  return {
    title: `${route.label.en} — Salah-Eddine MIMOUNI`,
    // These are French-content fallbacks, not finished translations.
    alternates: { canonical: route.fr },
  };
}

export default async function EnglishPage({ params, searchParams }: Props) {
  const route = await currentRoute(params);
  if (!route) notFound();
  let content: React.ReactNode;
  switch (route.id) {
    case 'home': content = <HomeContent structuredData={false}/>; break;
    case 'about': content = <AboutPage/>; break;
    case 'articles': content = <ArticlesPage/>; break;
    case 'podcasts': content = <PodcastsPage/>; break;
    case 'books': content = <BooksPage/>; break;
    case 'events': content = <EventsPage/>; break;
    case 'contact': content = <ContactPage searchParams={searchParams}/>; break;
    case 'ancien-pauvre': content = <AncienPauvrePage/>; break;
    case 'marques': content = <MarquesPage/>; break;
    case 'entre-deux-vols': content = <BookPage params={Promise.resolve({ slug: 'entre-deux-vols' })}/>; break;
    case 'like': content = <BookPage params={Promise.resolve({ slug: 'pour-un-like-de-plus' })}/>; break;
  }
  return <><aside className="translation-notice">This page’s content is currently available in French. English translations are coming soon.</aside><div lang="fr">{content}</div></>;
}
