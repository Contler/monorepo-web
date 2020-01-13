import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Admin, Employer, Guest, User } from '@contler/models';
import { ADMIN } from '@contler/const';
import { AngularFirestore } from '@angular/fire/firestore';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  private activeUser: Admin | Employer | undefined;

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) {}

  getUser() {
    return this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.afStore.doc<User>(`${User.REF}/${user!.uid}`).valueChanges()),
      map(user => plainToClass(user!.role === ADMIN ? Admin : Employer, user)),
    );
  }

  getGuest() {
    return this.afAuth.user.pipe(
      filter(user => !!user),
      take(1),
      switchMap(user => this.afStore.doc<Guest>(`${Guest.REF}/${user!.uid}`).valueChanges()),
      map(user => plainToClass(Guest, user))
    )
  }
}
