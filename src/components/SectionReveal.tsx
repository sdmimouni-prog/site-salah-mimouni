'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Content stays visible without JavaScript. Each card reveals once on entry. */
export function SectionReveal({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = root.current.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-reveal', 'visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    cards.forEach(card => { card.dataset.reveal = 'waiting'; observer.observe(card); });
    return () => { observer.disconnect(); cards.forEach(card => card.dataset.reveal = 'visible'); };
  }, []);
  return <div ref={root} className={className}>{children}</div>;
}
