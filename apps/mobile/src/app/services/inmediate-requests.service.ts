import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Request } from '@contler/core/models';

@Injectable({
  providedIn: "root"
})
export class InmediateRequestsService {
  constructor(
    private afDb: AngularFireDatabase,
    private authService: AuthService
  ) {}

  listenInmediateRequestByHotel() {
    return this.afDb
      .object<Request>(Request.REF)
      .valueChanges()
      .pipe(
        map((data: any) => {
          return Object.values(data) as Request[];
        }),
        map((data: Request[]) =>
          data
            .filter(request => request.hotel === this.authService.user!.hotel && this.authService.user!.leaderZone[request.zone])
            .sort(this.sortRequests)
        )
      );
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
