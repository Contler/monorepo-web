import { Injectable } from '@angular/core';
import { TypeRequest } from '../constants/typeRequest';
import { RequestFormData, RequestMessageData } from '../interfaces/dataRequestCreate';
import { RequestFormCreator, RequestMessageCreator } from '../utils/requestCreators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AbstractRequest } from '../interfaces/abstractRequest';
import { QueryFn } from '@angular/fire/firestore/interfaces';

import firebase from 'firebase';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;
import { EmployerEntity } from '@contler/entity';
import { DynamicRequestStatus } from '../constants/dynamic-request-status';
import { DynamicRequest } from '../interfaces/dynamic-request';
import { RequestMessage } from '../interfaces/RequestMessage';
import { MODULES } from '../constants/modules-references';
import { FilterRequest } from '../interfaces/filterRequest';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  readonly requestRef: (query?: QueryFn) => AngularFirestoreCollection<AbstractRequest>;

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

    this.requestRef = (query?: QueryFn) => {
      const ref = this.afFirestore.firestore.collection('dynamicRequest').withConverter(requestConverter);
      return this.afFirestore.collection<AbstractRequest>(ref, query);
    };
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
    return this.requestRef().doc(request.key).set(request);
  }

  qualifyRequest(request: AbstractRequest, score: number, comment = null) {
    return this.requestRef().doc(request.key).update({ score, comment });
  }

  changeStatus(key: string, status: DynamicRequestStatus, employer?: EmployerEntity) {
    const updateObj: Partial<AbstractRequest> = {
      status,
    };

    if (employer) {
      const { leaderZones, leaderSpecialZone, averageTime, hotel, ...data } = employer;
      updateObj.assigned = data as EmployerEntity;
      updateObj.assignedId = data.uid;
    }

    if (status === DynamicRequestStatus.COMPLETED) {
      updateObj.completeAt = new Date();
      updateObj.active = false;
    }
    return this.requestRef().doc(key).update(updateObj);
  }

  getNameService(request: AbstractRequest) {
    if (!request) {
      return '';
    }
    switch (request.typeRequest) {
      case TypeRequest.FORM_REQUEST:
        return (request as DynamicRequest).nameService;
      case TypeRequest.MESSAGE_REQUEST:
        return (request as RequestMessage).message;
      default:
        return (request as DynamicRequest).nameService;
    }
  }

  getByService(service: MODULES, filters?: FilterRequest) {
    const query: QueryFn = (qf) => {
      let qft = qf.where('service', '==', service);
      for (const filtersKey in filters) {
        if (filtersKey in filters) {
          if (filtersKey !== 'date') {
            qft = qft.where(filtersKey, '==', filters[filtersKey]);
          } else {
            qft = qft.where('createAt', '>', filters[filtersKey]);
          }
        }
      }
      return qft.orderBy('createAt', 'desc');
    };
    return this.requestRef(query);
  }
}
