import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, map, switchMap } from 'rxjs/operators';
import { Admin, Employer, User } from 'lib/models';
import { ADMIN } from 'lib/const';
import { AngularFirestore } from '@angular/fire/firestore';
import { plainToClass } from 'class-transformer';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class UserService {

  private activeUser: Admin | Employer | undefined;
  private subscribe: Subscription | undefined;

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) {
    this.loadUser()
  }

  loadUser() {
    this.afAuth.user.subscribe(afUser => {
      if (afUser) {
        this.subscribe = this.afStore
          .doc<User>(`${User.REF}/${afUser.uid}`)
          .valueChanges()
          .pipe(map(user => plainToClass(user!.role === ADMIN ? Admin : Employer, user)))
          .subscribe(user => this.activeUser = user);
      } else if (!!this.subscribe) {
        this.subscribe.unsubscribe();
      }
    });
  }

  get user () {
    return this.activeUser
  }
}
