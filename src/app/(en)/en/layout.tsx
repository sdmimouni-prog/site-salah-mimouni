import type { Metadata } from 'next';
import { SiteLayout } from '@/components/SiteLayout';
import { siteMetadata } from '@/lib/site-metadata';
import { isIndexable } from '@/lib/seo';

export const metadata: Metadata = {
  ...siteMetadata,
  title: 'Salah-Eddine MIMOUNI — Entrepreneur, Author & Speaker',
  description: 'Explore the books, podcasts and work of Salah-Eddine MIMOUNI.',
  // The English routes currently reuse French content. Enable indexing and
  // reciprocal hreflang only as each page receives its full translation.
  robots: { index: false, follow: isIndexable, googleBot: { index: false, follow: isIndexable } },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
