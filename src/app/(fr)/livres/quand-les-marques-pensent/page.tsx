import { pageMetadata } from '@/lib/page-metadata';
import Content, { metadata as frenchMetadata } from '@/components/pages/MarquesContent';
export const metadata = pageMetadata(frenchMetadata, '/livres/quand-les-marques-pensent', 'fr');
export default function Page() { return <Content/>; }
