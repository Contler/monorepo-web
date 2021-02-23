import { ImmediateOptionLink, ImmediateOptionText, OptionType } from '@contler/models';
import { RoomModule } from '@contler/models/room-module';

export const maintenanceBaseModule: RoomModule = {
  options: [
    {
      active: true,
      type: OptionType.LINK,
      text: 'zoneRequest.categories.roomService',
      link: '/home/product/create',
      icon: 'fas fa-utensils',
    } as ImmediateOptionLink,
    {
      active: true,
      type: OptionType.LINK,
      text: 'zoneRequest.categories.requestClean',
      link: '/home/my-room/cleaning',
      icon: 'fas fa-hotel',
    } as ImmediateOptionLink,
    {
      active: true,
      type: OptionType.LINK,
      text: 'zoneRequest.categories.maintain',
      link: '/home/my-room/maintenance',
      icon: 'fas fa-medkit',
    } as ImmediateOptionLink,
    {
      active: true,
      type: OptionType.TEXT,
      text: 'zoneRequest.categories.roomKeys',
      value: 'zoneRequest.categories.roomKeys',
      icon: 'fas fa-key',
    } as ImmediateOptionText,
  ],
};
