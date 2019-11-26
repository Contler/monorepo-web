import { classToPlain, Transform } from 'class-transformer';

export class Zone {
  static readonly REF = 'zone';
  uid: string;
  principal: boolean;
  name: string;
  icon: string;
  parentZone: string | undefined;
  hotel: string;
  @Transform(value => value || {}, { toClassOnly: true })
  userLeader: { [key: string]: boolean } = {};

  constructor(principal: boolean, name: string, icon: string, hotel: string, uid: string, parentZone?: string) {
    this.principal = principal;
    this.name = name;
    this.icon = icon;
    this.hotel = hotel;
    this.parentZone = parentZone;
    this.uid = uid;
  }

  serialize() {
    return classToPlain(this);
  }
}
