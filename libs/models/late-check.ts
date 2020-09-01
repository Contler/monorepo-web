import { GuestEntity } from '@contler/entity';

export interface LateCheck {
  uid: string,
  date: Date,
  hotel: string,
  user: string,
  status: number,
}


export interface LateCheckUser {
  uid: string,
  date: Date,
  hotel: string,
  user: GuestEntity,
  status: number,
}
