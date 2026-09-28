import { pageMetadata } from '@/lib/page-metadata';
import Content, { generateMetadata as frenchMetadata, generateStaticParams } from '@/components/pages/BookContent';
export { generateStaticParams };
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  return pageMetadata(await frenchMetadata(props), `/livres/${(await props.params).slug}`, 'fr');
}
export const dynamicParams = false;
export default function Page(props: {params: Promise<{slug: string}>}) {return <Content {...props}/>;}
