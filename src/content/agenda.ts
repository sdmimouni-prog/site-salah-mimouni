export type UpcomingEvent = {
  id: string;
  title: string;
  date: string;
  hours?: string;
  location: string;
  type: string;
  registrationUrl: string | null;
  status: 'confirmed' | 'full' | 'cancelled';
  poster?: { src: string; alt: string };
};

// Confirmed by the author and https://www.thebridge.business/ on 2026-09-27.
// The organizer lists Salah-Eddine MIMOUNI's testimonial, not a speaking slot.
export const theBridge = {
  id: 'the-bridge-2026',
  title: 'The Bridge — Networking Day',
  date: '2026-10-17',
  hours: '8 h 30 – 20 h',
  location: 'Le Carré d’Or, Casablanca',
  type: 'Networking',
  registrationUrl: 'https://www.thebridge.business/',
  status: 'confirmed',
  poster: { src: '/assets/photos/testimonial.jpeg', alt: 'Affiche The Bridge 2026 — témoignage de Salah-Eddine MIMOUNI' },
  videoUrl: '/videos/salah-eddine-mimouni.mp4',
} satisfies UpcomingEvent & { videoUrl: string };

export const upcomingEvents: UpcomingEvent[] = [theBridge];
