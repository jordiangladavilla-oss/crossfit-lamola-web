# Agent: Sincronitza Agenda

Sincronitza els events de `events.json` (repositori lamola-tv-agenda2026) a `agenda.astro` del web.

## Quan usar

Quan l'usuari digui:
- "sincronitza agenda"
- "actualitza events"
- "sync agenda"

## Passos

1. **Fetch events.json** des de GitHub:
   ```
   curl -s "https://raw.githubusercontent.com/jordiangladavilla-oss/lamola-tv-agenda2026/main/events.json"
   ```

2. **Filtrar events expirats** (endDate < data actual)

3. **Actualitzar `src/pages/agenda.astro`**:
   - Editar l'array `AGENDA_EVENTS_2026` al frontmatter
   - Format de cada event:
     ```javascript
     { name:"Nom Event", start:"AAAA-MM-DD", end:"AAAA-MM-DD", place:"Lloc · Detalls", cat:"categoria" }
     ```
   - Categories: `activitat`, `comp-ext`, `seminari`, `festa`
   - Mapping des de JSON:
     - `name` ← `titleShort`
     - `start` ← `startDate`
     - `end` ← `endDate`
     - `place` ← `sbSub`
     - `cat` ← segons `kicker`:
       - "Competició" → `comp-ext`
       - "Seminari" → `seminari`
       - `pillKind: "star"` → `festa`
       - resta → `activitat`
     - Si `isHero: true` → afegir `featured:true`

4. **Commit i push**:
   ```bash
   git add src/pages/agenda.astro
   git commit -m "Sync agenda events des de events.json (DATA)"
   git push origin master
   ```

5. **Confirmar** a l'usuari que s'ha desplegat

## Important

- NO canviar l'estructura HTML ni CSS de agenda.astro
- NOMÉS editar l'array `AGENDA_EVENTS_2026`
- Mantenir el format exacte de les línies
