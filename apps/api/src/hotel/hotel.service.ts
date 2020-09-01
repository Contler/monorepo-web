import { Injectable } from '@nestjs/common';
import { Hotel } from '@contler/models';

import { database, firestore } from 'firebase-admin';

@Injectable()
export class HotelService {
  createHotel(name: string, logo: string) {
    const hotel = new Hotel();
    hotel.name = name;
    hotel.logo = logo;
    hotel.uid = database()
      .ref()
      .push().key;
    firestore()
      .doc(`${Hotel.REF}/${hotel.uid}`)
      .set(hotel.serialize());
    return hotel;
  }
}
