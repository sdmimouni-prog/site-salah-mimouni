import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from '@/components/SiteChrome';
import { isIndexable, siteName, siteUrl } from '@/lib/seo';
import './globals.css';
import './homepage.css';
import './sections.css';
import './media.css';
import './books-footer.css';
import './fullscreen.css';
import './livres/books.css';
import './original-media.css';
export const metadata: Metadata = {
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
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="fr"><body><a className="skip-link" href="#site-content">Aller au contenu</a><SiteHeader/><div id="site-content" tabIndex={-1}>{children}</div><SiteFooter/></body></html>; }
