import { Routes, Route } from 'react-router-dom';
import ArchiMadeLanding from './components/ArchiMadeLanding';
import LegalPage from './components/LegalPage';
import DedicatedPage from './components/DedicatedPage';
import NotFound from './components/NotFound';
import { DEDICATED_PAGES, DEDICATED_ROUTES } from './data/pages';

// Router-agnostic route table. The client wraps this in <BrowserRouter> and the
// prerender wraps it in <StaticRouter>, so the exact same tree is rendered on
// the server (build time) and the client (hydration) - no markup divergence.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ArchiMadeLanding />} />
      <Route path="/mentions-legales" element={<LegalPage type="mentions" />} />
      <Route path="/confidentialite" element={<LegalPage type="privacy" />} />
      <Route path="/cookies" element={<LegalPage type="cookies" />} />
      {/* Dedicated service + location silo (one shared template, unique content). */}
      {DEDICATED_PAGES.map((page) => (
        <Route
          key={page.slug}
          path={page.slug}
          element={<DedicatedPage page={page} />}
        />
      ))}
      {/* Catch-all MUST stay last: unknown paths -> noindex 404 (never prerendered). */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Single source of truth for which paths get prerendered + listed in the sitemap.
export const PRERENDER_ROUTES = [
  '/',
  '/mentions-legales',
  '/confidentialite',
  '/cookies',
  ...DEDICATED_ROUTES,
] as const;
