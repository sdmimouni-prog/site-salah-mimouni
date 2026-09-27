export const contact = {
  email: 'sd.mimouni@richmedia.ma',
  phone: '06 61 17 28 85',
  phoneHref: 'tel:+212661172885',
  whatsappHref: 'https://wa.me/212661172885',
  portrait: '/assets/photos/portrait-white.png',
  subjects: [
    { value: 'conference', label: 'Conférence ou masterclass' },
    { value: 'podcast', label: 'Podcast ou interview' },
    { value: 'litteraire', label: 'Rencontre littéraire' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'autre', label: 'Autre demande' },
  ],
  formats: [
    { value: 'presentiel', label: 'Présentiel' },
    { value: 'en-ligne', label: 'En ligne' },
    { value: 'hybride', label: 'Hybride' },
  ],
  limits: { name: 100, email: 254, phone: 30, organization: 150, message: 5000, location: 150 },
} as const;

export type ContactSubject = typeof contact.subjects[number]['value'];
export function contactSubject(value: unknown): ContactSubject | '' {
  return typeof value === 'string' && contact.subjects.some(item => item.value === value) ? value as ContactSubject : '';
}
export const hasEventDetails = (subject: string) => subject === 'conference' || subject === 'litteraire';
export function contactLink(subject?: ContactSubject) {
  return subject ? `/contact?objet=${subject}#formulaire` : '/contact';
}
