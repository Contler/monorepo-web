import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReceptionService, RoomService } from '@contler/core';
import { EmployerEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReceptionLocalService {
  private $user: Observable<EmployerEntity | null>;

  constructor(
    private rec: ReceptionService,
    private afs: AngularFirestore,
    private auth: AuthService,
    private roomService: RoomService,
  ) {
    this.$user = this.auth.$user;
  }

  getReceptionReq() {
    return this.getArrayReception(this.rec.receptionRef);
  }

  getCleanReq() {
    return this.getArrayReception(this.roomService.cleanRef);
  }

  getMaintainReq() {
    return this.getArrayReception(this.roomService.maintainRef);
  }

  private getArrayReception<T>(ref: firebase.firestore.CollectionReference<T>) {
    return this.$user.pipe(
      switchMap(({ hotel }) =>
        this.afs
          .collection<T>(ref, (ref1) =>
            ref1.where('hotel', '==', hotel.uid).where('active', '==', true).orderBy('createAt', 'desc'),
          )
          .valueChanges(),
      ),
    );
  }
}
