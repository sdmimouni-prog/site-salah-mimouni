import { pageMetadata } from '@/lib/page-metadata';
import Content, { metadata as frenchMetadata } from '@/components/pages/ArticlesContent';
export const metadata = pageMetadata(frenchMetadata, '/articles', 'fr');
export default function Page() { return <Content/>; }
