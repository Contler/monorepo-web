import { Injectable, Optional } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Admin, CoreConfig, Employer, Guest } from '@contler/models';
import { AngularFirestore } from '@angular/fire/firestore';
import { plainToClass } from 'class-transformer';
import { HttpClient } from '@angular/common/http';
import { EmployerEntity } from '@contler/entity';

@Injectable()
export class UserService {
  private activeUser: Admin | Employer | undefined;
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

  getGuest() {
    return this.afAuth.user.pipe(
      filter((user) => !!user),
      take(1),
      switchMap((user) => this.afStore.doc<Guest>(`${Guest.REF}/${user!.uid}`).valueChanges()),
      map((user) => plainToClass(Guest, user)),
    );
  }
}
