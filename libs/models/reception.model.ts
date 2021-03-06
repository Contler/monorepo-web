import { GuestEntity, RoomEntity } from '../entity';
import firebase from 'firebase/app';
import { DynamicRequest } from '@contler/dynamic-services';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

export enum ReceptionStatus {
  PROGRAMING = 'transportation.programing',
  ATTENDED = 'transportation.attended',
  COMPLETED = 'transportation.complete',
}

export interface ReceptionModel {
  uid?: string;
  hotel: string;
  guest: string;
  comment: string;
  createAt: Date;
  active: boolean;
  type: string;
  room?: RoomEntity;
  status: ReceptionStatus;
}

export const receptionConverter: FirestoreDataConverter<ReceptionModel> = {
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): ReceptionModel {
    const data = snapshot.data(options) as ReceptionModel;
    const { createAt } = snapshot.data(options);
    return { ...data, createAt: new Date(createAt) };
  },
  toFirestore(modelObject: ReceptionModel): firebase.firestore.DocumentData {
    const { createAt, ...rest } = modelObject;
    return { ...rest, createAt: createAt.toString() };
  },
};
export interface ReqRecpetionGuest {
  request: ReceptionModel;
  guest: GuestEntity;
}
