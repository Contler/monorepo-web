import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, map, switchMap } from 'rxjs/operators';
import { Admin, Employer, User } from 'lib/models';
import { ADMIN } from 'lib/const';
import { AngularFirestore } from '@angular/fire/firestore';
import { plainToClass } from 'class-transformer';
import { Subscription } from 'rxjs';

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
}
