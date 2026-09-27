import { homeStructuredData } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Highlights } from '@/components/Highlights';
import { Expertise } from '@/components/Expertise';
import { Companies } from '@/components/Companies';
import { Media } from '@/components/Media';
import { BooksEvents } from '@/components/BooksEvents';
import { Contact } from '@/components/Footer';
import { DemoNotice } from '@/components/primitives';
export function HomeContent({ structuredData = true }: { structuredData?: boolean }) {
  return <div id="accueil">{structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData).replace(/</g, '\\u003c') }}/>}<main id="main"><Hero/><div className="content-wrap"><Highlights/><Expertise/><Companies/><div id="media"><Media/></div><BooksEvents/></div><Contact/></main><DemoNotice/></div>;
}
