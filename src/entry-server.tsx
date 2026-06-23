import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import AppRoutes, { PRERENDER_ROUTES } from './App';

export { PRERENDER_ROUTES };

export interface RenderResult {
  appHtml: string;
  helmet: HelmetServerState | undefined;
}

// Called once per route by scripts/prerender.mjs to produce the static HTML.
export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const appHtml = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );
  return { appHtml, helmet: helmetContext.helmet };
}
