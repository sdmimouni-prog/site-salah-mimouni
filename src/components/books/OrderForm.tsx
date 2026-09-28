'use client';
import { useTranslation } from '@/components/i18n/useTranslation';
import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { isFormControl, localizedValidityMessage } from '@/lib/form-validation';
export function OrderForm({slug,title,price,collectAddress=false,orderingEnabled=true}: {slug:string;title:string;price:number;collectAddress?:boolean;orderingEnabled?:boolean}) {
 const {t,locale}=useTranslation();
  const [quantity,setQuantity] = useState(1);
  const [state,setState] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [message,setMessage] = useState('');
  const [validationMessage,setValidationMessage] = useState('');
  const requestId = useRef('');
  const inFlight = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);
  function invalid(event: FormEvent<HTMLFormElement>) {
    const field = event.target;
    if (!isFormControl(field)) return;
    field.setCustomValidity('');
    const error = localizedValidityMessage(field, locale);
    field.setCustomValidity(error);
    // Also expose the first error where embedded browsers hide native popovers.
    if (field === event.currentTarget.querySelector('input:invalid, select:invalid, textarea:invalid')) setValidationMessage(error);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (inFlight.current || state === 'sending') return;
    if (!orderingEnabled) {setState('error');setMessage(t("Mode démonstration : aucune demande envoyée. Pour commander, écrivez à sd.mimouni@richmedia.ma."));requestAnimationFrame(()=>statusRef.current?.focus());return;}
    inFlight.current = true;
    const form = new FormData(event.currentTarget);
    if (!requestId.current) requestId.current = crypto.randomUUID();
    const body = {book:slug,quantity,name:form.get('name'),email:form.get('email'),phone:form.get('phone'),city:form.get('city'),country:form.get('country'),message:form.get('message'),website:form.get('website'),consent:form.get('consent') === 'on',requestId:requestId.current,...(collectAddress?{address:form.get('address')}: {})};
    setState('sending');setMessage('');
    try {
      const response = await fetch('/api/commandes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(20000)});
      const result = await response.json();
      if (!response.ok || result?.ok !== true || result.reference !== requestId.current) {
        setState('error');setMessage(typeof result?.error === 'string' ? t(result.error) : t("L’envoi n’a pas pu être confirmé. Veuillez réessayer."));
      } else {
        setState('success');setMessage(t`Votre demande pour « ${title} » a été transmise. Nous vous recontacterons pour confirmer la disponibilité, la livraison et le règlement. Référence : ${result.reference}.`);
      }
    } catch {setState('error');setMessage(t("L’envoi n’a pas pu être confirmé. Vous pouvez réessayer sans modifier votre demande."));}
    inFlight.current = false;
    requestAnimationFrame(()=>statusRef.current?.focus());
  }
  return <div className="order-form-card">
    <div className="order-form-heading"><span>{t("Votre demande")}</span><strong>{title}</strong></div>
    {state === 'success' ? <div ref={statusRef} tabIndex={-1} role="status" className="order-success"><CheckCircle2 size={34}/><h3>{t("Merci pour votre intérêt.")}</h3><p>{message}</p><p>{t("Aucun paiement n’a été débité.")}</p></div> : <form onSubmit={submit} aria-label={t`Commander ${title}`} onInvalid={invalid} onInput={event => { if (isFormControl(event.target)) event.target.setCustomValidity(''); setValidationMessage(''); }}>
      {!orderingEnabled && <p className="order-demo" role="status">{t("Mode démonstration : l’envoi en ligne n’est pas activé. Aucune donnée ne sera transmise. Pour commander : ")}<a href="mailto:sd.mimouni@richmedia.ma">sd.mimouni@richmedia.ma</a>.</p>}
      <fieldset disabled={state === 'sending'}>
        <div className="order-fields"><label>{t("Nom et prénom ")}<span>*</span><input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder={t("Votre nom complet")}/></label><label>{t("Adresse email ")}<span>*</span><input name="email" type="email" required maxLength={254} autoComplete="email" placeholder={t("vous@exemple.com")}/></label><label>{t("Téléphone ")}<small>{t("(facultatif)")}</small><input name="phone" type="tel" maxLength={30} autoComplete="tel" placeholder="+212 …"/></label><label>{t("Nombre d’exemplaires ")}<span>*</span><select name="quantity" value={quantity} onChange={e=>setQuantity(Number(e.target.value))}>{Array.from({length:10},(_,i)=><option value={i+1} key={i}>{i+1} {i ? t("exemplaires") : t("exemplaire")}</option>)}</select></label><label>{t("Ville ")}<span>*</span><input name="city" required minLength={2} maxLength={100} autoComplete="address-level2" placeholder={t("Votre ville")}/></label><label>{t("Pays ")}<span>*</span><input name="country" required minLength={2} maxLength={80} autoComplete="country-name" defaultValue={t("Maroc")}/></label></div>
        {collectAddress && <label className="order-message">{t("Adresse de livraison ")}<span>*</span><input name="address" required minLength={5} maxLength={300} autoComplete="street-address" placeholder={t("Votre adresse complète")}/></label>}
        <label className="order-message">{t("Un message ? ")}<small>{t("(facultatif)")}</small><textarea name="message" rows={3} maxLength={1500} placeholder={t("Une précision sur votre demande…")}/></label>
        <label className="order-trap" aria-hidden="true">{t("Votre site")}<input name="website" tabIndex={-1} autoComplete="off"/></label>
        <div className="order-total"><span>{quantity} × {price}{t(" Dhs")}<strong>{t("Sous-total livres")}</strong></span><b>{price * quantity}{t(" Dhs")}</b></div>
        <p className="order-delivery">{t("Frais de livraison et disponibilité confirmés par email avant tout règlement.")}</p>
        <label className="order-consent"><input type="checkbox" name="consent" required/><span>{t("J’accepte que mes coordonnées soient utilisées pour traiter cette demande et me recontacter à son sujet. ")}<a href="#donnees-commande">{t("Utilisation des données")}</a>.</span></label>
        <button className="book-primary order-submit" type="submit">{state === 'sending' ? <><LoaderCircle className="spinning" size={18}/>{t("Envoi en cours…")}</> : <>{t("Envoyer ma demande de commande")}<ArrowRight size={18}/></>}</button>
      </fieldset>
      {validationMessage && <p role="alert" className="order-error">{validationMessage}</p>}
      <div ref={statusRef} tabIndex={-1} role={state === 'error' ? 'alert' : 'status'} className={state === 'error' ? 'order-error' : ''}>{message}{state === 'error' && <a href={`mailto:sd.mimouni@richmedia.ma?subject=${encodeURIComponent(t`Commande — ${title}`)}`}>{t("Écrire directement par email")}</a>}</div>
      <p className="order-no-payment">{t("Pas de paiement en ligne. Votre demande vous permet de convenir de la commande par email.")}</p>
    </form>}
  </div>;
}
