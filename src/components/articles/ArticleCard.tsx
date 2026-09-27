import Image from 'next/image';
import { ArrowUpRight, ImageIcon } from 'lucide-react';
import type { Article } from '@/content/articles';
import { articleDate } from '@/lib/articles';
import s from '@/app/articles/articles.module.css';

export function ArticleImage({ article, featured = false }: { article: Article; featured?: boolean }) {
  return <a className={s.imageLink} href={article.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Lire « ${article.title} » sur Richmedia (nouvel onglet)`}>
    {article.image ? <Image src={article.image} alt={article.imageAlt || ''} fill sizes={featured ? '(max-width: 700px) 92vw, (max-width: 1350px) 45vw, 600px' : '(max-width: 600px) 92vw, (max-width: 950px) 46vw, 410px'}/> : <span className={s.missingImage}><ImageIcon size={32} aria-hidden="true"/><span>Visuel à venir</span></span>}
    {!featured && article.category && <span className={s.imageBadge}>{article.category}</span>}
  </a>;
}
export function ArticleMetadata({ article, publisher = false }: { article: Article; publisher?: boolean }) {
  const date = articleDate(article.publishedAt);
  return <div className={s.metadata}>{date && <time dateTime={article.publishedAt!}>{date}</time>}{article.readingMinutes !== null && <span>{article.readingMinutes} min de lecture</span>}{publisher && <span>Richmedia</span>}</div>;
}
export function ArticleCard({article}: {article:Article}) {
  return <article className={s.card} data-article-id={article.id}>
    <ArticleImage article={article}/><div className={s.cardBody}><p className={s.attribution}>PUBLIÉ SUR RICHMEDIA</p>
      <h3><a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">{article.title}<span className={s.srOnly}> — sur Richmedia, nouvel onglet</span></a></h3>
      {article.excerpt && <p className={s.excerpt}>{article.excerpt}</p>}
      <div className={s.cardBottom}><ArticleMetadata article={article}/><a className={s.readLink} href={article.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Lire « ${article.title} » sur Richmedia (nouvel onglet)`}>Lire l’article<ArrowUpRight size={18} aria-hidden="true"/></a></div>
    </div>
  </article>;
}
export function FeaturedArticle({article}: {article:Article}) {
  return <section className={`${s.frame} ${s.featuredSection}`} aria-labelledby="featured-heading"><div className={s.featuredHeading}><h2 id="featured-heading">À la une<span aria-hidden="true">· —</span></h2><p>La dernière publication</p></div>
    <article className={s.featured} data-featured-id={article.id}><ArticleImage article={article} featured/><div className={s.featuredCopy}>
      {article.category && <span className={s.categoryBadge}>{article.category}</span>}
      <h3><a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">{article.title}<span className={s.srOnly}> — sur Richmedia, nouvel onglet</span></a></h3>
      {article.excerpt && <p className={s.excerpt}>{article.excerpt}</p>}<ArticleMetadata article={article} publisher/>
      <a className="button" href={article.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Lire « ${article.title} » sur Richmedia (nouvel onglet)`}>Lire l’article sur Richmedia<ArrowUpRight size={18} aria-hidden="true"/></a>
    </div></article>
  </section>;
}
