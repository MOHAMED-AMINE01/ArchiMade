// GA4 — consent-gated (RGPD). Only loads when:
// 1. VITE_GA_ID is set at build time
// 2. User has accepted cookies ("archimade-cookies-consent" === "accept")
//
// TODO(config): set VITE_GA_ID=G-XXXXXXXXXX in .env before deploy.

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

let initialized = false;

export function initGA4() {
  if (initialized) return;
  if (!GA_ID) return;
  if (typeof window === 'undefined') return;

  const consent = localStorage.getItem('archimade-cookies-consent');
  if (consent !== 'accept') return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.defer = true;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });

  initialized = true;
}
