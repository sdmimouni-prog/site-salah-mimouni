import type { Locale } from '@/lib/i18n';
import { getTranslator, localizeContent } from '@/lib/translate';
import { LocalizedLink } from '@/components/i18n/LocalizedLink';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { articles as originalArticles, articleAuthorUrl, articleAuthorPortrait } from '@/content/articles';
import { articleCategories } from '@/lib/articles';
import { ArticleCatalogue } from '@/components/articles/ArticleCatalogue';
import s from '@/app/articles/articles.module.css';

export const metadata: Metadata = {
  title:'Articles & analyses — Salah-Eddine MIMOUNI',
  description:'Stratégie digitale, acquisition, data et visibilité : découvrez les articles de Salah-Eddine MIMOUNI publiés sur Richmedia.',
  alternates:{canonical:'/articles'},
  openGraph:{title:'Des idées pour comprendre. Des repères pour agir.',description:'Les articles et analyses de Salah-Eddine MIMOUNI publiés sur Richmedia.',url:'/articles',type:'website',locale:'fr_FR',images:[{url:articleAuthorPortrait,alt:'Salah-Eddine MIMOUNI'}]},
};
export default function ArticlesContent({ locale = 'fr' }: { locale?: Locale }) {
 const t = getTranslator(locale);
 const articles = localizeContent(originalArticles.map(article => ({ ...article, originalTitle: article.title, originalExcerpt: article.excerpt })), locale);
  const categories = articleCategories(articles);
  return <main className={s.page}>
    <section className={s.hero} aria-labelledby="articles-title"><div className={`${s.frame} ${s.heroGrid}`}>
      <div className={s.heroCopy}><p className={s.eyebrow}>{t("ARTICLES & ANALYSES")}</p><h1 id="articles-title">{t("Des idées pour comprendre.")}<em>{t("Des repères pour agir.")}</em></h1><p className={s.intro}>{t("Stratégie digitale, acquisition, data et visibilité : retrouvez mes articles publiés sur Richmedia pour nourrir votre réflexion.")}</p>
        <div className={s.actions}><LocalizedLink className="button" href="#publications">{t("Explorer les articles")}<ArrowDown size={18} aria-hidden="true"/></LocalizedLink><LocalizedLink className={s.textLink} href={articleAuthorUrl} target="_blank" rel="noopener noreferrer">{t("Ma page auteur Richmedia")}<ArrowUpRight size={14} aria-hidden="true"/><span className={s.srOnly}>{t(" (nouvel onglet)")}</span></LocalizedLink></div>
        <div className={s.stats}><p><strong>{articles.length}</strong><span>{t("articles publiés")}</span></p><p><strong>{categories.length}</strong><span>{t("rubriques")}</span></p><p>{t("Une publication sur ")}<strong className={s.publisherName}>Richmedia</strong></p></div>
      </div>
      <aside className={s.authorCard} aria-label={t("Le regard de l’auteur")}><div className={s.portrait}><Image src={articleAuthorPortrait} alt={t("Portrait original de Salah-Eddine MIMOUNI")} fill sizes="(max-width: 600px) 43vw, 220px" preload/></div><div className={s.authorCopy}><p className={s.eyebrow}>{t("LE REGARD DE L’AUTEUR")}</p><h2>Salah-Eddine<br/>{' '}MIMOUNI</h2><p>{t("Entrepreneur · Auteur")}<br/>{t("Conférencier")}</p><p className={s.authorNote}>{t("Comprendre les évolutions.")}<br/>{t("Mettre les idées en perspective.")}</p></div></aside>
    </div></section>
    <ArticleCatalogue articles={articles} authorUrl={articleAuthorUrl}/>
    <section className={s.contact}><div className={s.frame}><div><p className={s.eyebrow}>{t("PROLONGEONS LA RÉFLEXION")}</p><h2>{t("Un article peut ouvrir une conversation.")}</h2><p>{t("Une question, un projet ou une idée à partager ? Échangeons.")}</p></div><LocalizedLink className="button" href="/contact">{t("Me contacter")}<ArrowRight size={18} aria-hidden="true"/></LocalizedLink></div></section>
  </main>;
}
