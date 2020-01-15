import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GuestRequest } from '@contler/models';
import { environment } from 'hotel/environments/environment';
import { UserService } from '@contler/core';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { GuestEntity } from '@contler/entity/guest.entity';

@Injectable()
export class GuestService {
  constructor(private http: HttpClient, private userService: UserService, private afStore: AngularFirestore) {}

  saveGuest(guestRequest: GuestRequest) {
    return this.http.post(environment.apiUrl + 'guest', guestRequest);
  }

  updateGuest(guest: GuestEntity) {
    return this.http.put(environment.apiUrl + 'guest', guest);
  }

  getGuest() {
    return this.userService.getUser().pipe(
      switchMap(user => this.http.get<GuestEntity[]>(environment.apiUrl + `hotel/${user.hotel.uid}/guest`)),
    );
  }

  deleteUser(uid: string) {
    return this.http.delete(environment.apiUrl + `guest/${uid}`)
  }
}
