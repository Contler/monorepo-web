import * as firebase from 'firebase';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

export interface MoneyModel {
  guest: string;
  hotel: string;
  uid?: string;
  value: string;
  createAt?: Date;
  active: boolean;
}

export const MoneyTransform: FirestoreDataConverter<MoneyModel> = {
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): MoneyModel {
    const data = snapshot.data(options) as MoneyModel;
    return { ...data, createAt: new Date(data.createAt) };
  },
  toFirestore(modelObject: MoneyModel): firebase.firestore.DocumentData {
    const { createAt, ...rest } = modelObject;
    return { ...rest, createAt: createAt.toString() };
  },
};
