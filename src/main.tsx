import "./index.css";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AppRoutes from "./App";

if (typeof performance !== "undefined") {
  performance.mark("js_start");
}

const shell = document.getElementById("static-loading-shell");
if (shell) shell.remove();

const container = document.getElementById("root")!;

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// If the page was prerendered (real content already in #root) hydrate it;
// otherwise (dev server / SPA fallback shell) render from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

if (typeof performance !== "undefined") {
  performance.mark("react_boot_complete");
}
