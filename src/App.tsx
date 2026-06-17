import { Routes, Route } from 'react-router-dom';
import ArchiMadeLanding from './components/ArchiMadeLanding';
import LegalPage from './components/LegalPage';

// Router-agnostic route table. The client wraps this in <BrowserRouter> and the
// prerender wraps it in <StaticRouter>, so the exact same tree is rendered on
// the server (build time) and the client (hydration) — no markup divergence.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ArchiMadeLanding />} />
      <Route path="/mentions-legales" element={<LegalPage type="mentions" />} />
      <Route path="/confidentialite" element={<LegalPage type="privacy" />} />
      <Route path="/cookies" element={<LegalPage type="cookies" />} />
    </Routes>
  );
}

// Single source of truth for which paths get prerendered + listed in the sitemap.
export const PRERENDER_ROUTES = [
  '/',
  '/mentions-legales',
  '/confidentialite',
  '/cookies',
] as const;
