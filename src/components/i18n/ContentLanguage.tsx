import type { Locale } from '@/lib/i18n';
import type { ContentAudioLanguage } from '@/content/media-languages';
import s from './content-language.module.css';

export function ContentLanguage({ locale, kind, audioLanguage }: { locale: Locale; kind: 'book' | 'article' | 'excerpt' | 'podcast'; audioLanguage?: ContentAudioLanguage }) {
  if (locale !== 'en') return null;
  const text = kind === 'book' ? 'Book available in French only'
    : kind === 'article' ? 'Full article available in French only'
    : kind === 'excerpt' ? 'Excerpts translated from French for this website. The published book is in French.'
    : audioLanguage === 'fr' ? 'Audio in French · No English audio version'
    : audioLanguage === 'ar' ? 'Audio in Arabic · No English audio version'
    : audioLanguage === 'fr-ar' ? 'Audio in French and Arabic · No English audio version'
    : 'Original audio · Language not yet confirmed';
  return <p className={`${s.notice} ${kind === 'excerpt' ? s.excerpt : ''}`} data-content-language={kind}>{text}</p>;
}
