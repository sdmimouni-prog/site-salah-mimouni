import { Hero } from '@/components/Hero';
import { Highlights } from '@/components/Highlights';
import { Expertise } from '@/components/Expertise';
import { Companies } from '@/components/Companies';
import { Media } from '@/components/Media';
import { BooksEvents } from '@/components/BooksEvents';
import { Contact } from '@/components/Footer';
import { DemoNotice } from '@/components/primitives';
export default function Home() {
  return <div id="accueil"><main id="main"><Hero/><div className="content-wrap"><Highlights/><Expertise/><Companies/><div id="media"><Media/></div><BooksEvents/></div><Contact/></main><DemoNotice/></div>;
}
