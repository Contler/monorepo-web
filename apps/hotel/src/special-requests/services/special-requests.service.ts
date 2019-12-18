import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '@contler/core';
import { take, switchMap, map } from 'rxjs/operators';
import { SpecialRequest } from '@contler/core/models';

@Injectable({
  providedIn: 'root',
})
export class SpecialRequestsService {
  constructor(private afDb: AngularFireDatabase, private userService: UserService) {}

  listenSpecialRequestByHotel() {
    return this.userService.getUser().pipe(
      take(1),
      switchMap(user => {
        return this.afDb
          .object<SpecialRequest>(SpecialRequest.REF)
          .valueChanges()
          .pipe(
            map((data: any) => {
              return data ? Object.values(data) as SpecialRequest[] : [];
            }),
            map((data: SpecialRequest[]) => data.filter(request => request.hotel === user.hotel)),
          );
      }),
    );
  }

  updateRequest(requestKey: string, data: any) {
    return this.afDb.object(`${SpecialRequest.REF}/${requestKey}`).update(data);
  }
}
