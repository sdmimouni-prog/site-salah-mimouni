import { homeStructuredData, englishHomeStructuredData } from '@/lib/seo';
import type { Locale } from '@/lib/i18n';
import { Hero } from '@/components/Hero';
import { Highlights } from '@/components/Highlights';
import { Expertise } from '@/components/Expertise';
import { Companies } from '@/components/Companies';
import { Media } from '@/components/Media';
import { BooksEvents } from '@/components/BooksEvents';
import { Contact } from '@/components/Footer';
import { DemoNotice } from '@/components/primitives';
export function HomeContent({ locale = 'fr', structuredData = true }: { locale?: Locale; structuredData?: boolean }) {
  return <div id="accueil">{structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locale === 'en' ? englishHomeStructuredData : homeStructuredData).replace(/</g, '\\u003c') }}/>}<main id="main"><Hero locale={locale}/><div className="content-wrap"><Highlights locale={locale}/><Expertise locale={locale}/><Companies locale={locale}/><div id="media"><Media locale={locale}/></div><BooksEvents locale={locale}/></div><Contact locale={locale}/></main><DemoNotice locale={locale}/></div>;
}
