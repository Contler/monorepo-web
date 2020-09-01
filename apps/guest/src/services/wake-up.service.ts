import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WakeRequest } from '@contler/models';
import { environment } from 'guest/environments/environment';
import { WakeUpEntity } from '@contler/entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class WakeUpService {
  private wakeSubject = new BehaviorSubject<WakeUpEntity[] | null>(null);

  constructor(private http: HttpClient, afAuth: AngularFireAuth) {
    afAuth.user
      .pipe(
        filter(user => !!user),
        switchMap(user => this.getWake(user!.uid)),
      )
      .subscribe(wakes => this.wakeSubject.next(wakes));
  }

  getWake(idGuest: string) {
    return this.http
      .get<WakeUpEntity[]>(environment.apiUrl + `guest/${idGuest}/wake-up`)
      .pipe(map(wakes => wakes!.map(wake => plainToClass(WakeUpEntity, wake))), tap(data => {
        console.log(data);
      }));
  }

  saveWake(wake: WakeRequest) {
    const request = classToPlain(wake)
    return this.http.post<WakeUpEntity>(environment.apiUrl + 'wake-up', request).pipe(
      map(wakeUp => plainToClass(WakeUpEntity, wakeUp)),
      tap(wakeUp =>
        this.wakeSubject.next([...(this.wakeSubject.getValue() ? this.wakeSubject.getValue()! : []), wakeUp]),
      ),
    );
  }

  deleteWake(id: number) {
    return this.http.delete(environment.apiUrl + `wake-up/${id}`).pipe(
      tap(() => {
        this.wakeSubject.next(this.wakeSubject.getValue()!.filter(wake => wake.id !== id));
      }),
    );
  }

  get $wakeUp(): Observable<WakeUpEntity[]> {
    return this.wakeSubject.asObservable().pipe(
      filter(wake => !!wake),
      map(wakes => wakes!.filter(wake => wake.competeDate.getTime() > Date.now())),
    );
  }
}
