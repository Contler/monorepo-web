import { InputField } from './input-field';
import firebase from 'firebase/app';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;
import { AbstractRequest } from './abstractRequest';

export interface DynamicRequest extends AbstractRequest {
  form: InputField[];
  nameService: string;
  serviceId: string;
}

export const receptionDynamicConverter: FirestoreDataConverter<DynamicRequest> = {
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): DynamicRequest {
    const { createAt } = snapshot.data(options);
    const data = snapshot.data(options) as DynamicRequest;
    return { ...data, createAt: createAt.toDate() };
  },
  toFirestore(modelObject: DynamicRequest): firebase.firestore.DocumentData {
    const { createAt, ...rest } = modelObject;
    return { ...rest };
  },
};
