import { Injectable } from '@angular/core';
import { UserService } from '@contler/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from 'guest/environments/environment';
import { GuestEntity } from '@contler/entity/guest.entity';
import { HotelEntity } from '@contler/entity';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  private guestSubject = new BehaviorSubject<GuestEntity | null>(null);
  private hotelSubject = new BehaviorSubject<HotelEntity | null>(null);

  constructor(
    private userService: UserService,
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private http: HttpClient,
  ) {
    this.afAuth.user
      .pipe(
        filter(user => !!user),
        switchMap(user => this.http.get<GuestEntity>(environment.apiUrl + `guest/${user!.uid}`)),
        tap(guest => this.guestSubject.next(guest)),
        tap(guest => this.hotelSubject.next(guest.hotel)),
      )
      .subscribe();
  }

  get $guest(): Observable<GuestEntity | null> {
    return this.guestSubject.asObservable().pipe(filter(guest => !!guest));
  }

  get $hotel(): Observable<HotelEntity | null> {
    return this.hotelSubject.asObservable().pipe(filter(hotel => !!hotel));
  }

  checkAvailableUser() {
    return this.$guest.pipe(map(data => new Date(data!.checkIn)));
  }
}
