import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReceptionService, RoomService } from '@contler/core';
import { EmployerEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
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
    return this.getArrayReception(this.rec.receptionRef, true);
  }

  getCleanReq() {
    return this.getArrayReception(this.roomService.cleanRef, true);
  }

  getMaintainReq() {
    return this.getArrayReception(this.roomService.maintainRef, true);
  }

  getReceptionInactive() {
    return this.getArrayReception(this.rec.receptionRef, false);
  }

  getCleaningInactive() {
    return this.getArrayReception(this.roomService.cleanRef, false);
  }

  getMaintainInactive() {
    return this.getArrayReception(this.roomService.maintainRef, false);
  }

  private getArrayReception<T>(ref: firebase.firestore.CollectionReference<T>, isActive: boolean) {
    return this.$user.pipe(
      switchMap(({ hotel }) =>
        this.afs
          .collection<T>(ref, (ref1) =>
            ref1.where('hotel', '==', hotel.uid).where('active', '==', isActive).orderBy('createAt', 'desc'),
          )
          .valueChanges(),
      ),
    );
  }
}
