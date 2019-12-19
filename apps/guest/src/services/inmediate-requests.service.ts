import { Injectable } from '@angular/core';
import { Request } from '@contler/core/models';
import { AngularFireDatabase } from '@angular/fire/database';
import { GuestService } from './guest.service';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InmediateRequestsService {
  constructor(private afDb: AngularFireDatabase, private guestService: GuestService) {}

  listenInmediateRequestByHotel() {
    return this.guestService.$guest.pipe(
      switchMap(guest => {
        return this.afDb
          .object<Request>(Request.REF)
          .valueChanges()
          .pipe(
            map((data: any) => {
              return Object.values(data) as Request[];
            }),
            map((data: Request[]) => data.filter(request => request.user == guest!.uid).sort(this.sortRequests)),
          );
      }),
    );
  }

  getInmediateRequestByKey(key: string) {
    return this.afDb.object(`${Request.REF}/${key}`).valueChanges();
  }

  updateRequest(requestKey: string, data: any) {
    return this.afDb.object(`${Request.REF}/${requestKey}`).update(data);
  }

  private sortRequests(a: Request, b: Request) {
    if (a.created_at < b.created_at) {
      return 1;
    }
    if (a.created_at > b.created_at) {
      return -1;
    }
    return 0;
  }
}
