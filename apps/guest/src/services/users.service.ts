import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CHIEF } from '@contler/const';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '@contler/models/user';
import { Guest } from '@contler/models/guest';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private afStore: AngularFirestore, private realtime: AngularFireDatabase) {}

  getChiefsByHotel(hotel: string) {
    return this.afStore
      .collection(User.REF, ref => ref.where('hotel', '==', hotel).where('role', '==', CHIEF))
      .valueChanges();
  }

  getUserByKey(key: string) {
    return this.afStore
      .collection(Guest.REF)
      .doc(key)
      .valueChanges();
  }

  getTokensByUser(key: string) {
    return this.realtime.object(`user-tokens/${key}`).valueChanges();
  }
}
