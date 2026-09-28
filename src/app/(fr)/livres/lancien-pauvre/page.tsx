import { pageMetadata } from '@/lib/page-metadata';
import Content, { metadata as frenchMetadata } from '@/components/pages/AncienPauvreContent';
export const metadata = pageMetadata(frenchMetadata, '/livres/lancien-pauvre', 'fr');
export default function Page() { return <Content/>; }
