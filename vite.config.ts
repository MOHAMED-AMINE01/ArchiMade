import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, ".", "");
  return {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      // Build-time constant so the footer copyright year is identical in the
      // prerendered HTML and at hydration time (no New-Year mismatch). Resolved
      // once when the bundle is built, not per render.
      __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      rollupOptions: {
        output: {
          // Client: split vendors so no chunk >500KB. SSR: react is external — only split animation.
          manualChunks: isSsrBuild
            ? {
                "vendor-animation": [
                  "gsap",
                  "gsap/ScrollTrigger",
                  "framer-motion",
                  "motion",
                  "lenis",
                ],
              }
            : {
                "vendor-animation": [
                  "gsap",
                  "gsap/ScrollTrigger",
                  "framer-motion",
                  "motion",
                  "lenis",
                ],
                "vendor-react": [
                  "react",
                  "react-dom",
                  "react-router-dom",
                  "react-helmet-async",
                ],
                // One chunk per language: the translated page copy + UI strings
                // are pure text and would otherwise bloat the entry chunk past
                // the 500KB budget. Split, they stay cacheable per language.
                "content-fr": [
                  "./src/data/pages.fr.ts",
                  "./src/i18n/dict.fr.ts",
                  "./src/i18n/legal.fr.ts",
                ],
                "content-en": [
                  "./src/data/pages.en.ts",
                  "./src/i18n/dict.en.ts",
                  "./src/i18n/legal.en.ts",
                ],
                "content-pt": [
                  "./src/data/pages.pt.ts",
                  "./src/i18n/dict.pt.ts",
                  "./src/i18n/legal.pt.ts",
                ],
              },
        },
      },
    },
    // Bundle the animation / icon libs into the SSR build so the prerender pass
    // (scripts/prerender.mjs) doesn't choke on their ESM-only / browser-oriented
    // entry points when imported from Node.
    ssr: {
      noExternal: ["gsap", "lenis", "framer-motion", "motion", "lucide-react"],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== "true",
      watch: {
        ignored: [
          "**/PROGRESS.md",
          "**/scripts/**",
          "**/dist/**",
          "**/dist-ssr/**",
          "**/.git/**",
        ],
      },
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
