import { validEmail } from './book-order';
import { validRequestId } from './contact-request';

export type NewsletterFields = { email: string; consent: boolean; website: string };
export type NewsletterErrors = Partial<Record<keyof NewsletterFields, string>>;
export type NewsletterRequest = { email: string; consent: true; requestId: string; locale: 'fr' | 'en' };

export function validateNewsletterFields(input: NewsletterFields): NewsletterErrors {
  const errors: NewsletterErrors = {};
  if (typeof input.email !== 'string' || /[\u0000-\u001f]/.test(input.email) || !validEmail(input.email.trim())) errors.email = 'Indiquez une adresse e-mail valide.';
  if (input.consent !== true) errors.consent = 'Votre accord est nécessaire pour recevoir les nouveaux épisodes.';
  if (input.website !== undefined && input.website !== '') errors.website = 'Demande invalide.';
  return errors;
}

export function validateNewsletterRequest(input: unknown): { subscription: NewsletterRequest } | { error: string; errors?: NewsletterErrors } {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { error: 'Demande invalide.' };
  const values = input as NewsletterFields & { requestId?: unknown; locale?: unknown };
  const errors = validateNewsletterFields(values);
  if (Object.keys(errors).length) return { error: 'Vérifiez les champs indiqués.', errors };
  if (!validRequestId(values.requestId)) return { error: 'Rechargez la page avant de réessayer.' };
  return { subscription: { email: values.email.trim().toLowerCase(), consent: true, requestId: values.requestId, locale: values.locale === 'en' ? 'en' : 'fr' } };
}
