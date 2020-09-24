import * as firebase from 'firebase';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

export interface TransportModel {
  uid?: string;
  hotel: string;
  guest: string;
  date: Date;
  destination: string;
}

export const transportConverted: FirestoreDataConverter<TransportModel> = {
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): TransportModel {
    const data = snapshot.data(options) as TransportModel;
    return { ...data, date: new Date(data.date) };
  },
  toFirestore(modelObject: TransportModel): firebase.firestore.DocumentData {
    return { ...modelObject, date: modelObject.date.toString() };
  },
};
