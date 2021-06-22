import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { Zone } from '@contler/models';
import { environment } from '../../environments/environment';
import { first, map, switchMap } from 'rxjs/operators';
import { EmployerEntity } from '@contler/entity';
import { plainToClass } from 'class-transformer';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { selectEmployer } from '../reducers/user/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class EmployerService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient, private afDb: AngularFireDatabase, private store: Store<State>) {}

  getEmployers() {
    return this.store.pipe(
      selectEmployer,
      first(),
      switchMap((user) => this.http.get<EmployerEntity[]>(this.url + `hotel/${user!.hotel.uid}/employer`)),
      map((employees) => employees.map((employer) => plainToClass(EmployerEntity, employer))),
    );
  }

  updateLeaderZone(userUid: string, old: { [key: string]: boolean }, next: { [key: string]: boolean }) {
    Object.keys(old).forEach((key) => {
      if (!(key in next)) {
        this.afDb.database.ref(`${Zone.REF}/${key}`).child('userLeader').child(userUid).remove();
      }
    });
    Object.keys(next).forEach((key) =>
      this.afDb.database.ref(`${Zone.REF}/${key}`).child('userLeader').child(userUid).set(true),
    );
  }
}
