import { SpecialZoneGuest } from '../models';

export const DataSourceSpecialZoneGuest: SpecialZoneGuest[] = [
  { name: 'modules.immediateRequests', icon: 'room_service', link: '/home/guest-requests', status: true },
  { name: 'modules.reception', icon: 'desktop_windows', link: '/home/reception', status: true },
  { name: 'modules.room', icon: 'bed', link: '/home/my-room', status: true },
  { name: 'modules.clean', icon: 'account_circle', link: '/home/cleaning', status: true },
  { name: 'modules.maintenance', icon: 'engineering', link: '/home/maintenance', status: true },
  { name: 'modules.reservations', icon: 'book_online', link: '/home/reservation', status: true },
  { name: 'modules.orders', icon: 'fastfood', link: '/home/product', status: true },
  { name: 'modules.wakeup-call', icon: 'local_phone', link: '/home/wake-up', status: true },
  { name: 'modules.specialRequest', icon: 'smart_button', link: '/home/special-requests', status: true },
];
