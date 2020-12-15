interface Options {
  name: string;
  icon: string;
  link?: string;
}

export const OPTIONS_RECEPTION: Options[] = [
  {
    name: 'reception.transportation',
    icon: 'fas fa-taxi',
    link: '/home/reception/transportation',
  },
  {
    name: 'reception.cashLoan',
    icon: 'fas fa-dollar-sign',
    link: '/home/reception/cash',
  },
  {
    name: 'reception.curencyExchange',
    icon: 'fas fa-globe',
    link: '/home/reception/exchange',
  },
  {
    name: 'reception.concierge',
    icon: 'fas fa-map-marker-alt',
    link: '/home/reception/concierge',
  },
];
