import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { filter, switchMap, tap, map } from 'rxjs/operators';
import { environment } from 'guest/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GuestEntity } from '@contler/entity/guest.entity';
import { Observable } from 'rxjs';

@Injectable()
export class AvalibleUserGuard implements CanActivateChild {
  constructor(private http: HttpClient, private afAuth: AngularFireAuth, private router: Router) {}
  canActivateChild(): Observable<boolean> {
    return this.afAuth.user.pipe(
      filter((user) => !!user),
      switchMap((user) => this.http.get<GuestEntity>(environment.apiUrl + `guest/${user!.uid}`)),
      tap((guest) => guest),
      map((data) => ({ checkIn: new Date(data!.checkIn), checkOut: new Date(data!.checkOut) })),
      map(({ checkIn, checkOut }) => !(new Date() < checkIn || new Date() > checkOut)),
      tap((active) => {
        if (!active) {
          this.afAuth.signOut().then(() => this.router.navigate(['/login']));
        }
      }),
    );
  }
}
