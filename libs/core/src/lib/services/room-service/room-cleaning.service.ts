import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { cleaningConverted, CleaningModel } from '@contler/models';

@Injectable()
export class RoomCleaningService {
  constructor(private afs: AngularFirestore) {}

  createCleaning(cleaning: CleaningModel) {
    const cleaningDoc = this.cleaningRef.doc();
    return cleaningDoc.set({ ...cleaning, uid: cleaningDoc.id });
  }

  private get cleaningRef() {
    return this.afs.firestore.collection('cleaning').withConverter(cleaningConverted);
  }
}
