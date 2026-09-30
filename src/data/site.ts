// Dades de contacte i horari d'obertura del box: FONT ÚNICA.
// Les fan servir Schema.astro (JSON-LD), Footer.astro, la home, /horari i /contacte en els tres idiomes.
// Els fitxers public/llms*.txt s'escriuen a mà: el test "llms coherent amb site.ts" avisa si es desquadren.
export type Lang = 'ca' | 'es' | 'en';

export const SITE = {
  name: 'CrossFit La Mola',
  url: 'https://crossfitlamola.com',
  phone: '699 19 65 31',
  phoneIntl: '+34699196531',
  whatsapp: 'https://wa.me/34699196531',
  // hola@ = bústia que es llegeix (Eli): contacte públic per a Google i assistents d'IA.
  // info@ = genèrica (spam/publicitat): només als textos legals (avís legal, privacitat, cookies), que no llegeixen d'aquí.
  email: 'hola@crossfitlamola.com',
  instagram: 'https://www.instagram.com/lamolacrossfit/',
  instagramHandle: '@lamolacrossfit',
  maps: 'https://maps.app.goo.gl/LMWX4XfiVLq8PXxAA',
  address: {
    street: 'Av. del Vallès 724C',
    streetLong: 'Avinguda del Vallès 724C',
    postalCode: '08227',
    city: 'Terrassa',
    province: 'Barcelona',
    region: 'Catalunya',
    country: 'ES',
  },
  geo: { latitude: '41.581285', longitude: '2.027955' },
  // Horari d'obertura del box (no el de classes: aquest és a schedule.ts). Índex de dia: 0 = dilluns.
  hours: [
    { days: [0, 1, 2, 3], opens: '07:00', closes: '21:30' },
    { days: [4], opens: '07:00', closes: '20:30' },
    { days: [5, 6], opens: '09:30', closes: '11:30' },
  ],
} as const;

const DAY_ABBR: Record<Lang, string[]> = {
  ca: ['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'],
  es: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};
const DAY_SCHEMA = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/** "Dl–Dj" / "Dv" / "Ds–Dg" */
export function dayRange(range: { days: readonly number[] }, lang: Lang): string {
  const a = DAY_ABBR[lang];
  const d = range.days;
  return d.length === 1 ? a[d[0]] : `${a[d[0]]}–${a[d[d.length - 1]]}`;
}

/** Línies per a targetes: ["Dl–Dj · 07:00–21:30", "Dv · 07:00–20:30", "Ds–Dg · 09:30–11:30"] */
export function hoursLines(lang: Lang): string[] {
  return SITE.hours.map((r) => `${dayRange(r, lang)} · ${r.opens}–${r.closes}`);
}

/** Tira compacta: "Dl–Dj 07:00–21:30 · Dv 07:00–20:30 · Ds–Dg 09:30–11:30" */
export function hoursStrip(lang: Lang): string {
  return SITE.hours.map((r) => `${dayRange(r, lang)} ${r.opens}–${r.closes}`).join(' · ');
}

/** Frase per al subtítol de /horari: "Dilluns a dijous de 7:00 a 21:30. Divendres de 7:00 a 20:30. ..." */
export function hoursSentence(lang: Lang): string {
  const names: Record<Lang, string[]> = {
    ca: ['Dilluns a dijous', 'Divendres', 'Dissabte i diumenge'],
    es: ['Lunes a jueves', 'Viernes', 'Sábado y domingo'],
    en: ['Monday to Thursday', 'Friday', 'Saturday and Sunday'],
  };
  const short = (t: string) => t.replace(/^0/, '');
  return SITE.hours
    .map((r, i) => (lang === 'en' ? `${names.en[i]} from ${short(r.opens)} to ${short(r.closes)}.` : `${names[lang][i]} de ${short(r.opens)} a ${short(r.closes)}.`))
    .join(' ');
}

/** JSON-LD OpeningHoursSpecification */
export function openingHoursSpecification() {
  return SITE.hours.map((r) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: r.days.map((d) => DAY_SCHEMA[d]),
    opens: r.opens,
    closes: r.closes,
  }));
}

/** "Av. del Vallès 724C · 08227 Terrassa" (withPostal) o "Av. del Vallès 724C · Terrassa" */
export function addressLine(withPostal = true): string {
  const a = SITE.address;
  return `${a.street} · ${withPostal ? a.postalCode + ' ' : ''}${a.city}`;
}
