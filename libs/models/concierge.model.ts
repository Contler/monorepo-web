import * as firebase from 'firebase';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

export interface ConciergeModel {
  uid?: string;
  hotel: string;
  guest: string;
  date: Date;
  comment: string;
  createAt?: Date;
}

export const conciergeConverter: FirestoreDataConverter<ConciergeModel> = {
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): ConciergeModel {
    const data = snapshot.data(options) as ConciergeModel;
    const { date, createAt } = snapshot.data(options);
    return { ...data, date: new Date(date), createAt: new Date(createAt) };
  },
  toFirestore(modelObject: ConciergeModel): firebase.firestore.DocumentData {
    const { date, createAt, ...rest } = modelObject;
    return { ...rest, date: date.toString(), createAt: createAt.toString() };
  },
};
