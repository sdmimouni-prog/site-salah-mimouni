'use client';
import { useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight, Search, X } from 'lucide-react';
import type { Article } from '@/content/articles';
import { articleCategories, articleView, type ArticleOrder } from '@/lib/articles';
import { ArticleCard, FeaturedArticle } from './ArticleCard';
import s from '@/app/articles/articles.module.css';

export function ArticleCatalogue({articles,authorUrl}: {articles:Article[]; authorUrl:string}) {
  const [query,setQuery] = useState(''), [category,setCategory] = useState(''), [order,setOrder] = useState<ArticleOrder>('newest');
  const input = useRef<HTMLInputElement>(null);
  const categories = useMemo(()=>articleCategories(articles),[articles]);
  const view = useMemo(()=>articleView(articles,query,category,order),[articles,query,category,order]);
  const reset = () => {setQuery('');setCategory('');setOrder('newest');input.current?.focus();};
  return <>
    {view.featured && <FeaturedArticle article={view.featured}/>}
    <section className={s.publications} id="publications" aria-labelledby="publications-title"><div className={s.frame}>
      <div className={s.catalogueHeading}><div><p className={s.eyebrow}>EXPLORER LES PUBLICATIONS</p><h2 id="publications-title">{view.filtering ? 'Résultats de votre recherche' : view.featured ? 'Les autres articles à découvrir.' : 'Les articles à découvrir.'}{view.filtering && <span className={s.resultCount}>{view.matching.length}</span>}</h2></div>
        <div className={s.search}><Search size={18} aria-hidden="true"/><label className={s.srOnly} htmlFor="article-search">Rechercher un article</label><input ref={input} id="article-search" type="search" placeholder="Rechercher un article…" value={query} onChange={event=>setQuery(event.target.value)}/>{query && <button type="button" onClick={()=>{setQuery('');input.current?.focus();}} aria-label="Effacer la recherche"><X size={17}/></button>}</div>
      </div>
      <div className={s.filterRow}><div className={s.filters} role="group" aria-label="Filtrer les articles par catégorie"><button type="button" aria-pressed={!category} onClick={()=>setCategory('')}>Tous<span>{articles.length}</span></button>{categories.map(item=><button key={item.name} type="button" aria-pressed={category===item.name} onClick={()=>setCategory(item.name)}>{item.name}<span>{item.count}</span></button>)}</div>
        <div className={s.sort}><label className={s.srOnly} htmlFor="article-order">Ordre des articles</label><select id="article-order" value={order} onChange={event=>setOrder(event.target.value as ArticleOrder)}><option value="newest">Du plus récent au plus ancien</option><option value="oldest">Du plus ancien au plus récent</option></select>{order==='newest'?<ArrowDown size={14} aria-hidden="true"/>:<ArrowUp size={14} aria-hidden="true"/>}</div>
      </div>
      <p className={s.srOnly} role="status" aria-live="polite">{view.matching.length} {view.matching.length>1?'articles trouvés':'article trouvé'}{view.featured ? `, dont un à la une et ${view.grid.length} dans la grille` : ''}.</p>
      {view.filtering && <div className={s.activeFilters}><span>{view.grid.length} résultat{view.grid.length>1?'s':''}{category && ` dans « ${category} »`}</span><button type="button" onClick={reset}>Réinitialiser<X size={14} aria-hidden="true"/></button></div>}
      <div className={s.grid}>{view.grid.map(article=><ArticleCard key={article.sourceUrl} article={article}/>)}</div>
      {!view.grid.length && !view.featured && <div className={s.empty}><Search size={28} aria-hidden="true"/><h3>Aucun article trouvé</h3><p>{articles.length ? 'Essayez un autre mot-clé ou une autre catégorie.' : 'Les publications seront disponibles ici après leur import.'}</p>{articles.length>0 && <button type="button" className="button" onClick={reset}>Réinitialiser la recherche</button>}</div>}
      <div className={s.catalogueFooter}><p>{articles.length} articles de la page auteur Richmedia<span>Images des publications originales</span></p><a href={authorUrl} target="_blank" rel="noopener noreferrer">Retrouver mes publications sur Richmedia<ArrowUpRight size={14} aria-hidden="true"/><span className={s.srOnly}> (nouvel onglet)</span></a></div>
    </div></section>
  </>;
}
