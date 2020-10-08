import { Injectable, Optional } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CoreConfig, receptionConverter, ReceptionModel } from '@contler/models';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoomService {
  private readonly url: string;

  constructor(
    private afs: AngularFirestore,
    @Optional() private config: CoreConfig,
    private http: HttpClient,
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
}
