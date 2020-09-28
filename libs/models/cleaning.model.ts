import * as firebase from 'firebase';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

export interface CleaningModel {
  uid?: string;
  hotel: string;
  guest: string;
  time: Date;
  cleaning: string;
  what?: string;
  recomendation: string;
}

export const cleaningConverted: FirestoreDataConverter<CleaningModel> = {
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): CleaningModel {
    const data = snapshot.data(options) as CleaningModel;
    return { ...data, time: new Date(data.time) };
  },
  toFirestore(modelObject: CleaningModel): firebase.firestore.DocumentData {
    return { ...modelObject, date: modelObject.time.toString() };
  },
};
