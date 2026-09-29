// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://crossfitlamola.com',
  trailingSlash: 'never',
  compressHTML: true,
  // Partytown eliminat (2026-09-29): estava instal·lat sense cap <script type="text/partytown">
  // i el seu stub de window.gtag llançava una excepció a cada event → GA4 no rebia cap lead.
  integrations: [],
  i18n: {
    defaultLocale: 'ca',
    locales: ['ca', 'es', 'en'],
    routing: {
      prefixDefaultLocale: false  // crossfitlamola.com = català, /es = español, /en = english
    }
  },
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild'
    }
  }
});
