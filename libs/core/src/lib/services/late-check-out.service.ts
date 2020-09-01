import { Injectable, Optional } from '@angular/core';
import { CoreConfig, LateCheck, LateCheckUser } from '@contler/models';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, mergeAll, switchMap, take, toArray } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { GuestEntity } from '@contler/entity';

@Injectable()
export class LateCheckOutService {
  private url: string;

  constructor(@Optional() private config: CoreConfig, private http: HttpClient, private afs: AngularFirestore) {
    this.url = this.config.urlBackend;
  }

  getLateByHotel(idHotel: string): Observable<LateCheckUser[]> {
    return this.afs
      .collection<LateCheck>('late', ref => ref.where('hotel', '==', idHotel))
      .valueChanges()
      .pipe(
        take(1),
        switchMap(data => from(data)),
        map(item =>
          this.http
            .get<GuestEntity>(this.url + `guest/${item.user}`)
            .pipe(map(user => ({ ...item, user, date: new Date(item.date) }))),
        ),
        mergeAll(),
        toArray(),
      );
  }

  changeStatusLate(status: number, uid: string) {
    return this.afs.doc(`late/${uid}`).update({ status });
  }
}
