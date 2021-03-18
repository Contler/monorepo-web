import { SpecialZoneGuest } from '../models';

export const DataSourceSpecialZoneGuest: SpecialZoneGuest[] = [
  { name: 'modules.immediateRequests', icon: 'room_service', link: '/home/guest-requests', status: false },
  { name: 'modules.reception', icon: 'room_service', link: '/home/reception', status: false },
  { name: 'modules.clean', icon: 'account_circle', link: '/home/cleaning', status: false },
  { name: 'modules.maintenance', icon: 'engineering', link: '/home/maintenance', status: false },
  { name: 'modules.reservations', icon: 'book_online', link: '/home/reservation', status: false },
  { name: 'modules.orders', icon: 'room_service', link: '/home/product', status: false },
  { name: 'modules.wakeup-call', icon: 'local_phone', link: '/home/wake-up', status: false },
  { name: 'modules.specialRequest', icon: 'smart_button', link: '/home/special-requests', status: false },
];
