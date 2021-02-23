import { Injectable, Optional } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CoreConfig, OptionModule, receptionConverter, ReceptionModel } from '@contler/models';
import { HttpClient } from '@angular/common/http';
import { MODULES } from '@contler/dynamic-services';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class RoomService {
  private readonly url: string;

  constructor(
    private afs: AngularFirestore,
    @Optional() private config: CoreConfig,
    private http: HttpClient,
    private afDb: AngularFireDatabase,
  ) {
    this.url = this.config.urlBackend;
  }

  createClean(reception: ReceptionModel) {
    const cleanDoc = this.cleanRef.doc();
    reception.uid = cleanDoc.id;
    this.http.get(`${this.url}hotel/${reception.hotel}/notification/clean`).subscribe();
    return cleanDoc.set({ ...reception });
  }

  createMaintain(reception: ReceptionModel) {
    const maintainDoc = this.maintainRef.doc();
    reception.uid = maintainDoc.id;
    this.http.get(`${this.url}hotel/${reception.hotel}/notification/maintain`).subscribe();
    return maintainDoc.set({ ...reception });
  }

  get cleanRef() {
    return this.afs.firestore.collection('clean').withConverter(receptionConverter);
  }

  get maintainRef() {
    return this.afs.firestore.collection('maintain').withConverter(receptionConverter);
  }
  getOptionsRoom(hotelUid: string): Observable<OptionModule[] | null> {
    const path = `${MODULES.root}/${hotelUid}/${MODULES.room}/options`;
    return this.afDb
      .list<OptionModule>(path, (ref) => ref.orderByChild('active').equalTo(true))
      .valueChanges();
  }
}
