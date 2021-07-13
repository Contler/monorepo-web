import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GuestService } from 'guest/services/guest.service';

@Injectable()
export class AvalibleUserGuard implements CanActivateChild {
  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private router: Router,
    private guestService: GuestService,
  ) {}
  canActivateChild(): Observable<boolean> {
    return this.guestService.$guest.pipe(
      map((data) => ({
        checkIn: new Date(data!.hotelBooking?.checkIn),
        checkOut: new Date(data!.hotelBooking?.checkOut),
      })),
      map(({ checkIn, checkOut }) => !(new Date() < checkIn || new Date() > checkOut)),
      tap((active) => {
        if (!active) {
          this.afAuth.signOut().then(() => this.router.navigate(['/login']));
        }
      }),
    );
  }
}
