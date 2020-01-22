import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';
import { RequestEntity } from '@contler/entity';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SpecialRequestsService {
  constructor(private http: HttpClient, private authService: AuthService, private afDb: AngularFireDatabase) {}

  listenSpecialRequestByHotel(complete: boolean) {
    return this.authService.$user.pipe(
      switchMap(user =>
        this.http.get<RequestEntity[]>(
          environment.apiUrl + `hotel/${user!.hotel.uid}/special-request?complete=${complete ? 't' : 'f'}`,
        ),
      ),
    );
  }

  updateRequest(request: RequestEntity) {
    return this.http.put(environment.apiUrl + 'request', request);
  }
}
