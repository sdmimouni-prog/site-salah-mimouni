import type { Book } from '@/content/books';
export function BookCover({book, priority = false}: {book: Book; priority?: boolean}) {
  return <div className={`real-book-cover${book.jacket ? ' jacket-cover' : ''}`}><img src={book.image} alt={`Couverture originale de ${book.title} — Salah-Eddine MIMOUNI`} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}/></div>;
}
