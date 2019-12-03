import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Guest, GuestRequest } from '@contler/core/models';
import { environment } from 'hotel/environments/environment';
import { UserService } from '@contler/core';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { plainToClass } from 'class-transformer';

@Injectable()
export class GuestService {
  constructor(private http: HttpClient, private userService: UserService, private afStore: AngularFirestore) {}

  saveGuest(guestRequest: GuestRequest) {
    return this.http.post(environment.apiUrl + 'guest', guestRequest);
  }

  getGuest() {
    return this.userService.getUser().pipe(
      take(1),
      switchMap(user =>
        this.afStore
          .collection<Guest>(Guest.REF, ref => ref.where('hotel', '==', user.hotel).where('active', '==', true))
          .valueChanges(),
      ),
      map(guests => guests.map(guest => plainToClass(Guest, guest))),
    );
  }

  deleteUser(uid: string) {
    return this.http.delete(environment.apiUrl + `guest/${uid}`)
  }
}
