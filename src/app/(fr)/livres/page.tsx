import { pageMetadata } from '@/lib/page-metadata';
import Content, { metadata as frenchMetadata } from '@/components/pages/LibraryContent';
export const metadata = pageMetadata(frenchMetadata, '/livres', 'fr');
export default function Page() { return <Content/>; }
