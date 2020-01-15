import { Injectable } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ZoneEntity } from '@contler/entity';
import { HttpClient } from '@angular/common/http';
import { environment } from 'guest/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  private zonesSubject = new BehaviorSubject<ZoneEntity[]>([]);
  private zonesSubscribe: Subscription | undefined;

  constructor(private afAuth: AngularFireAuth, private http: HttpClient, private guestService: GuestService) {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.loadZones();
      } else if (this.zonesSubscribe) {
        this.zonesSubscribe.unsubscribe();
      }
    });
  }

  private loadZones() {
    this.zonesSubscribe = this.guestService.$hotel
      .pipe(
        switchMap(hotel => this.http.get<ZoneEntity[]>(environment.apiUrl + `hotel/${hotel!.uid}/zone`)),
        tap(zones => this.zonesSubject.next(zones)),
      )
      .subscribe();
  }

  get $zones() {
    return this.zonesSubject.asObservable();
  }
}
