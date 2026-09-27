import { SiteHeader, SiteFooter } from './SiteChrome';
import { LocaleProvider } from './i18n/LocaleProvider';
import { navigationCopy, type Locale } from '@/lib/i18n';
import '@/app/globals.css';
import '@/app/homepage.css';
import '@/app/sections.css';
import '@/app/media.css';
import '@/app/books-footer.css';
import '@/app/fullscreen.css';
import '@/app/livres/books.css';
import '@/app/original-media.css';
import '@/app/i18n.css';

export function SiteLayout({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <html lang={locale}><body><LocaleProvider locale={locale}>
    <a className="skip-link" href="#site-content">{navigationCopy[locale].skip}</a>
    <SiteHeader/><div id="site-content" tabIndex={-1}>{children}</div><SiteFooter/>
  </LocaleProvider></body></html>;
}
