import { Injectable } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Zone } from '@contler/models';
import { BehaviorSubject, Subscription } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  private zonesSubject = new BehaviorSubject<Zone[]>([]);
  private zonesSubscribe: Subscription | undefined;

  constructor(private guestService: GuestService, private afDt: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.loadZones();
      } else if (this.zonesSubscribe) {
        this.zonesSubscribe.unsubscribe();
      }
    });
  }

  private loadZones() {
    this.zonesSubscribe = this.guestService.$guest
      .pipe(
        switchMap(guest =>
          this.afDt.list<Zone>(`${Zone.REF}`, ref => ref.orderByChild('hotel').equalTo(guest!.hotel)).valueChanges(),
        ),
        map(zones => zones.map(zone => plainToClass(Zone, zone))),
        tap(zones => this.zonesSubject.next(zones)),
      )
      .subscribe();
  }

  get $zones() {
    return this.zonesSubject.asObservable();
  }
}
