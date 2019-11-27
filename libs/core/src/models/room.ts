import { classToPlain, Transform } from 'class-transformer';

export class Room {
  static readonly REF = 'room';
  zone: string;
  name: string;
  hotel: string;
  uid: string;
  busy: boolean;
  @Transform(value => value || null, { toClassOnly: true })
  guest: string | null = null;


  constructor(zone: string, name: string, hotel: string, uid: string) {
    this.zone = zone;
    this.name = name;
    this.hotel = hotel;
    this.uid = uid;
    this.busy = false;
  }

  serialize() {
    return classToPlain(this);
  }
}
