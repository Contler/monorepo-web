import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Request } from 'lib/models';
import { UserService } from '@contler/core';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';

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
              return Object.values(data) as Request[];
            }),
            map((data: Request[]) => data.filter(request => request.hotel === user.hotel).sort(this.sortRequests)),
          );
      }),
    );
  }

  private sortRequests(a: Request, b: Request) {
    if (a.created_at < b.created_at) {
      return -1;
    }
    if (a.created_at > b.created_at) {
      return 1;
    }
    return 0;
  }
}
