import type { Metadata } from 'next';
import { isIndexable, siteName, siteUrl } from './seo';
export const siteMetadata: Metadata = {
  metadataBase: siteUrl,
  title: 'Salah-Eddine MIMOUNI — Entrepreneur, auteur & conférencier',
  description: 'Des idées au service d’un impact réel. Découvrez le parcours, les projets et les interventions de Salah-Eddine MIMOUNI.',
  authors: [{ name: siteName, url: siteUrl.href }],
  icons: {
    icon: [{ url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: isIndexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } }
    : { index: false, follow: false },
};
