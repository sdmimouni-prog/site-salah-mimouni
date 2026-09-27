import { createContactHandler } from '@/lib/contact-service';

export const runtime = 'nodejs';
export const POST = createContactHandler();
