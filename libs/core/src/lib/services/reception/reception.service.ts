import { Injectable, Optional } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CoreConfig, ImmediateOptionLink, receptionConverter, ReceptionModel } from '@contler/models';
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
  // get receptionDynamicRef() {
  // return this.afs.firestore.collection('reception').withConverter(receptionDynamicConverter);
  // }
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
  getReceptionRequestDynamic(hotelUid: string): Observable<DynamicRequest[]> {
    return this.afs
      .collection<DynamicRequest>(`dynamicRequest`, (ref) =>
        ref
          .where('hotelId', '==', hotelUid)
          .where('service', '==', MODULES.reception)
          .orderBy('createAt', 'desc'),
      )
      .valueChanges()
      .pipe(tap((receptionRequest) => (this.receptionRequest = receptionRequest)));
  }
}
