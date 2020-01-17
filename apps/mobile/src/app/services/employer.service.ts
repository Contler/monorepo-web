import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { Employer, EmployerRequest, Zone } from '@contler/models';
import { environment } from '../../environments/environment';
import { switchMap } from 'rxjs/operators';
import { EmployerEntity } from '@contler/entity';

@Injectable({
  providedIn: 'root',
})
export class EmployerService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private afStore: AngularFirestore,
    private afDb: AngularFireDatabase,
    private authService: AuthService,
  ) {}

  saveEmployer(data: EmployerRequest) {
    return this.http.post<Employer>(this.url + 'user/employer', data);
  }

  getEmployers() {
    return this.authService.$user.pipe(
      switchMap(user => this.http.get<EmployerEntity[]>(this.url + `hotel/${user!.hotel.uid}/employer`)),
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
