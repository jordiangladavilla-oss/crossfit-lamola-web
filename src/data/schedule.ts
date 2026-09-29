// Font única de la graella setmanal de classes. Es renderitza al build (SSR estàtic) a /horari ×3
// perquè Google i els assistents d'IA la vegin al HTML; el JS del client només filtra i marca "avui".
// Dades exactes del box (horari setembre 2026). Per editar l'horari: només aquest fitxer.

export type Lang = 'ca' | 'es' | 'en';
export type Slot = [time: string, classes: string[]];

// Índex 0 = dilluns … 6 = diumenge. Noms de classe tal com els dona el box (Aimharder).
export const SCHEDULE: Slot[][] = [
  [ // Dilluns
    ['07:00-08:00', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['08:00-09:00', ['OPEN', 'OPEN EXTERIOR']],
    ['09:30-10:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['10:30-11:30', ['HYBRID CLUB', 'OPEN', 'OPEN EXTERIOR']],
    ['11:30-13:30', ['OPEN', 'OPEN EXTERIOR']],
    ['13:30-14:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['14:30-16:00', ['OPEN', 'OPEN EXTERIOR']],
    ['16:00-17:30', ['THE PROGRAM', 'OPEN', 'OPEN EXTERIOR']],
    ['17:30-18:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['18:30-19:30', ['HYBRID CLUB', 'LA MOLA WEIGHTLIFTING', 'OPEN', 'OPEN EXTERIOR']],
    ['19:30-20:30', ['WOD', 'BODYWEIGHT LAB', 'OPEN', 'OPEN EXTERIOR']],
    ['20:30-21:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
  ],
  [ // Dimarts
    ['07:00-08:00', ['STRENGTH CLUB - POWERLIFTING', 'OPEN', 'OPEN EXTERIOR']],
    ['08:00-09:00', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['09:30-10:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['10:30-11:30', ['OPEN', 'OPEN EXTERIOR']],
    ['11:30-13:30', ['OPEN', 'OPEN EXTERIOR']],
    ['13:30-14:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['14:30-16:00', ['OPEN', 'OPEN EXTERIOR']],
    ['16:00-17:30', ['THE PROGRAM', 'OPEN', 'OPEN EXTERIOR']],
    ['17:30-18:30', ['WOD', 'BODYWEIGHT LAB', 'OPEN', 'OPEN EXTERIOR']],
    ['18:30-19:30', ['WOD', 'STRENGTH CLUB - POWERLIFTING', 'OPEN', 'OPEN EXTERIOR']],
    ['19:30-20:30', ['HYBRID CLUB', 'OPEN', 'OPEN EXTERIOR']],
    ['20:30-21:30', ['STRENGTH CLUB - POWERLIFTING', 'OPEN', 'OPEN EXTERIOR']],
  ],
  [ // Dimecres
    ['07:00-08:00', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['08:00-09:00', ['LA MOLA WEIGHTLIFTING', 'OPEN', 'OPEN EXTERIOR']],
    ['09:30-10:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['10:30-11:30', ['OPEN', 'OPEN EXTERIOR']],
    ['11:30-13:30', ['OPEN', 'OPEN EXTERIOR']],
    ['13:30-14:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['14:30-16:00', ['OPEN', 'OPEN EXTERIOR']],
    ['16:00-17:30', ['THE PROGRAM', 'OPEN', 'OPEN EXTERIOR']],
    ['17:30-18:30', ['WOD', 'LA MOLA WEIGHTLIFTING', 'OPEN', 'OPEN EXTERIOR']],
    ['18:30-19:30', ['WOD', 'BODYWEIGHT LAB', 'OPEN', 'OPEN EXTERIOR']],
    ['19:30-20:30', ['WOD', 'ABS & CALS', 'OPEN', 'OPEN EXTERIOR']],
    ['20:30-21:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
  ],
  [ // Dijous
    ['07:00-08:00', ['HYBRID CLUB', 'OPEN', 'OPEN EXTERIOR']],
    ['08:00-09:00', ['ABS & CALS', 'OPEN', 'OPEN EXTERIOR']],
    ['09:30-10:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['10:30-11:30', ['OPEN', 'OPEN EXTERIOR']],
    ['11:30-13:30', ['OPEN', 'OPEN EXTERIOR']],
    ['13:30-14:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['14:30-16:00', ['OPEN', 'OPEN EXTERIOR']],
    ['16:00-17:30', ['THE PROGRAM', 'OPEN', 'OPEN EXTERIOR']],
    ['17:30-18:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['18:30-19:30', ['HYBRID CLUB', 'RUNNING CLUB', 'OPEN', 'OPEN EXTERIOR']],
    ['19:30-20:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['20:30-21:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
  ],
  [ // Divendres
    ['07:00-08:00', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['08:00-09:00', ['OPEN', 'OPEN EXTERIOR']],
    ['09:30-10:30', ['STRENGTH CLUB - POWERLIFTING', 'OPEN', 'OPEN EXTERIOR']],
    ['10:30-11:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['11:30-13:30', ['OPEN', 'OPEN EXTERIOR']],
    ['13:30-14:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
    ['14:30-16:00', ['OPEN', 'OPEN EXTERIOR']],
    ['16:00-17:30', ['THE PROGRAM', 'OPEN', 'OPEN EXTERIOR']],
    ['17:30-18:30', ['STRENGTH CLUB - POWERLIFTING', 'OPEN', 'OPEN EXTERIOR']],
    ['18:30-19:30', ['HYBRID CLUB', 'OPEN', 'OPEN EXTERIOR']],
    ['19:30-20:30', ['WOD', 'OPEN', 'OPEN EXTERIOR']],
  ],
  [ // Dissabte
    ['09:30-10:30', ['WOD IN PAIRS', 'OPEN', 'OPEN EXTERIOR']],
    ['10:30-11:30', ['WOD IN PAIRS', 'OPEN', 'OPEN EXTERIOR']],
  ],
  [ // Diumenge
    ['09:30-10:30', ['OPEN', 'OPEN EXTERIOR']],
    ['10:30-11:30', ['OPEN', 'OPEN EXTERIOR']],
  ],
];

const T = {
  ca: {
    days: ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge'],
    abbr: ['Dl', 'Dm', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'],
    empty: 'Descans · sense classes',
    pairs: 'WOD in Pairs', wodInit: 'WOD · Iniciació', outdoor: 'Exterior',
  },
  es: {
    days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    abbr: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    empty: 'Descanso · sin clases',
    pairs: 'WOD en Parejas', wodInit: 'WOD · Iniciación', outdoor: 'Exterior',
  },
  en: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    abbr: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    empty: 'Rest day · no classes',
    pairs: 'Partner WOD', wodInit: 'WOD', outdoor: 'Outdoor',
  },
} as const;

export type FilterKey = 'open' | 'pr' | 'wl' | 'hy' | 'st' | 'bw' | 'ab' | 'rc' | 'wod';

// Mateixa lògica que tenia el JS del client: nom de classe → clau de filtre + etiqueta
export function classify(name: string, lang: Lang): { k: FilterKey; l: string; interior?: boolean } {
  const n = name.toUpperCase();
  const t = T[lang];
  if (n === 'OPEN' || n === 'OPEN EXTERIOR') return { k: 'open', l: n, interior: n === 'OPEN' };
  if (n.includes('THE PROGRAM')) return { k: 'pr', l: 'The Program' };
  if (n.includes('WEIGHTLIFTING')) return { k: 'wl', l: 'Weightlifting' };
  if (n.includes('HYBRID')) return { k: 'hy', l: 'Hybrid Club' };
  if (n.includes('STRENGTH')) return { k: 'st', l: 'Strength · Powerlifting' };
  if (n.includes('BODYWEIGHT')) return { k: 'bw', l: n.includes('ADVANCE') ? 'Bodyweight Lab · Advance' : n.includes('BASE') ? 'Bodyweight Lab · Base' : 'Bodyweight Lab' };
  if (n.includes('ABS')) return { k: 'ab', l: 'Abs & Cals' };
  if (n.includes('RUNNING') || n.includes('RUN BY')) return { k: 'rc', l: n.includes('BEACH') ? 'Run + Brunch + Beach' : 'Running Club' };
  if (n.includes('WOD IN PAIRS')) return { k: 'wod', l: t.pairs };
  if (n.includes('WOD')) return { k: 'wod', l: n.includes('INICIACI') ? t.wodInit : 'WOD' };
  return { k: 'wod', l: name };
}

export interface RenderedSlot { time: string; label: string; k: FilterKey; extras: string; openOnly: boolean; alwaysVisible: boolean }
export interface RenderedDay { index: number; name: string; abbr: string; slots: RenderedSlot[] }
export interface RenderedWeek { days: RenderedDay[]; counts: Record<string, number>; t: { empty: string } }

export function buildWeek(lang: Lang): RenderedWeek {
  const t = T[lang];
  const counts: Record<string, number> = { all: 0, wod: 0, wl: 0, hy: 0, bw: 0, st: 0, ab: 0, pr: 0, rc: 0 };
  const days: RenderedDay[] = SCHEDULE.map((slots, i) => {
    const dayHasCoached = slots.some(([, arr]) => arr.some((c) => classify(c, lang).k !== 'open'));
    const out: RenderedSlot[] = [];
    for (const [time, arr] of slots) {
      const coached: ReturnType<typeof classify>[] = [];
      const opens: ReturnType<typeof classify>[] = [];
      for (const c of arr) { const r = classify(c, lang); (r.k === 'open' ? opens : coached).push(r); }
      if (coached.length) {
        const extras = opens.length ? '+ Open' + (opens.some((o) => !o.interior) ? ' · ' + t.outdoor : '') : '';
        for (const r of coached) {
          counts.all++; if (counts[r.k] !== undefined) counts[r.k]++;
          out.push({ time, label: r.l, k: r.k, extras, openOnly: false, alwaysVisible: false });
        }
      } else if (opens.length) {
        const label = opens.map((o) => (o.l === 'OPEN EXTERIOR' ? 'Open ' + t.outdoor : 'Open')).join(' - ');
        out.push({ time, label, k: 'open', extras: '', openOnly: true, alwaysVisible: !dayHasCoached });
      }
    }
    return { index: i, name: t.days[i], abbr: t.abbr[i], slots: out };
  });
  return { days, counts, t: { empty: t.empty } };
}
