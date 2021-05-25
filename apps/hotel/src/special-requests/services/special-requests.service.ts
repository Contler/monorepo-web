import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '@contler/core';
import { switchMap } from 'rxjs/operators';
import { RequestEntity } from '@contler/entity';
import { environment } from '@contler/hotel/environments/environment';
import { AuthService } from '@contler/hotel/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SpecialRequestsService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private afDb: AngularFireDatabase,
    private userService: UserService,
  ) {}

  listenSpecialRequestByHotel() {
    return this.authService.$employer.pipe(
      switchMap((user) =>
        this.http.get<RequestEntity[]>(environment.apiUrl + `hotel/${user.hotel.uid}/special-request`),
      ),
    );
  }

  updateRequest(request: RequestEntity) {
    return this.http.put(environment.apiUrl + 'request', request);
  }
}
