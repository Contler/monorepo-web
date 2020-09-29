import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReceptionService } from '@contler/core';
import { EmployerEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import * as firebase from 'firebase/app';

@Injectable()
export class ReceptionLocalService {
  private $user: Observable<EmployerEntity | null>;

  constructor(private rec: ReceptionService, private afs: AngularFirestore, private auth: AuthService) {
    this.$user = this.auth.$user;
  }

  getActiveConcierges() {
    const ref = this.rec.conciergeRef;
    return this.getArrayReception(ref);
  }

  getExchanges() {
    const ref = this.rec.exchangeRef;
    return this.getArrayReception(ref);
  }

  getMoneyExchange() {
    const ref = this.rec.moneyRef;
    return this.getArrayReception(ref);
  }

  getTransport() {
    return this.getArrayReception(this.rec.transportRef);
  }

  private getArrayReception<T>(ref: firebase.firestore.CollectionReference<T>) {
    return this.$user.pipe(
      switchMap(({ hotel }) =>
        this.afs
          .collection<T>(ref, (ref1) => ref1.where('hotel', '==', hotel.uid).where('active', '==', true))
          .valueChanges(),
      ),
    );
  }
}
