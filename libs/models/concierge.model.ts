import * as firebase from 'firebase';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

export interface ConciergeModel {
  uid?: string;
  hotel: string;
  guest: string;
  date: Date;
  comment: string;
}

export const conciergeConverter: FirestoreDataConverter<ConciergeModel> = {
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): ConciergeModel {
    const data = snapshot.data(options) as ConciergeModel;
    const { date } = snapshot.data(options);
    return { ...data, date: new Date(date) };
  },
  toFirestore(modelObject: ConciergeModel): firebase.firestore.DocumentData {
    return { ...modelObject, date: modelObject.date.toString() };
  },
};
