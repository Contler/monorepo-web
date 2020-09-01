import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'hotel/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'hotel/environments/environment';
import { RequestEntity } from '@contler/entity';

@Injectable({
  providedIn: 'root',
})
export class InmediateRequestsService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  listenInmediateRequestByHotel() {
    return this.authService.$employer.pipe(
      switchMap(user => this.http.get<RequestEntity[]>(environment.apiUrl + `hotel/${user.hotel.uid}/request`)),
    );
  }

  updateRequest(request: RequestEntity) {
    return this.http.put(environment.apiUrl + 'request', request);
  }

  getRequest(id: number) {
    return this.http.get(environment.apiUrl + `request/${id}`)
  }

}
