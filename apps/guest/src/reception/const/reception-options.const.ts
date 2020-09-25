interface Options {
  name: string;
  icon: string;
  link?: string;
}

export const OPTIONS_RECEPTION: Options[] = [
  {
    name: 'Transportation',
    icon: 'fas fa-taxi',
    link: '/home/reception/transportation',
  },
  {
    name: 'Cash loan',
    icon: 'fas fa-dollar-sign',
    link: '/home/reception/cash',
  },
  {
    name: 'Curency exchange',
    icon: 'fas fa-globe',
    link: '/home/reception/exchange',
  },
  {
    name: 'Concierge',
    icon: 'fas fa-map-marker-alt',
    link: '/home/reception/concierge',
  },
];
