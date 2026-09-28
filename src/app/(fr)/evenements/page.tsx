import { pageMetadata } from '@/lib/page-metadata';
import Content, { metadata as frenchMetadata } from '@/components/pages/EventsContent';
export const metadata = pageMetadata(frenchMetadata, '/evenements', 'fr');
export default function Page() { return <Content/>; }
