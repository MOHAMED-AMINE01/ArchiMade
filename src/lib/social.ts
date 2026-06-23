// Canonical social profiles for visible UI links and JSON-LD sameAs.
// Instagram handle confirmed in PROGRESS (2026-06-19): archi.made.studio.
export const INSTAGRAM_URL = 'https://www.instagram.com/archi.made.studio';

// Public LinkedIn profile (Damien De Sousa, dirigeant RNE/INPI).
export const LINKEDIN_URL = 'https://www.linkedin.com/in/damien-de-sousa/';

// Set VITE_GBP_URL in Vercel once the Google Business Profile is verified.
const GBP_URL = import.meta.env.VITE_GBP_URL as string | undefined;

/** Entity disambiguation URLs for Organization.sameAs (and Person.sameAs). */
export function entitySameAs(): string[] {
  return [INSTAGRAM_URL, LINKEDIN_URL, ...(GBP_URL ? [GBP_URL] : [])];
}
