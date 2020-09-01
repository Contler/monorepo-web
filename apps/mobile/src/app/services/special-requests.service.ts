import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';
import { RequestEntity } from '@contler/entity';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { iif } from 'rxjs';
import { ADMIN } from '@contler/const';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class SpecialRequestsService {
  constructor(private http: HttpClient, private authService: AuthService, private afAuth: AngularFireAuth) {}

  listenSpecialRequestByHotel(complete: boolean) {
    const adminRequest = this.authService.$user.pipe(
      switchMap(user =>
        this.http.get<RequestEntity[]>(
          environment.apiUrl + `hotel/${user!.hotel.uid}/request-admin?complete=${complete ? 't' : 'f'}&special=t`,
        ),
      ),
    );

    const employerRequest = this.authService.$user.pipe(
      switchMap(user =>
        this.http.get<RequestEntity[]>(
          environment.apiUrl + `hotel/${user!.hotel.uid}/special-request?complete=${complete ? 't' : 'f'}`,
        ),
      ),
    )

    return this.afAuth.idTokenResult.pipe(
      switchMap(token => iif(() => token!.claims.role === ADMIN, adminRequest, employerRequest)),
    );
  }

  updateRequest(request: RequestEntity) {
    return this.http.put(environment.apiUrl + 'request', request);
  }
}
