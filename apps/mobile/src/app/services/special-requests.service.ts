import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { SpecialRequest } from '@contler/core/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class SpecialRequestsService {
  constructor(
    private afDb: AngularFireDatabase,
    private authService: AuthService
  ) {}

  listenSpecialRequestByHotel() {
    return this.afDb
      .object<SpecialRequest>(SpecialRequest.REF)
      .valueChanges()
      .pipe(
        map((data: any) => {
          return Object.values(data) as SpecialRequest[];
        }),
        map((data: SpecialRequest[]) =>
          data.filter(
            request =>
              request.hotel === this.authService.user!.hotel
          )
        )
      );
  }

  updateRequest(requestKey: string, data: any) {
    return this.afDb.object(`${SpecialRequest.REF}/${requestKey}`).update(data);
  }
}
