// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://crossfitlamola.com',
  compressHTML: true,
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
