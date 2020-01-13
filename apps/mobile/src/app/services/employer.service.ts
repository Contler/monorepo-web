import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { plainToClass } from 'class-transformer';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { Employer, EmployerRequest, Zone } from '@contler/models';
import { ADMIN } from '@contler/const';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class EmployerService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private afStore: AngularFirestore,
    private afDb: AngularFireDatabase,
    private authService: AuthService
  ) {}

  saveEmployer(data: EmployerRequest) {
    return this.http.post<Employer>(this.url + "user/employer", data);
  }

  getEmployers() {
    return this.afStore
      .collection<Employer>(Employer.REF, ref =>
        ref.where("hotel", "==", this.authService.user!.hotel)
      )
      .valueChanges()
      .pipe(
        map(employes => employes),
        map(employers => employers.filter(employer => employer.role !== ADMIN)),
        map(employers =>
          employers.map(actualEmployer =>
            plainToClass(Employer, actualEmployer)
          )
        )
      );
  }

  updateLeaderZone(
    userUid: string,
    old: { [key: string]: boolean },
    next: { [key: string]: boolean }
  ) {
    Object.keys(old).forEach(key => {
      if (!(key in next)) {
        this.afDb.database
          .ref(`${Zone.REF}/${key}`)
          .child("userLeader")
          .child(userUid)
          .remove();
      }
    });
    Object.keys(next).forEach(key =>
      this.afDb.database
        .ref(`${Zone.REF}/${key}`)
        .child("userLeader")
        .child(userUid)
        .set(true)
    );
  }

  updateEmployer(employer: Employer) {
    return this.afStore
      .doc(`${Employer.REF}/${employer.uid}`)
      .update(employer.serialize());
  }

  deleteEmployer(uid: string) {
    return this.http.delete(this.url + `user/employer/${uid}`);
  }
}
