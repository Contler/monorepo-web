import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Request } from '@contler/models';
import { UserService } from '@contler/core';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InmediateRequestsService {
  constructor(private afDb: AngularFireDatabase, private userService: UserService) {}

  listenInmediateRequestByHotel() {
    return this.userService.getUser().pipe(
      take(1),
      switchMap(user => {
        return this.afDb
          .object<Request>(Request.REF)
          .valueChanges()
          .pipe(
            map((data: any) => {
              return data ? (Object.values(data) as Request[]) : [];
            }),
            map((data: Request[]) => data.filter(request => request.hotel === user.hotel).sort(this.sortRequests)),
          );
      }),
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
