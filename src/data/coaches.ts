export interface Coach {
  id: string;
  name: string;
  photo: string;
  credentials: string;
  instagram?: string;
  experience: string;
  specialty: string;
}

export const coaches: Coach[] = [
  {
    id: 'sergi',
    name: 'Sergi',
    photo: '/assets/coach-sergi.jpg',
    credentials: 'CF-L2',
    instagram: '@sergicoach',
    experience: '8 anys',
    specialty: 'Weightlifting'
  },
  {
    id: 'marta',
    name: 'Marta',
    photo: '/assets/coach-marta.jpg',
    credentials: 'CF-L1',
    instagram: '@martafit',
    experience: '5 anys',
    specialty: 'Gymnastics'
  },
  {
    id: 'pau',
    name: 'Pau',
    photo: '/assets/coach-pau.jpg',
    credentials: 'CF-L1',
    instagram: '@paucrossfit',
    experience: '4 anys',
    specialty: 'Endurance'
  }
];
