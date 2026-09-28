import { pageMetadata } from '@/lib/page-metadata';
import Content, { metadata as frenchMetadata } from '@/components/pages/AboutContent';
export const metadata = pageMetadata(frenchMetadata, '/a-propos', 'fr');
export default function Page() { return <Content/>; }
