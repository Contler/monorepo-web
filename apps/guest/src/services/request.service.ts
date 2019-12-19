import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Request } from '@contler/core/models';
import { GuestService } from 'guest/services/guest.service';
import { map, switchMap } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private afDb: AngularFireDatabase, private guestService: GuestService) {}

  getRequestFinish() {
    return this.guestService.$guest.pipe(
      switchMap(guest =>
        this.afDb.list<Request>(Request.REF, ref => ref.orderByChild('user').equalTo(guest!.uid)).valueChanges(),
      ),
      map(requests => requests!.map(request => plainToClass(Request, request))),
      map(requests => requests!.filter(rq => rq.complete && !rq.score))
    );
  }

  updateRequest(request: Request) {
    return this.afDb.object('request/' + request.uid).update(request.serialize())
  }
}
