export const languages = {
  ca: 'Català',
  es: 'Español',
  en: 'English'
} as const;

export const defaultLang = 'ca';

export type Lang = keyof typeof languages;

export const ui = {
  ca: {
    // Nav
    'nav.classes': 'Classes',
    'nav.horari': 'Horari',
    'nav.tarifes': 'Tarifes',
    'nav.elbox': 'El box',
    'nav.agenda': 'Agenda',
    'nav.contacte': 'Contacte',
    'nav.cta': 'Primera classe gratuïta',

    // Common
    'common.readMore': 'Llegir més',
    'common.viewAll': 'Veure tot',
    'common.send': 'Enviar',
    'common.sending': 'Enviant...',
    'common.thankYou': 'Gràcies!',
    'common.messageReceived': 'Hem rebut el teu missatge. Et contactem aviat.',
    'common.error': 'Error en enviar. Prova per WhatsApp:',
    'common.orWhatsApp': 'o per WhatsApp al',
    'common.freeClass': 'Primera classe gratuïta',
    'common.bookNow': 'Reservar ara',

    // Footer
    'footer.navigation': 'Navegació',
    'footer.services': 'Serveis',
    'footer.contact': 'Contacte',
    'footer.followUs': 'Segueix-nos',
    'footer.rights': 'Tots els drets reservats',
    'footer.legal': 'Avís legal',
    'footer.privacy': 'Privacitat',
    'footer.cookies': 'Cookies',

    // Home
    'home.title': 'CrossFit La Mola · Box a Terrassa',
    'home.description': 'Box de CrossFit a Terrassa. Entrenament funcional per a tots els nivells amb coaches certificats. Primera classe gratuïta.',
    'home.heroTagline': 'Build strength together',
    'home.heroSubtitle': 'Tres coaches. Nou disciplines. Una sala amb llum pròpia. La resta, la constància, la paciència, la poses tu.',

    // Classes
    'classes.title': 'Classes · CrossFit La Mola Terrassa',
    'classes.description': 'Les 9 disciplines del box: WOD, Weightlifting, Hybrid Club, Bodyweight Lab, Strength Club i més.',
    'classes.heroTitle': 'Troba el teu moviment.',
    'classes.level': 'Nivell',
    'classes.frequency': 'Freqüència',
    'classes.duration': 'Durada',

    // Schedule
    'horari.title': 'Horari setmanal · CrossFit La Mola Terrassa',
    'horari.description': 'Horari setmanal del box. Classes de dilluns a diumenge. Reserva per l\'app Aimharder.',
    'horari.heroTitle': 'L\'horari de la setmana.',
    'horari.filterAll': 'Totes',
    'horari.openNow': 'Obert ara',
    'horari.closed': 'Tancat',

    // Pricing
    'tarifes.title': 'Tarifes · CrossFit La Mola Terrassa',
    'tarifes.description': 'Quotes mensuals i bons de classes. Sense permanència. Primera classe gratuïta.',
    'tarifes.heroTitle': 'Un preu sense lletra petita.',
    'tarifes.perMonth': '/mes',
    'tarifes.sessions': 'sessions',
    'tarifes.unlimited': 'Il·limitat',
    'tarifes.noCommitment': 'Sense permanència',

    // El Box
    'elbox.title': 'El Box · CrossFit La Mola Terrassa',
    'elbox.description': 'Coneix el nostre espai i equip de coaches certificats CF-L1 i CF-L2.',
    'elbox.heroTitle': 'El nom ve de la muntanya.',
    'elbox.coaches': 'Coaches',
    'elbox.facilities': 'Instal·lacions',

    // Agenda
    'agenda.title': 'Agenda · CrossFit La Mola Terrassa',
    'agenda.description': 'Events, competicions i activitats especials del box.',
    'agenda.heroTitle': 'Què ve?',
    'agenda.filterAll': 'Tot',
    'agenda.filterComp': 'Competició',
    'agenda.filterSeminar': 'Seminari',
    'agenda.filterActivity': 'Activitat',

    // Contact
    'contacte.title': 'Contacte · CrossFit La Mola Terrassa',
    'contacte.description': 'Contacta amb nosaltres. WhatsApp, email o vine al box.',
    'contacte.heroTitle': 'Diga\'ns hola.',
    'contacte.formTitle': 'Reserva una primera classe.',
    'contacte.name': 'Nom i cognom',
    'contacte.phone': 'Telèfon',
    'contacte.email': 'Email',
    'contacte.discipline': 'Disciplina que t\'interessa',
    'contacte.dontKnow': 'No ho sé encara',
    'contacte.experience': 'Has fet CrossFit abans?',
    'contacte.never': 'Mai',
    'contacte.someSessions': 'Alguna classe solta',
    'contacte.experienced': 'Sí, tinc experiència',
    'contacte.compete': 'Competeixo',
    'contacte.when': 'Quan vols venir?',
    'contacte.thisWeek': 'Aquesta setmana',
    'contacte.nextWeek': 'La setmana vinent',
    'contacte.notSure': 'Encara no ho sé',
    'contacte.notes': 'Alguna cosa més que ens hauríem de saber?',
    'contacte.notesPlaceholder': 'Lesions, objectius, preguntes, dubtes...',

    // Days
    'days.mon': 'Dilluns',
    'days.tue': 'Dimarts',
    'days.wed': 'Dimecres',
    'days.thu': 'Dijous',
    'days.fri': 'Divendres',
    'days.sat': 'Dissabte',
    'days.sun': 'Diumenge',
    'days.monShort': 'Dl',
    'days.tueShort': 'Dm',
    'days.wedShort': 'Dc',
    'days.thuShort': 'Dj',
    'days.friShort': 'Dv',
    'days.satShort': 'Ds',
    'days.sunShort': 'Dg',

    // Months
    'months.jan': 'Gener',
    'months.feb': 'Febrer',
    'months.mar': 'Març',
    'months.apr': 'Abril',
    'months.may': 'Maig',
    'months.jun': 'Juny',
    'months.jul': 'Juliol',
    'months.aug': 'Agost',
    'months.sep': 'Setembre',
    'months.oct': 'Octubre',
    'months.nov': 'Novembre',
    'months.dec': 'Desembre',
  },

  es: {
    // Nav
    'nav.classes': 'Clases',
    'nav.horari': 'Horario',
    'nav.tarifes': 'Tarifas',
    'nav.elbox': 'El box',
    'nav.agenda': 'Agenda',
    'nav.contacte': 'Contacto',
    'nav.cta': 'Primera clase gratis',

    // Common
    'common.readMore': 'Leer más',
    'common.viewAll': 'Ver todo',
    'common.send': 'Enviar',
    'common.sending': 'Enviando...',
    'common.thankYou': '¡Gracias!',
    'common.messageReceived': 'Hemos recibido tu mensaje. Te contactamos pronto.',
    'common.error': 'Error al enviar. Prueba por WhatsApp:',
    'common.orWhatsApp': 'o por WhatsApp al',
    'common.freeClass': 'Primera clase gratis',
    'common.bookNow': 'Reservar ahora',

    // Footer
    'footer.navigation': 'Navegación',
    'footer.services': 'Servicios',
    'footer.contact': 'Contacto',
    'footer.followUs': 'Síguenos',
    'footer.rights': 'Todos los derechos reservados',
    'footer.legal': 'Aviso legal',
    'footer.privacy': 'Privacidad',
    'footer.cookies': 'Cookies',

    // Home
    'home.title': 'CrossFit La Mola · Box en Terrassa',
    'home.description': 'Box de CrossFit en Terrassa. Entrenamiento funcional para todos los niveles con coaches certificados. Primera clase gratis.',
    'home.heroTagline': 'Build strength together',
    'home.heroSubtitle': 'Tres coaches. Nueve disciplinas. Una sala con luz propia. El resto, la constancia, la paciencia, la pones tú.',

    // Classes
    'classes.title': 'Clases · CrossFit La Mola Terrassa',
    'classes.description': 'Las 9 disciplinas del box: WOD, Weightlifting, Hybrid Club, Bodyweight Lab, Strength Club y más.',
    'classes.heroTitle': 'Encuentra tu movimiento.',
    'classes.level': 'Nivel',
    'classes.frequency': 'Frecuencia',
    'classes.duration': 'Duración',

    // Schedule
    'horari.title': 'Horario semanal · CrossFit La Mola Terrassa',
    'horari.description': 'Horario semanal del box. Clases de lunes a domingo. Reserva por la app Aimharder.',
    'horari.heroTitle': 'El horario de la semana.',
    'horari.filterAll': 'Todas',
    'horari.openNow': 'Abierto ahora',
    'horari.closed': 'Cerrado',

    // Pricing
    'tarifes.title': 'Tarifas · CrossFit La Mola Terrassa',
    'tarifes.description': 'Cuotas mensuales y bonos de clases. Sin permanencia. Primera clase gratis.',
    'tarifes.heroTitle': 'Un precio sin letra pequeña.',
    'tarifes.perMonth': '/mes',
    'tarifes.sessions': 'sesiones',
    'tarifes.unlimited': 'Ilimitado',
    'tarifes.noCommitment': 'Sin permanencia',

    // El Box
    'elbox.title': 'El Box · CrossFit La Mola Terrassa',
    'elbox.description': 'Conoce nuestro espacio y equipo de coaches certificados CF-L1 y CF-L2.',
    'elbox.heroTitle': 'El nombre viene de la montaña.',
    'elbox.coaches': 'Coaches',
    'elbox.facilities': 'Instalaciones',

    // Agenda
    'agenda.title': 'Agenda · CrossFit La Mola Terrassa',
    'agenda.description': 'Eventos, competiciones y actividades especiales del box.',
    'agenda.heroTitle': '¿Qué viene?',
    'agenda.filterAll': 'Todo',
    'agenda.filterComp': 'Competición',
    'agenda.filterSeminar': 'Seminario',
    'agenda.filterActivity': 'Actividad',

    // Contact
    'contacte.title': 'Contacto · CrossFit La Mola Terrassa',
    'contacte.description': 'Contacta con nosotros. WhatsApp, email o ven al box.',
    'contacte.heroTitle': 'Dinos hola.',
    'contacte.formTitle': 'Reserva una primera clase.',
    'contacte.name': 'Nombre y apellido',
    'contacte.phone': 'Teléfono',
    'contacte.email': 'Email',
    'contacte.discipline': 'Disciplina que te interesa',
    'contacte.dontKnow': 'No lo sé todavía',
    'contacte.experience': '¿Has hecho CrossFit antes?',
    'contacte.never': 'Nunca',
    'contacte.someSessions': 'Alguna clase suelta',
    'contacte.experienced': 'Sí, tengo experiencia',
    'contacte.compete': 'Compito',
    'contacte.when': '¿Cuándo quieres venir?',
    'contacte.thisWeek': 'Esta semana',
    'contacte.nextWeek': 'La semana que viene',
    'contacte.notSure': 'Todavía no lo sé',
    'contacte.notes': '¿Algo más que deberíamos saber?',
    'contacte.notesPlaceholder': 'Lesiones, objetivos, preguntas, dudas...',

    // Days
    'days.mon': 'Lunes',
    'days.tue': 'Martes',
    'days.wed': 'Miércoles',
    'days.thu': 'Jueves',
    'days.fri': 'Viernes',
    'days.sat': 'Sábado',
    'days.sun': 'Domingo',
    'days.monShort': 'Lu',
    'days.tueShort': 'Ma',
    'days.wedShort': 'Mi',
    'days.thuShort': 'Ju',
    'days.friShort': 'Vi',
    'days.satShort': 'Sa',
    'days.sunShort': 'Do',

    // Months
    'months.jan': 'Enero',
    'months.feb': 'Febrero',
    'months.mar': 'Marzo',
    'months.apr': 'Abril',
    'months.may': 'Mayo',
    'months.jun': 'Junio',
    'months.jul': 'Julio',
    'months.aug': 'Agosto',
    'months.sep': 'Septiembre',
    'months.oct': 'Octubre',
    'months.nov': 'Noviembre',
    'months.dec': 'Diciembre',
  },

  en: {
    // Nav
    'nav.classes': 'Classes',
    'nav.horari': 'Schedule',
    'nav.tarifes': 'Pricing',
    'nav.elbox': 'The box',
    'nav.agenda': 'Events',
    'nav.contacte': 'Contact',
    'nav.cta': 'Free first class',

    // Common
    'common.readMore': 'Read more',
    'common.viewAll': 'View all',
    'common.send': 'Send',
    'common.sending': 'Sending...',
    'common.thankYou': 'Thank you!',
    'common.messageReceived': 'We received your message. We\'ll contact you soon.',
    'common.error': 'Error sending. Try WhatsApp:',
    'common.orWhatsApp': 'or WhatsApp at',
    'common.freeClass': 'Free first class',
    'common.bookNow': 'Book now',

    // Footer
    'footer.navigation': 'Navigation',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.followUs': 'Follow us',
    'footer.rights': 'All rights reserved',
    'footer.legal': 'Legal notice',
    'footer.privacy': 'Privacy',
    'footer.cookies': 'Cookies',

    // Home
    'home.title': 'CrossFit La Mola · Box in Terrassa',
    'home.description': 'CrossFit box in Terrassa, Barcelona. Functional training for all levels with certified coaches. Free first class.',
    'home.heroTagline': 'Build strength together',
    'home.heroSubtitle': 'Three coaches. Nine disciplines. A space with its own light. The rest—consistency, patience—is on you.',

    // Classes
    'classes.title': 'Classes · CrossFit La Mola Terrassa',
    'classes.description': 'The 9 disciplines: WOD, Weightlifting, Hybrid Club, Bodyweight Lab, Strength Club and more.',
    'classes.heroTitle': 'Find your movement.',
    'classes.level': 'Level',
    'classes.frequency': 'Frequency',
    'classes.duration': 'Duration',

    // Schedule
    'horari.title': 'Weekly Schedule · CrossFit La Mola Terrassa',
    'horari.description': 'Weekly box schedule. Classes Monday to Sunday. Book via Aimharder app.',
    'horari.heroTitle': 'This week\'s schedule.',
    'horari.filterAll': 'All',
    'horari.openNow': 'Open now',
    'horari.closed': 'Closed',

    // Pricing
    'tarifes.title': 'Pricing · CrossFit La Mola Terrassa',
    'tarifes.description': 'Monthly memberships and class packs. No commitment. Free first class.',
    'tarifes.heroTitle': 'Pricing without the fine print.',
    'tarifes.perMonth': '/month',
    'tarifes.sessions': 'sessions',
    'tarifes.unlimited': 'Unlimited',
    'tarifes.noCommitment': 'No commitment',

    // El Box
    'elbox.title': 'The Box · CrossFit La Mola Terrassa',
    'elbox.description': 'Meet our space and team of CF-L1 and CF-L2 certified coaches.',
    'elbox.heroTitle': 'The name comes from the mountain.',
    'elbox.coaches': 'Coaches',
    'elbox.facilities': 'Facilities',

    // Agenda
    'agenda.title': 'Events · CrossFit La Mola Terrassa',
    'agenda.description': 'Events, competitions and special activities.',
    'agenda.heroTitle': 'What\'s coming?',
    'agenda.filterAll': 'All',
    'agenda.filterComp': 'Competition',
    'agenda.filterSeminar': 'Seminar',
    'agenda.filterActivity': 'Activity',

    // Contact
    'contacte.title': 'Contact · CrossFit La Mola Terrassa',
    'contacte.description': 'Contact us. WhatsApp, email or visit the box.',
    'contacte.heroTitle': 'Say hello.',
    'contacte.formTitle': 'Book your first class.',
    'contacte.name': 'Full name',
    'contacte.phone': 'Phone',
    'contacte.email': 'Email',
    'contacte.discipline': 'Discipline you\'re interested in',
    'contacte.dontKnow': 'Not sure yet',
    'contacte.experience': 'Have you done CrossFit before?',
    'contacte.never': 'Never',
    'contacte.someSessions': 'A few classes',
    'contacte.experienced': 'Yes, I have experience',
    'contacte.compete': 'I compete',
    'contacte.when': 'When would you like to come?',
    'contacte.thisWeek': 'This week',
    'contacte.nextWeek': 'Next week',
    'contacte.notSure': 'Not sure yet',
    'contacte.notes': 'Anything else we should know?',
    'contacte.notesPlaceholder': 'Injuries, goals, questions...',

    // Days
    'days.mon': 'Monday',
    'days.tue': 'Tuesday',
    'days.wed': 'Wednesday',
    'days.thu': 'Thursday',
    'days.fri': 'Friday',
    'days.sat': 'Saturday',
    'days.sun': 'Sunday',
    'days.monShort': 'Mon',
    'days.tueShort': 'Tue',
    'days.wedShort': 'Wed',
    'days.thuShort': 'Thu',
    'days.friShort': 'Fri',
    'days.satShort': 'Sat',
    'days.sunShort': 'Sun',

    // Months
    'months.jan': 'January',
    'months.feb': 'February',
    'months.mar': 'March',
    'months.apr': 'April',
    'months.may': 'May',
    'months.jun': 'June',
    'months.jul': 'July',
    'months.aug': 'August',
    'months.sep': 'September',
    'months.oct': 'October',
    'months.nov': 'November',
    'months.dec': 'December',
  }
} as const;
