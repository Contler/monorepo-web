import * as firebase from 'firebase';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

export interface RoomKeyModel {
  uid?: string;
  hotel: string;
  guest: string;
  time: Date;
  nameRequest: string;
}

export const roomKeysConverted: FirestoreDataConverter<RoomKeyModel> = {
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): RoomKeyModel {
    const data = snapshot.data(options) as RoomKeyModel;
    return { ...data, time: new Date(data.time) };
  },
  toFirestore(modelObject: RoomKeyModel): firebase.firestore.DocumentData {
    return { ...modelObject, date: modelObject.time.toString() };
  },
};
