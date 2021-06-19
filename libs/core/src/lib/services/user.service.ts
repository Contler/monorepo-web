import { Injectable, Optional } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, switchMap } from 'rxjs/operators';
import { CoreConfig } from '@contler/models';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { EmployerEntity, GuestEntity } from '@contler/entity';

@Injectable()
export class UserService {
  private readonly url: string;

  constructor(
    @Optional() private config: CoreConfig,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private http: HttpClient,
  ) {
    this.url = this.config.urlBackend;
  }

  getUser() {
    return this.afAuth.user.pipe(
      filter((user) => !!user),
      switchMap((user) => this.http.get<EmployerEntity>(this.url + `employer/${user!.uid}`)),
    );
  }

  getGuestById(uid: string) {
    return this.http.get<GuestEntity>(this.url + `guest/${uid}`);
  }

  getEmployerById(uid: string) {
    return this.http.get<EmployerEntity>(this.url + `employer/${uid}`);
  }
}
