'use client';
import { useTranslation } from '@/components/i18n/useTranslation';
import { useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight, Search, X } from 'lucide-react';
import type { Article } from '@/content/articles';
import { articleCategories, articleView, type ArticleOrder } from '@/lib/articles';
import { ArticleCard, FeaturedArticle } from './ArticleCard';
import s from '@/app/articles/articles.module.css';

export function ArticleCatalogue({articles,authorUrl}: {articles:Article[]; authorUrl:string}) {
 const {t,locale,localize}=useTranslation();
  const [query,setQuery] = useState(''), [category,setCategory] = useState(''), [order,setOrder] = useState<ArticleOrder>('newest');
  const input = useRef<HTMLInputElement>(null);
  const categories = useMemo(()=>articleCategories(articles),[articles]);
  const view = useMemo(()=>articleView(articles,query,category,order),[articles,query,category,order]);
  const reset = () => {setQuery('');setCategory('');setOrder('newest');input.current?.focus();};
  return <>
    {view.featured && <FeaturedArticle article={view.featured}/>}
    <section className={s.publications} id="publications" aria-labelledby="publications-title"><div className={s.frame}>
      <div className={s.catalogueHeading}><div><p className={s.eyebrow}>{t("EXPLORER LES PUBLICATIONS")}</p><h2 id="publications-title">{view.filtering ? t("Résultats de votre recherche") : view.featured ? t("Les autres articles à découvrir.") : t("Les articles à découvrir.")}{view.filtering && <span className={s.resultCount}>{view.matching.length}</span>}</h2></div>
        <div className={s.search}><Search size={18} aria-hidden="true"/><label className={s.srOnly} htmlFor="article-search">{t("Rechercher un article")}</label><input ref={input} id="article-search" type="search" placeholder={t("Rechercher un article…")} value={query} onChange={event=>setQuery(event.target.value)}/>{query && <button type="button" onClick={()=>{setQuery('');input.current?.focus();}} aria-label={t("Effacer la recherche")}><X size={17}/></button>}</div>
      </div>
      <div className={s.filterRow}><div className={s.filters} role="group" aria-label={t("Filtrer les articles par catégorie")}><button type="button" aria-pressed={!category} onClick={()=>setCategory('')}>{t("Tous")}<span>{articles.length}</span></button>{categories.map(item=><button key={item.name} type="button" aria-pressed={category===item.name} onClick={()=>setCategory(item.name)}>{item.name}<span>{item.count}</span></button>)}</div>
        <div className={s.sort}><label className={s.srOnly} htmlFor="article-order">{t("Ordre des articles")}</label><select id="article-order" value={order} onChange={event=>setOrder(event.target.value as ArticleOrder)}><option value="newest">{t("Du plus récent au plus ancien")}</option><option value="oldest">{t("Du plus ancien au plus récent")}</option></select>{order==='newest'?<ArrowDown size={14} aria-hidden="true"/>:<ArrowUp size={14} aria-hidden="true"/>}</div>
      </div>
      <p className={s.srOnly} role="status" aria-live="polite">{view.matching.length} {view.matching.length>1?t("articles trouvés"):t("article trouvé")}{view.featured ? t`, dont un à la une et ${view.grid.length} dans la grille` : ''}.</p>
      {view.filtering && <div className={s.activeFilters}><span>{view.grid.length}{t(" résultat")}{view.grid.length>1?'s':''}{category && t` dans « ${category} »`}</span><button type="button" onClick={reset}>{t("Réinitialiser")}<X size={14} aria-hidden="true"/></button></div>}
      <div className={s.grid}>{view.grid.map(article=><ArticleCard key={article.sourceUrl} article={article}/>)}</div>
      {!view.grid.length && !view.featured && <div className={s.empty}><Search size={28} aria-hidden="true"/><h3>{t("Aucun article trouvé")}</h3><p>{articles.length ? t("Essayez un autre mot-clé ou une autre catégorie.") : t("Les publications seront disponibles ici après leur import.")}</p>{articles.length>0 && <button type="button" className="button" onClick={reset}>{t("Réinitialiser la recherche")}</button>}</div>}
      <div className={s.catalogueFooter}><p>{articles.length}{t(" articles de la page auteur Richmedia")}<span>{t("Images des publications originales")}</span></p><a href={authorUrl} target="_blank" rel="noopener noreferrer">{t("Retrouver mes publications sur Richmedia")}<ArrowUpRight size={14} aria-hidden="true"/><span className={s.srOnly}>{t(" (nouvel onglet)")}</span></a></div>
    </div></section>
  </>;
}
