import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RoomKeyModel, roomKeysConverted } from '@contler/models';

@Injectable()
export class RoomKeyService {
  constructor(private afs: AngularFirestore) {}

  createRequest(roomKey: RoomKeyModel) {
    const roomKeyDoc = this.roomKeyRef.doc();
    return roomKeyDoc.set({ ...roomKey, uid: roomKeyDoc.id });
  }

  private get roomKeyRef() {
    return this.afs.firestore.collection('roomKey').withConverter(roomKeysConverted);
  }
}
