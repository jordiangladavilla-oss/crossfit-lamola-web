// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://crossfitlamola.com',
  compressHTML: true,
  integrations: [
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag']
      }
    })
  ],
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
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild'
    }
  }
});
