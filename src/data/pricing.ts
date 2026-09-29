// ÚNICA FONT DE PREUS de CrossFit La Mola (IVA inclòs).
// La fan servir: /tarifes ×3 (targetes, extres i OfferCatalog JSON-LD) i Schema.astro (priceRange).
// Per canviar un preu: només aquí. Els fitxers públics per a IA (public/llms*.txt) s'han
// d'actualitzar a mà fins que es generin (pendent).
//
// NOTA: /opositors i /recovery encara porten els seus preus al propi fitxer (65, 15+10, 9,90, 5).
// Els valors d'aquí han de coincidir-hi: dropIn, saunaSupplement, saunaExtra, recoveryAddon, opositors.

export type Lang = 'ca' | 'es' | 'en';

export const PRICES = {
  // Quotes mensuals
  ocasional: 49,   // 5 sessions/mes
  regular: 79,     // 10 sessions/mes
  constant: 84,    // 15 sessions/mes
  master: 60,      // il·limitada +60 anys
  unlimited: 105,  // il·limitada, inclou The Program
  // Extres
  dropIn: 15,
  bono5: 65,        // 5 classes, 3 mesos
  bono10: 115,      // 10 classes, 6 mesos
  classeExtra: 8,
  manteniment: 25,  // màx. 2 mesos/any
  matricula: 40,    // només si tornes
  // Recovery
  recoveryAddon: 9.9, // sauna il·limitada, add-on mensual
  saunaExtra: 5,      // sessió extra per a qui té quota
  saunaSupplement: 10, // suplement sobre el drop-in (sense quota)
  // Opositors
  opositors: 65,
} as const;

/** "49€" en CA/ES, "€49" en EN; decimals amb coma en CA/ES ("9,90€") i punt en EN ("€9.90"). */
export function eur(n: number, lang: Lang): string {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(2);
  const num = lang === 'en' ? s : s.replace('.', ',');
  return lang === 'en' ? `€${num}` : `${num}€`;
}

export const priceRange = `${PRICES.ocasional}€ - ${PRICES.unlimited}€`;

const CAT = {
  ca: {
    name: 'Quotes CrossFit La Mola', url: 'https://crossfitlamola.com/tarifes', recoveryUrl: 'https://crossfitlamola.com/recovery',
    items: [
      ['ocasional', 'Ocasional · 5 sessions/mes', '5 reserves mensuals, accés a totes les disciplines, sense permanència'],
      ['regular', 'Regular · 10 sessions/mes', '10 reserves mensuals, accés a totes les disciplines, sense permanència'],
      ['constant', 'Constant · 15 sessions/mes', '15 reserves mensuals, accés a totes les disciplines, sense permanència'],
      ['master', 'Màster · Il·limitat sènior (+60)', 'Reserves il·limitades, quota especial per a +60 anys'],
      ['unlimited', 'Unlimited Access', 'Reserves il·limitades, accés a totes les disciplines, inclou The Program'],
      ['dropIn', 'Drop-in', 'Una classe i accés a les instal·lacions aquell dia'],
      ['bono5', 'Bono 5 sessions', '5 classes a consumir en 3 mesos'],
      ['bono10', 'Bono 10 sessions', '10 classes a consumir en 6 mesos'],
      ['recoveryAddon', 'Add-on La Mola Recovery', 'Sauna infraroja il·limitada per a persones sòcies. Totes les quotes inclouen 1 sessió/mes'],
    ],
  },
  es: {
    name: 'Cuotas CrossFit La Mola', url: 'https://crossfitlamola.com/es/tarifes', recoveryUrl: 'https://crossfitlamola.com/es/recovery',
    items: [
      ['ocasional', 'Ocasional · 5 sesiones/mes', '5 reservas mensuales, acceso a todas las disciplinas, sin permanencia'],
      ['regular', 'Regular · 10 sesiones/mes', '10 reservas mensuales, acceso a todas las disciplinas, sin permanencia'],
      ['constant', 'Constante · 15 sesiones/mes', '15 reservas mensuales, acceso a todas las disciplinas, sin permanencia'],
      ['master', 'Master · Ilimitado senior (+60)', 'Reservas ilimitadas, cuota especial para +60 años'],
      ['unlimited', 'Unlimited Access', 'Reservas ilimitadas, acceso a todas las disciplinas, incluye The Program'],
      ['dropIn', 'Drop-in', 'Una clase y acceso a las instalaciones ese día'],
      ['bono5', 'Bono 5 sesiones', '5 clases a consumir en 3 meses'],
      ['bono10', 'Bono 10 sesiones', '10 clases a consumir en 6 meses'],
      ['recoveryAddon', 'Add-on La Mola Recovery', 'Sauna infrarroja ilimitada para socixs. Todas las cuotas incluyen 1 sesión/mes'],
    ],
  },
  en: {
    name: 'CrossFit La Mola Memberships', url: 'https://crossfitlamola.com/en/tarifes', recoveryUrl: 'https://crossfitlamola.com/en/recovery',
    items: [
      ['ocasional', 'Occasional · 5 sessions/month', '5 monthly bookings, access to all disciplines, no contract'],
      ['regular', 'Regular · 10 sessions/month', '10 monthly bookings, access to all disciplines, no contract'],
      ['constant', 'Consistent · 15 sessions/month', '15 monthly bookings, access to all disciplines, no contract'],
      ['master', 'Master · Unlimited senior (+60)', 'Unlimited bookings, special rate for 60+'],
      ['unlimited', 'Unlimited Access', 'Unlimited bookings, access to all disciplines, includes The Program'],
      ['dropIn', 'Drop-in', 'One class and facility access for the day'],
      ['bono5', '5 Session Pack', '5 classes, valid for 3 months'],
      ['bono10', '10 Session Pack', '10 classes, valid for 6 months'],
      ['recoveryAddon', 'La Mola Recovery add-on', 'Unlimited infrared sauna for members. Every plan includes 1 session/month'],
    ],
  },
} as const;

/** OfferCatalog de /tarifes (schema.org). Mateix contingut que abans, ara derivat de PRICES. */
export function offerCatalog(lang: Lang) {
  const c = CAT[lang];
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: c.name,
    itemListElement: c.items.map(([key, name, description]) => ({
      '@type': 'Offer',
      name,
      description,
      priceCurrency: 'EUR',
      price: PRICES[key as keyof typeof PRICES].toFixed(2),
      availability: 'https://schema.org/InStock',
      url: key === 'recoveryAddon' ? c.recoveryUrl : c.url,
    })),
  };
}
