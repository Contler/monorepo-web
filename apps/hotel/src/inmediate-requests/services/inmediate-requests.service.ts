import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Request } from '@contler/models';
import { UserService } from '@contler/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'hotel/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'hotel/environments/environment';
import { RequestEntity } from '@contler/entity';

@Injectable({
  providedIn: 'root',
})
export class InmediateRequestsService {
  constructor(private authService: AuthService, private http: HttpClient, private afDb: AngularFireDatabase, private userService: UserService) {}

  listenInmediateRequestByHotel() {
    return this.authService.$employer.pipe(switchMap(user => this.http.get<RequestEntity[]>(environment.apiUrl + `hotel/${user.hotel.uid}/request`)))
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
