import { Injectable, Optional } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CoreConfig, receptionConverter, ReceptionModel } from '@contler/models';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReceptionService {
  private readonly url: string;

  constructor(
    private afs: AngularFirestore,
    @Optional() private config: CoreConfig,
    private http: HttpClient,
  ) {
    this.url = this.config.urlBackend;
  }

  createReception(reception: ReceptionModel) {
    const receptionDoc = this.receptionRef.doc();
    reception.uid = receptionDoc.id;
    this.sendNotification(reception.hotel);
    return receptionDoc.set({ ...reception });
  }

  private sendNotification(hotelId: string) {
    this.http.get(`${this.url}hotel/${hotelId}/notification/reception`).subscribe();
  }

  get receptionRef() {
    return this.afs.firestore.collection('reception').withConverter(receptionConverter);
  }
}
