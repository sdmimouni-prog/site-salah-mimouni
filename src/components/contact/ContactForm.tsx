'use client';
import { useTranslation } from '@/components/i18n/useTranslation';

import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { contact as originalContact, hasEventDetails, type ContactSubject } from '@/content/contact';
import { emptyContactFields, validateContactFields, validRequestId, type ContactFields, type ContactErrors } from '@/lib/contact-request';
import { sendFormEmail, type PreparedDelivery } from '@/lib/form-submit';
import s from '@/app/contact/contact.module.css';

export function ContactForm({ initialSubject }: { initialSubject: ContactSubject | '' }) {
 const {t,locale,localize}=useTranslation();
 const contact=localize(originalContact);
  const [values, setValues] = useState<ContactFields>({ ...emptyContactFields, subject: initialSubject });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [notice, setNotice] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const feedback = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const requestId = useRef<string | null>(null);
  const eventDetails = hasEventDetails(values.subject);

  function update<K extends keyof ContactFields>(key: K, value: ContactFields[K]) {
    requestId.current = null;
    setValues(previous => ({ ...previous, [key]: value, ...(key === 'subject' && !hasEventDetails(String(value)) ? { date: '', location: '', format: '' } : {}) }));
    setErrors(previous => ({ ...previous, [key]: undefined, ...(key === 'subject' ? { date: undefined, location: undefined, format: undefined } : {}) }));
    if (state === 'error') { setState('idle'); setNotice(''); }
  }
  function validateField(key: keyof ContactFields) { setErrors(previous => ({ ...previous, [key]: validateContactFields(values)[key] })); }
  function showErrors(next: ContactErrors) {
    setErrors(next);
    const key = Object.keys(next).find(key => key !== 'website');
    if (key) form.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || state === 'success') return;
    const nextErrors = validateContactFields(values);
    if (Object.keys(nextErrors).length) { showErrors(nextErrors); setNotice(t("Vérifiez les champs indiqués avant l’envoi.")); setState('error'); return; }
    busy.current = true; setState('sending'); setNotice(t("Envoi de votre message en cours…"));
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, requestId: requestId.current }), signal: AbortSignal.timeout(20_000) });
      const result = await response.json();
      if (response.ok && result.ready === true && result.delivery && validRequestId(result.reference) && result.reference === requestId.current) {
        const delivery = result.delivery as PreparedDelivery;
        await sendFormEmail(delivery.payload, delivery.source, delivery.reference);
        setState('success'); setNotice(t("Votre message a bien été transmis. Merci d’avoir fait le premier pas."));
      } else {
        if (result.errors) showErrors(result.errors);
        setState('error'); setNotice(typeof result.error === 'string' ? t(result.error) : t("L’envoi n’a pas pu être confirmé. Vos champs sont conservés. Veuillez réessayer."));
      }
    } catch { setState('error'); setNotice(t("L’envoi n’a pas pu être confirmé. Vos champs sont conservés. Réessayez ou utilisez les coordonnées directes.")); }
    finally { busy.current = false; }
  }
  const error = (name: keyof ContactFields) => errors[name] ? <span id={`contact-${name}-error`} className={s.fieldError}>{t(errors[name]!)}</span> : null;
  const field = (name: 'name' | 'email' | 'phone' | 'organization', label: string, placeholder: string, autoComplete: string, type = 'text', required = false) => <div className={s.field}>
    <label htmlFor={`contact-${name}`}>{label}{required ? <span className={s.required}> *</span> : <span className={s.optional}>{t(" (facultatif)")}</span>}</label>
    <input id={`contact-${name}`} name={name} type={type} autoComplete={autoComplete} placeholder={placeholder} value={values[name]} required={required} maxLength={contact.limits[name]} onChange={event => update(name, event.target.value)} onBlur={() => validateField(name)} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `contact-${name}-error` : undefined}/>
    {error(name)}
  </div>;

  return <section className={s.formCard} id="formulaire" aria-labelledby="form-title">
    <p className={s.eyebrow}>{t("VOTRE MESSAGE")}</p><h2 id="form-title">{t("Parlons de votre projet.")}</h2><p className={s.formIntro}>{t("Quelques mots pour faire le premier pas.")}</p>
    <form ref={form} onSubmit={submit} noValidate aria-label={t("Contacter Salah-Eddine MIMOUNI")} aria-busy={state === 'sending'}>
      <fieldset disabled={state === 'sending' || state === 'success'}><legend className={s.srOnly}>{t("Vos coordonnées et votre message")}</legend>
        <div className={s.fields}>
          {field('name', t("Nom et prénom"), t("Votre nom et prénom"), 'name', 'text', true)}
          {field('email', t("Adresse e-mail"), t("votre@email.com"), 'email', 'email', true)}
          {field('phone', t("Téléphone"), t("Votre numéro de téléphone"), 'tel', 'tel')}
          {field('organization', t("Organisation"), t("Entreprise, média, association…"), 'organization')}
          <div className={`${s.field} ${s.full}`}><label htmlFor="contact-subject">{t("Vous me contactez pour…")}<span className={s.required}> *</span></label>
            <select id="contact-subject" name="subject" required value={values.subject} onChange={event => update('subject', event.target.value)} onBlur={() => validateField('subject')} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'contact-subject-error' : undefined}>
              <option value="" disabled>{t("Sélectionnez l’objet de votre demande")}</option>{contact.subjects.map(subject => <option key={subject.value} value={subject.value}>{subject.label}</option>)}
            </select>{error('subject')}
          </div>
          {eventDetails && <div className={`${s.eventFields} ${s.full}`}><p>{t("Votre événement ")}<span>{t("(facultatif)")}</span></p>
            <div className={s.field}><label htmlFor="contact-date">{t("Date envisagée")}</label><input type="date" id="contact-date" name="date" value={values.date} max="9999-12-31" onChange={event => update('date', event.target.value)} onBlur={() => validateField('date')} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'contact-date-error' : undefined}/>{error('date')}</div>
            <div className={s.field}><label htmlFor="contact-location">{t("Lieu")}</label><input id="contact-location" name="location" placeholder={t("Ville, lieu ou plateforme")} value={values.location} maxLength={contact.limits.location} onChange={event => update('location', event.target.value)} onBlur={() => validateField('location')} aria-invalid={!!errors.location} aria-describedby={errors.location ? 'contact-location-error' : undefined}/>{error('location')}</div>
            <div className={`${s.field} ${s.full}`}><label htmlFor="contact-format">Format</label><select id="contact-format" name="format" value={values.format} onChange={event => update('format', event.target.value)} aria-invalid={!!errors.format} aria-describedby={errors.format ? 'contact-format-error' : undefined}><option value="">{t("À préciser")}</option>{contact.formats.map(format => <option key={format.value} value={format.value}>{format.label}</option>)}</select>{error('format')}</div>
          </div>}
          <div className={`${s.field} ${s.full}`}><label htmlFor="contact-message">{t("Votre message")}<span className={s.required}> *</span></label><textarea id="contact-message" name="message" required minLength={10} maxLength={contact.limits.message} placeholder={t("Présentez votre projet, votre idée ou votre invitation…")} value={values.message} onChange={event => update('message', event.target.value)} onBlur={() => validateField('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'contact-message-error' : undefined}/>{error('message')}</div>
        </div>
        <div className={s.honeypot} aria-hidden="true"><label htmlFor="contact-website">{t("Laissez ce champ vide")}</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={event => update('website', event.target.value)}/></div>
        <div className={s.consent}><label htmlFor="contact-consent"><input id="contact-consent" name="consent" type="checkbox" required checked={values.consent} onChange={event => update('consent', event.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'contact-consent-error' : undefined}/><span>{t("J’accepte d’être recontacté au sujet de ma demande.")}</span></label>{error('consent')}
        </div>
        <button type="submit" className="button" disabled={state === 'sending' || state === 'success'}>{state === 'sending' ? <><LoaderCircle className={s.spinner} size={18}/>{t("Envoi en cours…")}</> : state === 'success' ? <>{t("Message transmis")}<CheckCircle2 size={19}/></> : <>{t("Envoyer mon message")}<ArrowRight size={19}/></>}</button>
      </fieldset>
      <div ref={feedback} role="status" aria-live="polite" aria-atomic="true" className={notice ? `${s.feedback} ${state === 'success' ? s.success : ''}` : s.srOnly}>{notice}</div>
      {state === 'error' && <a className={s.newMessage} href={`mailto:${contact.email}`}>{t("Écrire directement à ")}{contact.email}<ArrowRight size={16}/></a>}
      {state === 'success' && <button type="button" className={s.newMessage} onClick={() => { setValues({ ...emptyContactFields }); setErrors({}); setNotice(''); setState('idle'); requestId.current = null; requestAnimationFrame(() => form.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus()); }}>{t("Écrire un autre message")}<ArrowRight size={16}/></button>}
      <p className={s.mandatory}>{t("* Champs obligatoires")}</p>
    </form>
  </section>;
}
