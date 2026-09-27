import { createNewsletterHandler } from '@/lib/newsletter-service';

export const runtime = 'nodejs';
export const POST = createNewsletterHandler({ browserDelivery: true });
