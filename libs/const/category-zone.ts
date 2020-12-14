export const CATEGORY_ZONE = [
  {
    name: 'ZONAS SOCIALES',
    value: 0,
  },
  {
    name: 'ZONAS HÚMEDAS',
    value: 1,
  },
  {
    name: 'MI HABITACIÓN',
    value: 2,
  },
  {
    name: 'FUERA DEL HOTEL',
    value: 3,
  },
  {
    name: 'ZONAS DE COMIDAS',
    value: 4,
  },
];

export const SUB_CATEGORY = {
  1: [
    { name: 'Room keys', icon: 'vpn_key' },
    { name: 'Reserve a space', icon: 'calendar_today' },
    { name: 'A drink', icon: 'local_bar' },
    { name: 'Call the hotel staff', icon: 'people' },
  ],
  2: [
    { name: 'Towels', icon: 'bookmark' },
    { name: 'A drink', icon: 'local_bar' },
    { name: 'Reserve a space', icon: 'calendar_today' },
    { name: 'Other', icon: 'add' },
  ],
  3: [
    { name: 'Room Service', icon: 'notifications_active' },
    { name: 'Request cleaning', icon: 'bathtub' },
    { name: 'Program wake up call', icon: 'watch_later' },
    { name: 'Request late check-out', icon: 'today' },
  ],
  4: [
    { name: 'Pre-order food', icon: 'fastfood' },
    { name: 'Request room cleaning', icon: 'watch_later' },
    { name: 'Special requests', icon: 'deck' },
  ],
  5: [
    { name: 'Waiter', icon: 'person' },
    { name: 'Room keys', icon: 'vpn_key' },
  ],
};

export const SUB_CATEGORY_ROOM = [
  { name: 'Room Service', icon: 'fastfood', link: '/home/product/create', text: 'myRoom.roomService' },
  { name: 'Request cleaning', icon: 'house', link: '/home/my-room/cleaning', text: 'myRoom.requestCleaning' },
  {
    name: 'Request maintenance',
    icon: 'build',
    link: '/home/my-room/maintenance',
    text: 'myRoom.requestMaintenance',
  },
  { name: 'Room keys', icon: 'lock_open', text: 'myRoom.roomKeys' },
];
