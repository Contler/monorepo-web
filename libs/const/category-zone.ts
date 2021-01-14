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
    { name: 'zoneRequest.categories.roomKeys', icon: 'vpn_key' },
    { name: 'zoneRequest.categories.spaceReserve', icon: 'calendar_today' },
    { name: 'zoneRequest.categories.drink', icon: 'local_bar' },
    { name: 'zoneRequest.categories.callHotel', icon: 'people' },
  ],
  2: [
    { name: 'zoneRequest.categories.towels', icon: 'bookmark' },
    { name: 'zoneRequest.categories.drink', icon: 'local_bar' },
    { name: 'zoneRequest.categories.spaceReserve', icon: 'calendar_today' },
    { name: 'zoneRequest.categories.other', icon: 'add' },
  ],
  3: [
    { name: 'zoneRequest.categories.roomService', icon: 'notifications_active' },
    { name: 'zoneRequest.categories.requestClean', icon: 'bathtub' },
    { name: 'zoneRequest.categories.wakeUp', icon: 'watch_later' },
    { name: 'zoneRequest.categories.checkOut', icon: 'today' },
  ],
  4: [
    { name: 'zoneRequest.categories.food', icon: 'fastfood' },
    { name: 'zoneRequest.categories.clean', icon: 'watch_later' },
    { name: 'zoneRequest.categories.specialRequest', icon: 'deck' },
  ],
  5: [
    { name: 'zoneRequest.categories.waiter', icon: 'person' },
    { name: 'zoneRequest.categories.roomKeys', icon: 'vpn_key' },
  ],
};

export const SUB_CATEGORY_ROOM = [
  {
    name: 'zoneRequest.categories.roomService',
    icon: 'fastfood',
    link: '/home/product/create',
    text: 'myRoom.roomService',
  },
  {
    name: 'zoneRequest.categories.clean',
    icon: 'house',
    link: '/home/my-room/cleaning',
    text: 'myRoom.requestCleaning',
  },
  {
    name: 'zoneRequest.categories.maintain',
    icon: 'build',
    link: '/home/my-room/maintenance',
    text: 'myRoom.requestMaintenance',
  },
  { name: 'zoneRequest.categories.roomKeys', icon: 'lock_open', text: 'myRoom.roomKeys' },
];
