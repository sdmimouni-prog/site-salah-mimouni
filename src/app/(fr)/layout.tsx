import { SiteLayout } from '@/components/SiteLayout';
export { siteMetadata as metadata } from '@/lib/site-metadata';

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="fr">{children}</SiteLayout>;
}
