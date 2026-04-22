export type EventCategory = 'activitat' | 'comp-ext' | 'seminari' | 'festa' | 'masterclass';

export interface AgendaEvent {
  id: string;
  start: string;      // YYYY-MM-DD
  end: string;        // YYYY-MM-DD
  cat: EventCategory;
  featured?: boolean;
  // Títols per idioma
  name: string;
  nameEs?: string;
  nameEn?: string;
  // Lloc per idioma
  place: string;
  placeEs?: string;
  placeEn?: string;
  // Descripció per idioma (opcional, per agenda completa)
  desc?: string;
  descEs?: string;
  descEn?: string;
}

// =============================================================================
// FONT ÚNICA D'EVENTS
// Actualitzar NOMÉS aquest fitxer (manualment o via agent sync-agenda)
// =============================================================================

export const agendaEvents: AgendaEvent[] = [
  {
    id: 'pedraforca',
    start: '2026-05-09',
    end: '2026-05-10',
    cat: 'activitat',
    name: 'Mountain Club · Pedraforca',
    nameEs: 'Mountain Club · Pedraforca',
    nameEn: 'Mountain Club · Pedraforca',
    place: 'Camping Wecamp · Cim 2.506 m',
    placeEs: 'Camping Wecamp · Cima 2.506 m',
    placeEn: 'Wecamp Camping · Summit 2,506 m',
    desc: "L'expedició de l'any. Dos dies a la muntanya, campament al peu del Pedraforca i ascensió fins al cim.",
    descEs: 'La expedición del año. Dos días en la montaña, campamento al pie del Pedraforca y ascensión hasta la cima.',
    descEn: 'The expedition of the year. Two days in the mountains, base camp and summit ascent.'
  },
  {
    id: 'run-badalona',
    start: '2026-05-24',
    end: '2026-05-24',
    cat: 'activitat',
    name: 'Run by the Beach @ Badalona',
    nameEs: 'Run by the Beach @ Badalona',
    nameEn: 'Run by the Beach @ Badalona',
    place: 'Badalona · ~12 km · Run + Brunch',
    placeEs: 'Badalona · ~12 km · Run + Brunch',
    placeEn: 'Badalona · ~12 km · Run + Brunch',
    desc: 'Run Club a primera línia de mar. Sortida matinal i brunch comunitari.',
    descEs: 'Run Club en primera línea de mar. Salida matinal y brunch comunitario.',
    descEn: 'Run Club by the sea. Morning run and community brunch.'
  },
  {
    id: 'beach-wod',
    start: '2026-05-31',
    end: '2026-05-31',
    cat: 'activitat',
    name: 'Beach WOD · La Mola & Ikaika',
    nameEs: 'Beach WOD · La Mola & Ikaika',
    nameEn: 'Beach WOD · La Mola & Ikaika',
    place: 'Platja · 09:00–16:00h',
    placeEs: 'Playa · 09:00–16:00h',
    placeEn: 'Beach · 09:00–16:00h',
    desc: "Jornada completa a la platja en col·laboració amb Ikaika Training Masnou.",
    descEs: 'Jornada completa en la playa en colaboración con Ikaika Training Masnou.',
    descEn: 'Full day at the beach in collaboration with Ikaika Training Masnou.'
  },
  {
    id: 'fcl-games',
    start: '2026-06-05',
    end: '2026-06-07',
    cat: 'comp-ext',
    name: 'FCL Games · CrossFit Lynx',
    nameEs: 'FCL Games · CrossFit Lynx',
    nameEn: 'FCL Games · CrossFit Lynx',
    place: 'CrossFit Lynx · Individual',
    placeEs: 'CrossFit Lynx · Individual',
    placeEn: 'CrossFit Lynx · Individual',
    desc: 'Tres dies de competició al més alt nivell regional. Categoria individual.',
    descEs: 'Tres días de competición al más alto nivel regional. Categoría individual.',
    descEn: 'Three days of competition at the highest regional level. Individual category.'
  },
  {
    id: 'seminari-halterofilia',
    start: '2026-06-14',
    end: '2026-06-14',
    cat: 'seminari',
    name: "Seminari d'Halterofília · Alfonso",
    nameEs: 'Seminario de Halterofilia · Alfonso',
    nameEn: 'Weightlifting Seminar · Alfonso',
    place: 'La Mola · Alfonso · 50 €',
    placeEs: 'La Mola · Alfonso · 50 €',
    placeEn: 'La Mola · Alfonso · €50',
    desc: "Seminari intensiu amb Alfonso. Millora la tècnica d'arrancada i dos temps amb un dels millors coaches.",
    descEs: 'Seminario intensivo con Alfonso. Mejora la técnica de arrancada y dos tiempos con uno de los mejores coaches.',
    descEn: 'Intensive seminar with Alfonso. Improve your snatch and clean & jerk technique with one of the best coaches.'
  },
  {
    id: 'consuegra',
    start: '2026-06-19',
    end: '2026-06-21',
    cat: 'comp-ext',
    name: 'Consuegra Throwdown · Toledo',
    nameEs: 'Consuegra Throwdown · Toledo',
    nameEn: 'Consuegra Throwdown · Toledo',
    place: 'Toledo · Parelles',
    placeEs: 'Toledo · Parejas',
    placeEn: 'Toledo · Pairs',
    desc: 'Competició de referència nacional. Tres dies de CrossFit per parelles a Toledo.',
    descEs: 'Competición de referencia nacional. Tres días de CrossFit por parejas en Toledo.',
    descEn: 'National reference competition. Three days of CrossFit pairs in Toledo.'
  },
  {
    id: 'summer-fest',
    start: '2026-07-04',
    end: '2026-07-04',
    cat: 'festa',
    featured: true,
    name: 'La Mola Summer Fest',
    nameEs: 'La Mola Summer Fest',
    nameEn: 'La Mola Summer Fest',
    place: 'La Mola · 09:00–16:00h',
    placeEs: 'La Mola · 09:00–16:00h',
    placeEn: 'La Mola · 09:00–16:00h',
    desc: "La festa de l'estiu ha tornat. WOD, còctels, música i welcome pack per a tothom.",
    descEs: 'La fiesta del verano ha vuelto. WOD, cócteles, música y welcome pack para todos.',
    descEn: 'The summer party is back. WOD, cocktails, music and welcome pack for everyone.'
  },
  {
    id: 'wodcelona',
    start: '2026-09-11',
    end: '2026-09-13',
    cat: 'comp-ext',
    name: 'Wodcelona · Barcelona',
    nameEs: 'Wodcelona · Barcelona',
    nameEn: 'Wodcelona · Barcelona',
    place: 'Barcelona · Indiv + Equips',
    placeEs: 'Barcelona · Indiv + Equipos',
    placeEn: 'Barcelona · Indiv + Teams',
    desc: 'La gran cita final de temporada. Wodcelona és la competició internacional de referència a Barcelona.',
    descEs: 'La gran cita final de temporada. Wodcelona es la competición internacional de referencia en Barcelona.',
    descEn: 'The big season finale. Wodcelona is the international reference competition in Barcelona.'
  },
  {
    id: 'fcl-costa-brava',
    start: '2026-10-17',
    end: '2026-10-18',
    cat: 'comp-ext',
    name: 'FCL Costa Brava · La Ballena Alegre',
    nameEs: 'FCL Costa Brava · La Ballena Alegre',
    nameEn: 'FCL Costa Brava · La Ballena Alegre',
    place: 'Camping La Ballena Alegre',
    placeEs: 'Camping La Ballena Alegre',
    placeEn: 'La Ballena Alegre Camping',
    desc: "Competició exterior de tardor. Dos dies d'esport i comunitat.",
    descEs: 'Competición exterior de otoño. Dos días de deporte y comunidad.',
    descEn: 'Autumn outdoor competition. Two days of sport and community.'
  },
  {
    id: 'basque-txapelketa',
    start: '2026-10-30',
    end: '2026-11-01',
    cat: 'comp-ext',
    name: 'Basque Txapelketa · Bilbao',
    nameEs: 'Basque Txapelketa · Bilbao',
    nameEn: 'Basque Txapelketa · Bilbao',
    place: 'Bilbao · 30-31 Oct + 1 Nov',
    placeEs: 'Bilbao · 30-31 Oct + 1 Nov',
    placeEn: 'Bilbao · Oct 30-31 + Nov 1',
    desc: "Tres dies de competició al País Basc. Una de les cites més importants del calendari de tardor.",
    descEs: 'Tres días de competición en el País Vasco. Una de las citas más importantes del calendario de otoño.',
    descEn: 'Three days of competition in the Basque Country. One of the most important dates on the autumn calendar.'
  }
];

