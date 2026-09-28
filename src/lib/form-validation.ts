import type { Locale } from './i18n';
import { getTranslator } from './translate';

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Native validation must follow the page language, not the browser language. */
export function localizedValidityMessage(field: FormControl, locale: Locale): string {
  const t = getTranslator(locale);
  const validity = field.validity;
  if (validity.valueMissing) return t(field.type === 'checkbox'
    ? 'Votre accord est nécessaire pour traiter la demande.'
    : 'Veuillez remplir ce champ.');
  if (validity.typeMismatch && field.type === 'email') return t('Indiquez une adresse e-mail valide.');
  if (validity.tooShort && 'minLength' in field) return t`Saisissez au moins ${field.minLength} caractères.`;
  if (validity.tooLong && 'maxLength' in field) return t`Saisissez au maximum ${field.maxLength} caractères.`;
  return validity.valid ? '' : t('Veuillez vérifier la valeur de ce champ.');
}

export function isFormControl(target: EventTarget | null): target is FormControl {
  return target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement;
}
