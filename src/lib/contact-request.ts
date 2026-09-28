import { contact, contactSubject, hasEventDetails, type ContactSubject } from '../content/contact';
import { validEmail } from './book-order';

export type ContactFields = {
  name: string; email: string; phone: string; organization: string; subject: string;
  message: string; date: string; location: string; format: string; consent: boolean; website: string;
};
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;
export type ContactMessage = Omit<ContactFields, 'subject' | 'website' | 'consent'> & { subject: ContactSubject; consent: true; requestId: string; locale: 'fr' | 'en' };
export const emptyContactFields: ContactFields = { name: '', email: '', phone: '', organization: '', subject: '', message: '', date: '', location: '', format: '', consent: false, website: '' };
export const validRequestId = (value: unknown): value is string => typeof value === 'string' && /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(value);

export function validateContactFields(input: unknown): ContactErrors {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { name: 'Veuillez renseigner vos coordonnées.' };
  const value: Record<string, unknown> = { ...emptyContactFields, ...input };
  const errors: ContactErrors = {};
  const text = (key: keyof ContactFields, min: number, max: number, label: string, multiline = false) => {
    const field = value[key];
    if (typeof field !== 'string' || field.trim().length < min || field.trim().length > max || (multiline ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/ : /[\u0000-\u001f\u007f]/).test(field)) errors[key] = label;
  };
  text('name', 2, contact.limits.name, 'Indiquez votre nom et prénom (2 à 100 caractères).');
  text('email', 3, contact.limits.email, 'Indiquez une adresse e-mail valide.');
  if (typeof value.email === 'string' && !validEmail(value.email.trim())) errors.email = 'Indiquez une adresse e-mail valide.';
  text('phone', 0, contact.limits.phone, 'Vérifiez votre numéro de téléphone international.');
  if (typeof value.phone === 'string' && value.phone.trim()) {
    const phone = value.phone.trim();
    const digits = phone.replace(/\D/g, '').replace(/^00/, '');
    if (!/^\+?[\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) errors.phone = 'Vérifiez votre numéro de téléphone international.';
  }
  text('organization', 0, contact.limits.organization, 'Limitez l’organisation à 150 caractères.');
  if (!contactSubject(value.subject)) errors.subject = 'Choisissez l’objet de votre demande.';
  text('message', 10, contact.limits.message, 'Rédigez un message de 10 à 5 000 caractères. Les retours à la ligne sont acceptés.', true);
  text('date', 0, 10, 'Indiquez une date valide.');
  if (value.date && (typeof value.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value.date) || !Number.isFinite(Date.parse(`${value.date}T12:00:00Z`)) || new Date(`${value.date}T12:00:00Z`).toISOString().slice(0, 10) !== value.date)) errors.date = 'Indiquez une date valide.';
  text('location', 0, contact.limits.location, 'Limitez le lieu à 150 caractères.');
  if (typeof value.format !== 'string' || (value.format !== '' && !contact.formats.some(format => format.value === value.format))) errors.format = 'Choisissez un format proposé.';
  if (value.consent !== true) errors.consent = 'Votre accord est nécessaire pour pouvoir vous recontacter.';
  if (value.website !== '') errors.website = 'La demande ne peut pas être envoyée.';
  return errors;
}

export function validateContactRequest(input: unknown): { message: ContactMessage } | { errors: ContactErrors; error: string } {
  const errors = validateContactFields(input);
  if (Object.keys(errors).length) return { errors, error: 'Vérifiez les champs indiqués.' };
  const fields = { ...emptyContactFields, ...(input as object) } as ContactFields & { requestId?: unknown; locale?: unknown };
  if (!validRequestId(fields.requestId)) return { errors: {}, error: 'Rechargez la page avant de réessayer.' };
  const details = hasEventDetails(fields.subject);
  return { message: {
    name: fields.name.trim(), email: fields.email.trim().toLowerCase(), phone: fields.phone.trim(), organization: fields.organization.trim(),
    subject: contactSubject(fields.subject) as ContactSubject, message: fields.message.trim(),
    date: details ? fields.date.trim() : '', location: details ? fields.location.trim() : '', format: details ? fields.format : '',
    consent: true, requestId: fields.requestId, locale: fields.locale === 'en' ? 'en' : 'fr',
  } };
}
