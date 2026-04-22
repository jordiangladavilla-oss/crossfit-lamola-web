export type EventCategory = 'activitat' | 'comp-ext' | 'seminari' | 'festa';

export interface AgendaEvent {
  id: string;
  name: string;
  start: string;  // YYYY-MM-DD
  end: string;    // YYYY-MM-DD
  place: string;
  cat: EventCategory;
  featured?: boolean;
}

// Events que es sincronitzen des de events.json via l'agent sync-agenda
export const agendaEvents: AgendaEvent[] = [
  {
    id: 'masterclass-abril',
    name: 'Masterclass Iniciació CrossFit',
    start: '2026-04-18',
    end: '2026-04-18',
    place: 'Al box · 11:45–13:15h · Gratuïta',
    cat: 'activitat'
  },
  {
    id: 'running-barcelona',
    name: 'Running Club @ La Barceloneta',
    start: '2026-04-19',
    end: '2026-04-19',
    place: 'Barcelona · 10:00h · Run + brunch',
    cat: 'activitat'
  },
  {
    id: 'pedraforca',
    name: 'Mountain Club · Pedraforca',
    start: '2026-05-23',
    end: '2026-05-24',
    place: 'Camping Wecamp · 2.506 m',
    cat: 'activitat',
    featured: true
  },
  {
    id: 'beach-wod',
    name: 'Beach WOD · La Mola & Ikaika Masnou',
    start: '2026-05-30',
    end: '2026-05-30',
    place: 'Platja · 09:00–16:00h',
    cat: 'activitat'
  },
  {
    id: 'fcl-games',
    name: 'FCL Games',
    start: '2026-06-05',
    end: '2026-06-07',
    place: 'CrossFit Lynx · Individual',
    cat: 'comp-ext'
  },
  {
    id: 'seminari-halterofilia',
    name: 'Seminari Halterofília amb Alfonso',
    start: '2026-06-14',
    end: '2026-06-14',
    place: 'Al box · 50€ · Places limitades',
    cat: 'seminari',
    featured: true
  }
];
