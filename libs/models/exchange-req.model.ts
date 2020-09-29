import * as firebase from 'firebase';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

export interface ExchangeReqModel {
  guest: string;
  hotel: string;
  uid?: string;
  money: string;
  value: string;
  createAt?: Date;
}

export const ExchangeTransform: FirestoreDataConverter<ExchangeReqModel> = {
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): ExchangeReqModel {
    const data = snapshot.data(options) as ExchangeReqModel;
    return { ...data, createAt: new Date(data.createAt) };
  },
  toFirestore(modelObject: ExchangeReqModel): firebase.firestore.DocumentData {
    const { createAt, ...rest } = modelObject;
    return { ...rest, createAt: createAt.toString() };
  },
};
