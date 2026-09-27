'use client';
import { useRef, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { home } from '@/content/home';
import s from './Influence.module.css';
export function InfluenceBrand(){return <a className={s.brand} href="/" aria-label="Salah Eddine Mimouni — accueil"><img src="/assets/brand-monogram.webp" alt="" width={48} height={44}/><span><strong>Salah Eddine Mimouni</strong><small>Auteur · Entrepreneur · Conférencier</small></span></a>}
export function InfluenceNavigation(){const [open,setOpen]=useState(false);const toggle=useRef<HTMLButtonElement>(null);return <header className={s.header} onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);toggle.current?.focus();}}}><div className={s.headerInner}><InfluenceBrand/><button ref={toggle} className={s.toggle} aria-expanded={open} aria-controls="influence-menu" aria-label={open?'Fermer le menu':'Ouvrir le menu'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav id="influence-menu" className={`${s.nav} ${open?s.navOpen:''}`} aria-label="Navigation principale">{home.nav.map(([label,href])=><a key={label} href={href} aria-current={label==='Livres'?'page':undefined} onClick={()=>setOpen(false)}>{label}</a>)}</nav><a className={`${s.primary} ${s.headerCta}`} href="#commander">Commander le livre<ArrowRight size={16}/></a></div></header>}
