import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { User } from '@contler/models';

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private readonly path: string = "user";

  constructor(private db: AngularFirestore) {}

  getUserByKey(key: string) {
    return this.db
      .collection(this.path)
      .doc(key)
      .valueChanges()
      .pipe(take(1));
  }

  add(user: User) {
    return new Promise((resolve, reject) => {
      this.db
        .collection(this.path)
        .doc(user.uid!)
        .set(Object.assign({}, user))
        .then(() => resolve(user))
        .catch(() => reject());
    });
  }

  update(userKey: any, data: any) {
    return this.db
      .collection(this.path)
      .doc(userKey)
      .update(Object.assign({}, data));
  }
}
