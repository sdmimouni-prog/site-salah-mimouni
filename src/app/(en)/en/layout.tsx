import type { Metadata } from 'next';
import { SiteLayout } from '@/components/SiteLayout';
import { siteMetadata } from '@/lib/site-metadata';

export const metadata: Metadata = {
  ...siteMetadata,
  title: 'Salah-Eddine MIMOUNI — Entrepreneur, Author & Speaker',
  description: 'Explore the books, podcasts and work of Salah-Eddine MIMOUNI.',

};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
