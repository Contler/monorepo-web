import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employer, EmployerRequest, Zone } from '@contler/core/models';
import { environment } from 'hotel/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, take } from 'rxjs/operators';
import { UserService } from '@contler/core';
import { plainToClass } from 'class-transformer';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class EmployerService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private afStore: AngularFirestore,
    private afDb: AngularFireDatabase,
    private userService: UserService,
  ) {}

  saveEmployer(data: EmployerRequest) {
    return this.http.post<Employer>(this.url + 'user/employer', data);
  }

  getEmployers() {
    return this.userService.getUser().pipe(
      take(1),
      switchMap(user =>
        this.afStore.collection<Employer>(Employer.REF, ref => ref.where('hotel', '==', user.hotel)).valueChanges(),
      ),
      map(employers => employers.map(actualEmployer => plainToClass(Employer, actualEmployer))),
    );
  }

  updateLeaderZone(userUid: string, old: { [key: string]: boolean }, next: { [key: string]: boolean }) {
    Object.keys(old).forEach(key => {
      if (!(key in next)) {
        this.afDb.database
          .ref(`${Zone.REF}/${key}`)
          .child('userLeader')
          .child(userUid)
          .remove();
      }
    });
    Object.keys(next).forEach(key =>
      this.afDb.database
        .ref(`${Zone.REF}/${key}`)
        .child('userLeader')
        .child(userUid)
        .set(true),
    );
  }

  updateEmployer(employer: Employer) {
    return this.afStore.doc(`${Employer.REF}/${employer.uid}`).update(employer.serialize());
  }

  deleteEmployer(uid: string) {
    return this.http.delete(this.url + `user/employer/${uid}`);
  }
}
