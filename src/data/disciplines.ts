export interface Discipline {
  id: string;
  num: string;
  image: string;
  duration: string;
  level: 'all' | 'intermediate' | 'advanced';
  frequency: string;
}

// Dades de les disciplines - els textos (nom, descripció) van al fitxer i18n
export const disciplines: Discipline[] = [
  {
    id: 'wod',
    num: '01',
    image: '/assets/class-wod.jpg',
    duration: '60 min',
    level: 'all',
    frequency: 'daily'
  },
  {
    id: 'weightlifting',
    num: '02',
    image: '/assets/class-weightlifting.jpg',
    duration: '60 min',
    level: 'intermediate',
    frequency: '2x/week'
  },
  {
    id: 'hybrid',
    num: '03',
    image: '/assets/class-hybrid.jpg',
    duration: '60 min',
    level: 'intermediate',
    frequency: '3x/week'
  },
  {
    id: 'bodyweight',
    num: '04',
    image: '/assets/class-bodyweight.jpg',
    duration: '45 min',
    level: 'all',
    frequency: '2x/week'
  },
  {
    id: 'strength',
    num: '05',
    image: '/assets/class-strength.jpg',
    duration: '60 min',
    level: 'all',
    frequency: '2x/week'
  },
  {
    id: 'abscals',
    num: '06',
    image: '/assets/class-abscals.jpg',
    duration: '30 min',
    level: 'all',
    frequency: '3x/week'
  },
  {
    id: 'theprogram',
    num: '07',
    image: '/assets/class-program.jpg',
    duration: '90 min',
    level: 'advanced',
    frequency: '4x/week'
  },
  {
    id: 'personal',
    num: '08',
    image: '/assets/class-personal.jpg',
    duration: '60 min',
    level: 'all',
    frequency: 'on-demand'
  },
  {
    id: 'running',
    num: '09',
    image: '/assets/class-running.jpg',
    duration: '60 min',
    level: 'all',
    frequency: '1x/week'
  }
];
