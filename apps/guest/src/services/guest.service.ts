import { Injectable } from '@angular/core';
import { HotelService, UserService } from '@contler/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Guest, Hotel } from 'lib/models';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  private guestSubject = new BehaviorSubject<Guest | null>(null);
  private hotelSubject = new BehaviorSubject<Hotel | null>(null);
  private guestSubscribe: Subscription;
  private hotelSubscribe: Subscription;

  constructor(private userService: UserService, private afStore: AngularFirestore) {
    this.guestSubscribe = this.userService
      .getGuest()
      .pipe(tap(guest => this.guestSubject.next(guest)))
      .subscribe();
    this.hotelSubscribe = this.$guest
      .pipe(
        filter(guest => !!guest),
        switchMap(guest => this.afStore.doc<Hotel>(`${Hotel.REF}/${guest!.hotel}`).valueChanges()),
        map(hotel => plainToClass(Hotel, hotel)),
        tap(hotel => this.hotelSubject.next(hotel)),
      )
      .subscribe();
  }

  get $guest(): Observable<Guest | null> {
    return this.guestSubject.asObservable().pipe(filter(guest => !!guest));
  }

  get $hotel(): Observable<Hotel | null> {
    return this.hotelSubject.asObservable().pipe(filter(hotel => !!hotel));
  }
}
