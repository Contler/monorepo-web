import * as firebase from 'firebase';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

export interface MaintenanceModel {
  uid?: string;
  hotel: string;
  guest: string;
  time: Date;
  maintenance: string;
}

export const maintenanceConverted: FirestoreDataConverter<MaintenanceModel> = {
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): MaintenanceModel {
    const data = snapshot.data(options) as MaintenanceModel;
    return { ...data };
  },
  toFirestore(modelObject: MaintenanceModel): firebase.firestore.DocumentData {
    return { ...modelObject };
  },
};
