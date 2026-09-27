'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { contact } from '@/content/contact';
import { validateNewsletterFields, type NewsletterErrors, type NewsletterFields } from '@/lib/newsletter-request';
import { sendFormEmail, type PreparedDelivery } from '@/lib/form-submit';
import s from '@/app/podcasts/podcasts.module.css';

export function Newsletter() {
  const [values, setValues] = useState<NewsletterFields>({ email: '', consent: false, website: '' });
  const [errors, setErrors] = useState<NewsletterErrors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [notice, setNotice] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const busy = useRef(false);
  const requestId = useRef<string | null>(null);
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent('Inscription — Newsletter Podcasts')}&body=${encodeURIComponent(`Bonjour,\n\nJe souhaite recevoir les nouveaux épisodes du podcast de Salah-Eddine MIMOUNI par e-mail.\nMon adresse : ${values.email.trim()}\n\nMerci !`)}`;

  function update<K extends keyof NewsletterFields>(key: K, value: NewsletterFields[K]) {
    setValues(previous => ({ ...previous, [key]: value }));
    setErrors(previous => ({ ...previous, [key]: undefined }));
    requestId.current = null; setNotice(''); setState('idle');
  }
  function showErrors(next: NewsletterErrors) {
    setErrors(next);
    const name = Object.keys(next).find(key => key !== 'website');
    if (name) form.current?.querySelector<HTMLElement>(`[name="${name}"]`)?.focus();
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || state === 'success') return;
    const next = validateNewsletterFields(values);
    if (Object.keys(next).length) { showErrors(next); return; }
    busy.current = true; setState('sending'); setNotice('Envoi de votre demande…');
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, requestId: requestId.current }), signal: AbortSignal.timeout(20_000) });
      const result = await response.json();
      if (response.ok && result.ready === true && result.delivery && result.reference === requestId.current) {
        const delivery = result.delivery as PreparedDelivery;
        await sendFormEmail(delivery.payload, delivery.source, delivery.reference);
        setState('success'); setNotice('Votre demande d’inscription a bien été transmise. Merci !');
      } else {
        if (result.errors) showErrors(result.errors);
        setState('error'); setNotice(typeof result.error === 'string' ? result.error : 'L’envoi n’a pas pu être confirmé. Veuillez réessayer.');
      }
    } catch { setState('error'); setNotice('L’envoi n’a pas pu être confirmé. Votre adresse est conservée dans le formulaire pour réessayer.'); }
    finally { busy.current = false; }
  }

  return <section className={s.newsletter} aria-labelledby="newsletter-title">
    <p className={s.eyebrow}>RESTEZ INFORMÉ</p><h3 id="newsletter-title">Ne manquez aucun épisode.</h3>
    <p>Recevez les nouveaux épisodes directement dans votre boîte mail.</p>
    <form ref={form} onSubmit={submit} noValidate aria-label="Inscription à la newsletter Podcasts" aria-busy={state === 'sending'}>
      <fieldset className={s.newsletterFields} disabled={state === 'sending' || state === 'success'}>
        <legend className={s.srOnly}>Votre inscription</legend>
        <label className={s.srOnly} htmlFor="podcast-newsletter-email">Votre adresse e-mail</label>
        <input type="email" name="email" id="podcast-newsletter-email" autoComplete="email" placeholder="Votre adresse email" required value={values.email} maxLength={254} onChange={event => update('email', event.target.value)} onBlur={() => values.email && setErrors(previous => ({ ...previous, email: validateNewsletterFields(values).email }))} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'newsletter-email-error' : 'newsletter-privacy'}/>
        {errors.email && <span id="newsletter-email-error" className={s.fieldError}>{errors.email}</span>}
        <label className={s.newsletterConsent}><input type="checkbox" name="consent" required checked={values.consent} onChange={event => update('consent', event.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'newsletter-consent-error' : undefined}/><span>Je souhaite recevoir les nouveaux épisodes par e-mail.</span></label>
        {errors.consent && <span id="newsletter-consent-error" className={s.fieldError}>{errors.consent}</span>}
        <div className={s.newsletterTrap} aria-hidden="true"><label htmlFor="newsletter-website">Laissez ce champ vide</label><input id="newsletter-website" name="website" autoComplete="off" tabIndex={-1} value={values.website} onChange={event => update('website', event.target.value)}/></div>
        <button className="button" type="submit">{state === 'sending' ? <><LoaderCircle size={16} aria-hidden="true"/>Envoi en cours…</> : state === 'success' ? <>Demande transmise<CheckCircle2 size={16} aria-hidden="true"/></> : <>S’abonner<ArrowRight size={16} aria-hidden="true"/></>}</button>
      </fieldset>
      <p id="newsletter-status" role="status" aria-live="polite" aria-atomic="true" className={state === 'success' ? s.newsletterSuccess : s.unavailable}>{notice}</p>
      {state === 'error' && <a className={s.newsletterDirect} href={mailto}>Envoyer ma demande par e-mail<ArrowRight size={13} aria-hidden="true"/></a>}
      <p id="newsletter-privacy" className={s.newsletterPrivacy}>Votre adresse est transmise à Salah-Eddine MIMOUNI pour suivre votre inscription. <a href={`mailto:${contact.email}?subject=${encodeURIComponent('Désinscription — Newsletter Podcasts')}`}>Me désinscrire ou supprimer mon adresse.</a></p>
    </form>
  </section>;
}
