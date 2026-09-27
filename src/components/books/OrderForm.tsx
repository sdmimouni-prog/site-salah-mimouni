'use client';
import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';
export function OrderForm({slug,title,price,collectAddress=false,orderingEnabled=true}: {slug:string;title:string;price:number;collectAddress?:boolean;orderingEnabled?:boolean}) {
  const [quantity,setQuantity] = useState(1);
  const [state,setState] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [message,setMessage] = useState('');
  const requestId = useRef('');
  const inFlight = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (inFlight.current || state === 'sending') return;
    if (!orderingEnabled) {setState('error');setMessage('Mode démonstration : aucune demande envoyée. Pour commander, écrivez à sd.mimouni@richmedia.ma.');requestAnimationFrame(()=>statusRef.current?.focus());return;}
    inFlight.current = true;
    const form = new FormData(event.currentTarget);
    if (!requestId.current) requestId.current = crypto.randomUUID();
    const body = {book:slug,quantity,name:form.get('name'),email:form.get('email'),phone:form.get('phone'),city:form.get('city'),country:form.get('country'),message:form.get('message'),website:form.get('website'),consent:form.get('consent') === 'on',requestId:requestId.current,...(collectAddress?{address:form.get('address')}: {})};
    setState('sending');setMessage('');
    try {
      const response = await fetch('/api/commandes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(20000)});
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error(result.error || 'L’envoi n’a pas pu être confirmé. Veuillez réessayer.');
      setState('success');setMessage(`Votre demande pour « ${title} » a été transmise. Nous vous recontacterons pour confirmer la disponibilité, la livraison et le règlement. Référence : ${result.reference}.`);
    } catch(error) {setState('error');setMessage(error instanceof Error && error.name !== 'TimeoutError' ? error.message : 'L’envoi n’a pas pu être confirmé. Vous pouvez réessayer sans modifier votre demande.');}
    inFlight.current = false;
    requestAnimationFrame(()=>statusRef.current?.focus());
  }
  return <div className="order-form-card">
    <div className="order-form-heading"><span>Votre demande</span><strong>{title}</strong></div>
    {state === 'success' ? <div ref={statusRef} tabIndex={-1} role="status" className="order-success"><CheckCircle2 size={34}/><h3>Merci pour votre intérêt.</h3><p>{message}</p><p>Aucun paiement n’a été débité.</p></div> : <form onSubmit={submit} aria-label={`Commander ${title}`}>
      {!orderingEnabled && <p className="order-demo" role="status">Mode démonstration : l’envoi en ligne n’est pas activé. Aucune donnée ne sera transmise. Pour commander : <a href="mailto:sd.mimouni@richmedia.ma">sd.mimouni@richmedia.ma</a>.</p>}
      <fieldset disabled={state === 'sending'}>
        <div className="order-fields"><label>Nom et prénom <span>*</span><input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Votre nom complet"/></label><label>Adresse email <span>*</span><input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="vous@exemple.com"/></label><label>Téléphone <small>(facultatif)</small><input name="phone" type="tel" maxLength={30} autoComplete="tel" placeholder="+212 …"/></label><label>Nombre d’exemplaires <span>*</span><select name="quantity" value={quantity} onChange={e=>setQuantity(Number(e.target.value))}>{Array.from({length:10},(_,i)=><option value={i+1} key={i}>{i+1} exemplaire{i ? 's' : ''}</option>)}</select></label><label>Ville <span>*</span><input name="city" required minLength={2} maxLength={100} autoComplete="address-level2" placeholder="Votre ville"/></label><label>Pays <span>*</span><input name="country" required minLength={2} maxLength={80} autoComplete="country-name" defaultValue="Maroc"/></label></div>
        {collectAddress && <label className="order-message">Adresse de livraison <span>*</span><input name="address" required minLength={5} maxLength={300} autoComplete="street-address" placeholder="Votre adresse complète"/></label>}
        <label className="order-message">Un message ? <small>(facultatif)</small><textarea name="message" rows={3} maxLength={1500} placeholder="Une précision sur votre demande…"/></label>
        <label className="order-trap" aria-hidden="true">Votre site<input name="website" tabIndex={-1} autoComplete="off"/></label>
        <div className="order-total"><span>{quantity} × {price} Dhs<strong>Sous-total livres</strong></span><b>{price * quantity} Dhs</b></div>
        <p className="order-delivery">Frais de livraison et disponibilité confirmés par email avant tout règlement.</p>
        <label className="order-consent"><input type="checkbox" name="consent" required/><span>J’accepte que mes coordonnées soient utilisées pour traiter cette demande et me recontacter à son sujet. <a href="#donnees-commande">Utilisation des données</a>.</span></label>
        <button className="book-primary order-submit" type="submit">{state === 'sending' ? <><LoaderCircle className="spinning" size={18}/>Envoi en cours…</> : <>Envoyer ma demande de commande<ArrowRight size={18}/></>}</button>
      </fieldset>
      <div ref={statusRef} tabIndex={-1} role={state === 'error' ? 'alert' : 'status'} className={state === 'error' ? 'order-error' : ''}>{message}{state === 'error' && <a href={`mailto:sd.mimouni@richmedia.ma?subject=${encodeURIComponent(`Commande — ${title}`)}`}>Écrire directement par email</a>}</div>
      <p className="order-no-payment">Pas de paiement en ligne. Votre demande vous permet de convenir de la commande par email.</p>
    </form>}
  </div>;
}