// =============================================================================
// HELPERS
// =============================================================================

export const monthNames = {
  ca: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
  es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

export const monthNamesShort = {
  ca: ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'],
  es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

export const dayNames = {
  ca: ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte'],
  es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};

export const catLabels = {
  ca: { activitat: 'Activitat', 'comp-ext': 'Competició externa', seminari: 'Seminari', festa: 'Festa', masterclass: 'Masterclass' },
  es: { activitat: 'Actividad', 'comp-ext': 'Competición externa', seminari: 'Seminario', festa: 'Fiesta', masterclass: 'Masterclass' },
  en: { activitat: 'Activity', 'comp-ext': 'External competition', seminari: 'Seminar', festa: 'Party', masterclass: 'Masterclass' }
};

export type Lang = 'ca' | 'es' | 'en';

export function getEventName(event: AgendaEvent, lang: Lang): string {
  if (lang === 'es') return event.nameEs || event.name;
  if (lang === 'en') return event.nameEn || event.name;
  return event.name;
}

export function getEventPlace(event: AgendaEvent, lang: Lang): string {
  if (lang === 'es') return event.placeEs || event.place;
  if (lang === 'en') return event.placeEn || event.place;
  return event.place;
}

export function getEventDesc(event: AgendaEvent, lang: Lang): string {
  if (lang === 'es') return event.descEs || event.desc || '';
  if (lang === 'en') return event.descEn || event.desc || '';
  return event.desc || '';
}

export function formatEventDays(event: AgendaEvent): string {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const startDay = startDate.getDate().toString().padStart(2, '0');
  const endDay = endDate.getDate().toString().padStart(2, '0');
  return event.start === event.end ? startDay : `${startDay}–${endDay}`;
}

export function getEventDayName(event: AgendaEvent, lang: Lang): string {
  const date = new Date(event.start);
  return dayNames[lang][date.getDay()];
}

export function getEventMonth(event: AgendaEvent, lang: Lang): string {
  const date = new Date(event.start);
  return monthNames[lang][date.getMonth()];
}

export function getEventMonthShort(event: AgendaEvent, lang: Lang): string {
  const date = new Date(event.start);
  return monthNamesShort[lang][date.getMonth()];
}

export function getEventsByMonth(lang: Lang = 'ca'): Map<string, AgendaEvent[]> {
  const months = new Map<string, AgendaEvent[]>();
  const sortedEvents = [...agendaEvents].sort((a, b) => a.start.localeCompare(b.start));

  for (const event of sortedEvents) {
    const date = new Date(event.start);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    const monthLabel = `${monthNames[lang][date.getMonth()]} ${date.getFullYear()}`;

    if (!months.has(monthLabel)) {
      months.set(monthLabel, []);
    }
    months.get(monthLabel)!.push(event);
  }
  return months;
}

export function getUpcomingEvents(count: number = 6): AgendaEvent[] {
  const today = new Date().toISOString().split('T')[0];
  return agendaEvents
    .filter(e => e.end >= today)
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, count);
}

export function getFeaturedEvent(): AgendaEvent | undefined {
  return agendaEvents.find(e => e.featured && e.cat === 'festa');
}
