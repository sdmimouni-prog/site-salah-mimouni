import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from '@/components/SiteChrome';
import './globals.css';
import './homepage.css';
import './sections.css';
import './media.css';
import './books-footer.css';
import './fullscreen.css';
import './livres/books.css';
import './original-media.css';
export const metadata: Metadata = { title: 'Salah-Eddine Mimouni — Entrepreneur, auteur & conférencier', description: 'Des idées au service d’un impact réel. Découvrez le parcours, les projets et les interventions de Salah-Eddine Mimouni.', robots: { index: false, follow: false } };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="fr"><body><a className="skip-link" href="#site-content">Aller au contenu</a><SiteHeader/><div id="site-content" tabIndex={-1}>{children}</div><SiteFooter/></body></html>; }
