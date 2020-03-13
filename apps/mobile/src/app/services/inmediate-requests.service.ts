import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Request } from '@contler/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RequestEntity } from '@contler/entity';
import { AngularFireAuth } from '@angular/fire/auth';
import { iif } from 'rxjs';
import { ADMIN } from '@contler/const';

@Injectable({
  providedIn: 'root',
})
export class InmediateRequestsService {
  constructor(
    private http: HttpClient,
    private afDb: AngularFireDatabase,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
  ) {}

  listenImmediateRequestByHotel(complete: boolean) {
    const adminRequest = this.authService.$user.pipe(
      switchMap(user =>
        this.http.get<RequestEntity[]>(
          environment.apiUrl + `hotel/${user!.hotel.uid}/request-admin?complete=${complete ? 't' : 'f'}&special=f`,
        ),
      ),
    );

    const employerRequest = this.authService.$user.pipe(
      switchMap(user =>
        this.http.get<RequestEntity[]>(
          environment.apiUrl + `employer/${user!.uid}/request?complete=${complete ? 't' : 'f'}`,
        ),
      ),
    );

    return this.afAuth.idTokenResult.pipe(
      switchMap(token => iif(() => token!.claims.role === ADMIN, adminRequest, employerRequest)),
    );
  }

  updateRequest(request: RequestEntity) {
    return this.http.put(environment.apiUrl + 'request', request);
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
