import { InputField } from './input-field';
import { GuestEntity } from '@contler/entity';
import { MODULES } from '../constants/modules-references';
import { DynamicRequestStatus } from '../constants/dynamic-request-status';
import * as firebase from 'firebase';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

export interface DynamicRequest {
  form: InputField[];
  guest?: GuestEntity;
  guestId: string;
  hotelId: string;
  nameService: string;
  service: MODULES;
  serviceId: string;
  key?: string;
  active: boolean;
  status: DynamicRequestStatus;
  createAt: Date;
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
