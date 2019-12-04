import { classToPlain } from 'class-transformer';

export class Request {
  static readonly REF = 'request';
  uid: string;
  hotel: string;
  user: string;
  zone: string;
  message: string;

  constructor(uid: string, hotel: string, user: string, zone: string, message: string) {
    this.uid = uid;
    this.hotel = hotel;
    this.user = user;
    this.zone = zone;
    this.message = message;
  }

  serialize() {
    return classToPlain(this);
  }
}
