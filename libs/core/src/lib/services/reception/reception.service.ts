import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  ExchangeReqModel,
  MoneyModel,
  transportConverted,
  TransportModel,
  ConciergeModel,
  conciergeConverter,
  MoneyTransform,
  ExchangeTransform,
} from '@contler/models';

@Injectable()
export class ReceptionService {
  constructor(private afs: AngularFirestore) {}

  createTransport(transport: TransportModel) {
    transport.createAt = new Date();
    const transportDoc = this.transportRef.doc();
    return transportDoc.set({ ...transport, uid: transportDoc.id });
  }

  getTransportById(hotelId: string) {
    return this.afs
      .collection<TransportModel>(this.transportRef, (ref) => ref.where('hotel', '==', hotelId))
      .valueChanges();
  }

  createMoneyChange(money: MoneyModel) {
    money.createAt = new Date();
    const moneyDoc = this.moneyRef.doc();
    return moneyDoc.set({ ...money, uid: moneyDoc.id });
  }

  getMoneyChangesById(hotelId: string) {
    return this.afs
      .collection<MoneyModel>(this.moneyRef, (ref) => ref.where('hotel', '==', hotelId))
      .valueChanges();
  }

  createExchangePetition(money: ExchangeReqModel) {
    money.createAt = new Date();
    const ref = this.exchangeRef.doc();
    return ref.set({ ...money, uid: ref.id });
  }

  getExchangePetitionByHotel(hotelId: string) {
    return this.afs
      .collection<ExchangeReqModel>(this.exchangeRef, (ref) => ref.where('hotel', '==', hotelId))
      .valueChanges();
  }

  createConciergeReq(concierge: ConciergeModel) {
    concierge.createAt = new Date();
    const ref = this.conciergeRef.doc();
    return ref.set({ ...concierge, uid: ref.id });
  }

  getConciergeByHotel(hotelId: string) {
    return this.afs
      .collection<ConciergeModel>(this.conciergeRef, (ref) => ref.where('hotel', '==', hotelId))
      .valueChanges();
  }

  private get transportRef() {
    return this.afs.firestore.collection('transport').withConverter(transportConverted);
  }

  private get moneyRef() {
    return this.afs.firestore.collection('moneyReq').withConverter(MoneyTransform);
  }

  private get exchangeRef() {
    return this.afs.firestore.collection('exchangeReq').withConverter(ExchangeTransform);
  }

  private get conciergeRef() {
    return this.afs.firestore.collection('conciergeReq').withConverter(conciergeConverter);
  }
}
