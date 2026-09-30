# CrossFit La Mola · web

Web estàtica de CrossFit La Mola (Terrassa): https://crossfitlamola.com

Astro 6, CSS propi, sense framework de client. Tres idiomes: català a l'arrel, `/es` i `/en`.
Desplegament automàtic a Vercel a cada push a `master`.

## Comandes

| Comanda | Què fa |
| --- | --- |
| `npm run dev` | Servidor de desenvolupament (localhost:4321) |
| `npm run build` | Genera `dist/` (41 pàgines) |
| `npm run preview` | Serveix `dist/` tal com es publica |
| `npm test` | Playwright contra el build (arrenca el preview sol). Requereix `npm run build` abans |
| `npm run check:faq` / `check:faq:dist` | Comprova que el FAQPage JSON-LD coincideix amb les FAQ visibles |
| `npm run sitemap` | Actualitza `lastmod` del sitemap amb la data de l'últim commit de cada pàgina |
| `npm run llms` | Regenera `public/llms-full.txt` a partir de les pàgines |
| `npm run test:leads` | Prova els tres formularis de leads contra el preview (honeypot, no crea leads reals) |

Abans de cada commit que toqui pàgines: `npm run sitemap` i `npm run llms`.

## Fonts de dades úniques

- `src/data/schedule.ts`: horari. La graella de `/horari` i les franges de la home surten d'aquí. No editar horaris a les pàgines.
- `src/data/pricing.ts`: preus, `eur()`, OfferCatalog i `priceRange` del JSON-LD.
- `src/data/agenda.ts`: esdeveniments de `/agenda`.
- `src/i18n/ui.ts`: textos compartits (nav, footer, formularis).

## Regles del projecte

- `trailingSlash: 'never'`. Cap enllaç intern amb barra final. El test ho comprova a totes les URL del sitemap.
- Cada pàgina posa `id="main"` a la primera secció (destí del skip-link).
- Llenguatge neutre de gènere, sense guions llargs en prosa, sense exclamacions.
- La paraula HYROX només com a estil o format d'entrenament, mai com a afiliació.
- El títol i la descripció de la home estan congelats mentre duri l'experiment SEO.

## Leads

Els tres formularis (home, contacte, opositors) fan servir `src/scripts/lead-form.ts` i envien a un Google Apps Script
(`scripts/contacte-apps-script.gs`, desplegat a mà des de l'editor d'Apps Script). Després de tocar l'script,
desplegar una versió nova i comprovar amb un lead real que arriba al full i al correu.

## CI

`.github/workflows/ci.yml`: a cada push a `master` i a cada pull request fa build, comprova les FAQ i passa els tests de Playwright.
