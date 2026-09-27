import type { Book } from '@/content/books';
import type { Locale } from '@/lib/i18n';
import { commonCopy } from '@/content/common-copy';
export function BookCover({book, priority = false, locale = 'fr'}: {book: Book; priority?: boolean; locale?: Locale}) {
  return <div className={`real-book-cover${book.jacket ? ' jacket-cover' : ''}`}><img src={book.image} alt={`${commonCopy[locale].originalCover} ${book.title} — Salah-Eddine MIMOUNI`} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}/></div>;
}
