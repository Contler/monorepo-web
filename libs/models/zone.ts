import { classToPlain, Transform } from 'class-transformer';

export class Zone {
  static readonly REF = 'zone';
  uid: string;
  principal: boolean;
  name: string;
  icon: string;
  category: { name: string; value: number };
  hotel: string;
  @Transform(value => value || {}, { toClassOnly: true })
  userLeader: { [key: string]: boolean } = {};

  constructor(
    principal: boolean,
    name: string,
    icon: string,
    hotel: string,
    uid: string,
    category: { name: string; value: number },
  ) {
    this.principal = principal;
    this.name = name;
    this.icon = icon;
    this.hotel = hotel;
    this.category = category;
    this.uid = uid;
  }

  serialize() {
    return classToPlain(this);
  }
}
