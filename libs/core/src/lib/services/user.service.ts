import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Admin, Employer, Guest } from '@contler/models';
import { AngularFirestore } from '@angular/fire/firestore';
import { plainToClass } from 'class-transformer';
import { HttpClient } from '@angular/common/http';
import { environment } from 'hotel/environments/environment';
import { EmployerEntity } from '@contler/entity';

@Injectable()
export class UserService {
  private activeUser: Admin | Employer | undefined;

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore, private http: HttpClient) {}

  getUser() {
    return this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.http.get<EmployerEntity>(environment.apiUrl + `employer/${user!.uid}`)),
    );
  }

  getGuest() {
    return this.afAuth.user.pipe(
      filter(user => !!user),
      take(1),
      switchMap(user => this.afStore.doc<Guest>(`${Guest.REF}/${user!.uid}`).valueChanges()),
      map(user => plainToClass(Guest, user)),
    );
  }
}
