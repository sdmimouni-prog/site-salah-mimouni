import { pageMetadata } from '@/lib/page-metadata';
import Content, { metadata as frenchMetadata } from '@/components/pages/ContactContent';
export const metadata = pageMetadata(frenchMetadata, '/contact', 'fr');
export default function Page(props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) { return <Content {...props}/>; }
