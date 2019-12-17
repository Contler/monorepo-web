import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CHIEF } from '@contler/core/const';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private afStore: AngularFirestore,
    private realtime: AngularFireDatabase) {}

  getChiefsByHotel(hotel: string) {
    return this.afStore.collection('user', ref => ref.where('hotel', '==', hotel).where('role', '==', CHIEF)).valueChanges();
  }

  getTokensByUser(key: string){
    return this.realtime.object(`user-tokens/${key}`).valueChanges();
  }
}
