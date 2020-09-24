import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MoneyModel, transportConverted, TransportModel } from '@contler/models';

@Injectable()
export class ReceptionService {
  constructor(private afs: AngularFirestore) {}

  createTransport(transport: TransportModel) {
    const transportDoc = this.transportRef.doc();
    return transportDoc.set({ ...transport, uid: transportDoc.id });
  }

  getTransportById(hotelId: string) {
    return this.afs
      .collection<TransportModel>(this.transportRef, (ref) => ref.where('hotel', '==', hotelId))
      .valueChanges();
  }

  createMoneyChange(money: MoneyModel) {
    const moneyDoc = this.moneyRef.doc();
    return moneyDoc.set({ ...money, uid: moneyDoc.id });
  }

  getMoneyChangesById(hotelId: string) {
    return this.afs
      .collection<MoneyModel>(this.moneyRef, (ref) => ref.where('hotel', '==', hotelId))
      .valueChanges();
  }

  private get transportRef() {
    return this.afs.firestore.collection('transport').withConverter(transportConverted);
  }

  private get moneyRef() {
    return this.afs.firestore.collection('moneyChange');
  }
}
