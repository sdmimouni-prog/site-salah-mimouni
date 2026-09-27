import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { articles, articleAuthorUrl, articleAuthorPortrait } from '@/content/articles';
import { articleCategories } from '@/lib/articles';
import { ArticleCatalogue } from '@/components/articles/ArticleCatalogue';
import s from './articles.module.css';

export const metadata: Metadata = {
  metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://127.0.0.1:3009'),
  title:'Articles & analyses — Salah-Eddine MIMOUNI',
  description:'Stratégie digitale, acquisition, data et visibilité : découvrez les articles de Salah-Eddine MIMOUNI publiés sur Richmedia.',
  alternates:{canonical:'/articles'},
  openGraph:{title:'Des idées pour comprendre. Des repères pour agir.',description:'Les articles et analyses de Salah-Eddine MIMOUNI publiés sur Richmedia.',url:'/articles',type:'website',locale:'fr_FR',images:[{url:articleAuthorPortrait,alt:'Salah-Eddine MIMOUNI'}]},
};
export default function ArticlesPage() {
  const categories = articleCategories(articles);
  return <main className={s.page}>
    <section className={s.hero} aria-labelledby="articles-title"><div className={`${s.frame} ${s.heroGrid}`}>
      <div className={s.heroCopy}><p className={s.eyebrow}>ARTICLES & ANALYSES</p><h1 id="articles-title">Des idées pour comprendre.<em>Des repères pour agir.</em></h1><p className={s.intro}>Stratégie digitale, acquisition, data et visibilité : retrouvez mes articles publiés sur Richmedia pour nourrir votre réflexion.</p>
        <div className={s.actions}><a className="button" href="#publications">Explorer les articles<ArrowDown size={18} aria-hidden="true"/></a><a className={s.textLink} href={articleAuthorUrl} target="_blank" rel="noopener noreferrer">Ma page auteur Richmedia<ArrowUpRight size={14} aria-hidden="true"/><span className={s.srOnly}> (nouvel onglet)</span></a></div>
        <div className={s.stats}><p><strong>{articles.length}</strong><span>articles publiés</span></p><p><strong>{categories.length}</strong><span>rubriques</span></p><p>Une publication sur <strong className={s.publisherName}>Richmedia</strong></p></div>
      </div>
      <aside className={s.authorCard} aria-label="Le regard de l’auteur"><div className={s.portrait}><Image src={articleAuthorPortrait} alt="Portrait original de Salah-Eddine MIMOUNI" fill sizes="(max-width: 600px) 43vw, 220px" preload/></div><div className={s.authorCopy}><p className={s.eyebrow}>LE REGARD DE L’AUTEUR</p><h2>Salah-Eddine<br/>{' '}MIMOUNI</h2><p>Entrepreneur · Auteur<br/>Conférencier</p><p className={s.authorNote}>Comprendre les évolutions.<br/>Mettre les idées en perspective.</p></div></aside>
    </div></section>
    <ArticleCatalogue articles={articles} authorUrl={articleAuthorUrl}/>
    <section className={s.contact}><div className={s.frame}><div><p className={s.eyebrow}>PROLONGEONS LA RÉFLEXION</p><h2>Un article peut ouvrir une conversation.</h2><p>Une question, un projet ou une idée à partager ? Échangeons.</p></div><a className="button" href="/contact">Me contacter<ArrowRight size={18} aria-hidden="true"/></a></div></section>
  </main>;
}
