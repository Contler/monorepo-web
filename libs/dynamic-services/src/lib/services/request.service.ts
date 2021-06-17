import { Injectable } from '@angular/core';
import { TypeRequest } from '../constants/typeRequest';
import { RequestFormData, RequestMessageData } from '../interfaces/dataRequestCreate';
import { RequestFormCreator, RequestMessageCreator } from '../utils/requestCreators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AbstractRequest } from '../interfaces/abstractRequest';
import firebase from 'firebase';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  readonly requestRef: AngularFirestoreCollection<AbstractRequest>;

  constructor(private afFirestore: AngularFirestore) {
    const requestConverter: FirestoreDataConverter<AbstractRequest> = {
      fromFirestore(
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions,
      ): AbstractRequest {
        const createAt = snapshot.data(options).createAt as firebase.firestore.Timestamp;
        const completeAt = snapshot.data(options).completeAt as firebase.firestore.Timestamp;
        return {
          ...(snapshot.data(options) as AbstractRequest),
          createAt: createAt.toDate(),
          completeAt: completeAt ? completeAt.toDate() : undefined,
        };
      },
      toFirestore(modelObject: AbstractRequest): firebase.firestore.DocumentData {
        return modelObject;
      },
    };

    const ref = this.afFirestore.firestore.collection('dynamicRequest').withConverter(requestConverter);
    this.requestRef = this.afFirestore.collection<AbstractRequest>(ref);
  }

  createRequest(type: TypeRequest.FORM_REQUEST, data: RequestFormData): RequestFormCreator;
  createRequest(type: TypeRequest.MESSAGE_REQUEST, data: RequestMessageData): RequestMessageCreator;
  createRequest(type: TypeRequest, data: any) {
    const key = this.afFirestore.createId();
    switch (type) {
      case TypeRequest.FORM_REQUEST:
        return new RequestFormCreator(key, type, data);
      case TypeRequest.MESSAGE_REQUEST:
        return new RequestMessageCreator(key, type, data);
    }
  }

  saveRequest(request: AbstractRequest) {
    return this.requestRef.doc(request.key).set(request);
  }
}
