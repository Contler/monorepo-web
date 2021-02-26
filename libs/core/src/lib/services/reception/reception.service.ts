import { Injectable, Optional } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  CoreConfig,
  ImmediateOptionLink,
  receptionConverter,
  receptionDynamicConverter,
  ReceptionModel,
} from '@contler/models';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { DynamicRequest, MODULES } from '@contler/dynamic-services';
import { tap } from 'rxjs/operators';

@Injectable()
export class ReceptionService {
  private readonly url: string;
  receptionRequest: DynamicRequest[];
  constructor(
    private afs: AngularFirestore,
    @Optional() private config: CoreConfig,
    private http: HttpClient,
    private afDb: AngularFireDatabase,
  ) {
    this.url = this.config.urlBackend;
  }

  createReception(reception: ReceptionModel) {
    const receptionDoc = this.receptionRef.doc();
    reception.uid = receptionDoc.id;
    this.sendNotification(reception.hotel);
    return receptionDoc.set({ ...reception });
  }

  sendNotification(hotelId: string) {
    this.http.get(`${this.url}hotel/${hotelId}/notification/reception`).subscribe();
  }

  get receptionRef() {
    return this.afs.firestore.collection('reception').withConverter(receptionConverter);
  }
  get maintenanceRef() {
    return this.afs.firestore.collection('maintain').withConverter(receptionConverter);
  }
  get roomRef() {
    return this.afs.firestore.collection('maintain').withConverter(receptionConverter);
  }
  getOptionsReception(hotelUid: string): Observable<ImmediateOptionLink[] | null> {
    const path = `${MODULES.root}/${hotelUid}/${MODULES.reception}/options`;
    return this.afDb
      .list<ImmediateOptionLink>(path, (ref) => ref.orderByChild('active').equalTo(true))
      .valueChanges();
  }

  getReceptionRequest(hotelUid: string): Observable<ReceptionModel[]> {
    return this.afs
      .collection<ReceptionModel>(this.receptionRef, (ref) =>
        ref.where('hotel', '==', hotelUid).orderBy('createAt', 'desc'),
      )
      .valueChanges();
  }
  getMaintenanceRequest(hotelUid: string): Observable<ReceptionModel[]> {
    return this.afs
      .collection<ReceptionModel>(this.maintenanceRef, (ref) =>
        ref.where('hotel', '==', hotelUid).orderBy('createAt', 'desc'),
      )
      .valueChanges();
  }
  getRoomRequest(hotelUid: string): Observable<ReceptionModel[]> {
    return this.afs
      .collection<ReceptionModel>(this.roomRef, (ref) =>
        ref.where('hotel', '==', hotelUid).orderBy('createAt', 'desc'),
      )
      .valueChanges();
  }
}
