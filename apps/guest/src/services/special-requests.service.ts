import { Injectable } from '@angular/core';
import { SpecialRequest } from '@contler/models';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class SpecialRequestsService {
  constructor(private db: AngularFirestore, private realtime: AngularFireDatabase) {}

  add(data: SpecialRequest) {
    return this.realtime.object(`${SpecialRequest.REF}/${data.uid}`).set(Object.assign({}, data));
  }
}
