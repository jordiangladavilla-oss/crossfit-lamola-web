# Agent: Sincronitza Agenda

Sincronitza els events de `events.json` (repositori lamola-tv-agenda2026) a la font única de dades `src/data/agenda.ts`.

## Quan usar

Quan l'usuari digui:
- "sincronitza agenda"
- "actualitza events"
- "sync agenda"

## Arquitectura

La web utilitza una font única de dades:
- **`src/data/agenda.ts`** — Conté l'array `agendaEvents` amb tots els events i traduccions
- Les pàgines `agenda.astro` (CA/ES/EN) i `index.astro` (CA/ES/EN) importen d'aquest fitxer
- Qualsevol canvi a `agenda.ts` es propaga automàticament a totes les pàgines

## Passos

1. **Fetch events.json** des de GitHub:
   ```
   curl -s "https://raw.githubusercontent.com/jordiangladavilla-oss/lamola-tv-agenda2026/main/events.json"
   ```

2. **Filtrar events expirats** (endDate < data actual)

3. **Actualitzar `src/data/agenda.ts`**:
   - Editar l'array `agendaEvents`
   - Format de cada event (interfície AgendaEvent):
     ```typescript
     {
       id: 'nom-event-slug',
       start: 'AAAA-MM-DD',
       end: 'AAAA-MM-DD',
       cat: 'categoria',
       featured?: true,
       // Català (obligatori)
       name: 'Nom Event',
       place: 'Lloc · Detalls',
       desc: 'Descripció curta.',
       // Castellà (opcional, fallback a català)
       nameEs: 'Nombre Evento',
       placeEs: 'Lugar · Detalles',
       descEs: 'Descripción corta.',
       // Anglès (opcional, fallback a català)
       nameEn: 'Event Name',
       placeEn: 'Location · Details',
       descEn: 'Short description.'
     }
     ```
   - Categories: `activitat`, `comp-ext`, `seminari`, `festa`, `masterclass`
   - Mapping des de JSON:
     - `id` ← generar slug de `titleShort`
     - `name` ← `titleShort` (català)
     - `nameEs` ← traduir o deixar igual si no hi ha traducció
     - `nameEn` ← traduir o deixar igual si no hi ha traducció
     - `start` ← `startDate`
     - `end` ← `endDate`
     - `place` ← `sbSub`
     - `cat` ← segons `kicker`:
       - "Competició" → `comp-ext`
       - "Seminari" → `seminari`
       - `pillKind: "star"` → `festa`
       - "Masterclass" → `masterclass`
       - resta → `activitat`
     - Si `isHero: true` → afegir `featured: true`

4. **Verificar build**:
   ```bash
   npm run build
   ```

5. **Commit i push**:
   ```bash
   git add src/data/agenda.ts
   git commit -m "Sync agenda events des de events.json (DATA)"
   git push origin master
   ```

6. **Confirmar** a l'usuari que s'ha desplegat

## Important

- NOMÉS editar l'array `agendaEvents` dins de `src/data/agenda.ts`
- NO tocar les funcions helper ni les constants (monthNames, dayNames, catLabels)
- Mantenir l'ordre cronològic dels events (per `start` date)
- Afegir traduccions ES/EN si estan disponibles al JSON font
- Executar `npm run build` per verificar que no hi ha errors de TypeScript
