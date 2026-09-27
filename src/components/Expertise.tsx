import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { SectionReveal } from './SectionReveal';
import s from './Expertise.module.css';
const roles = [
 {title:'Ingénieur d’État', subtitle:'Informatique & systèmes', description:'Une base solide en ingénierie et en systèmes d’information.', href:'/a-propos'},
 {title:'Doctorant en IA', subtitle:'Recherche & applications', description:'Une recherche tournée vers des solutions concrètes et utiles.', href:'/a-propos'},
 {title:'Fondateur & co-fondateur', subtitle:'Du projet à l’entreprise', description:'Plusieurs projets et sociétés dans le digital, l’éducation et l’IA.', href:'#societes'},
 {title:'Expert certifié', subtitle:'Meta Ads, Google Ads, Analytics', description:'Une expertise au service de la performance digitale.', href:'/a-propos'},
 {title:'Auteur & conférencier', subtitle:'Partager. Transmettre. Inspirer.', description:'', href:'#interventions'},
];
export function Expertise(){return <section className={`section ${s.section}`} id="parcours" aria-labelledby="expertise-title"><aside className={s.intro}><h2 id="expertise-title">PARCOURS &<br/>EXPERTISES</h2><p className={s.count} aria-label="5 regards complémentaires"><span aria-hidden="true">05</span><small>regards<br/>complémentaires</small></p><a href="/a-propos">Découvrir mon parcours<ArrowRight size={20}/></a></aside><SectionReveal className={s.grid}>{roles.map((role,index)=><a key={role.title} href={role.href} className={`${s.item} ${index===1?s.research:''}`} data-reveal="visible" style={{'--order':index} as CSSProperties}><span className={s.number}>0{index+1}</span><ArrowUpRight className={s.arrow} size={27} strokeWidth={1.4}/><div><h3>{role.title}</h3><p className={s.subtitle}><span>{role.subtitle}</span></p>{role.description&&<p className={s.description}>{role.description}</p>}</div></a>)}</SectionReveal></section>;}
