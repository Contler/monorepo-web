import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { GuestService } from 'guest/services/guest.service';
import { switchMap } from 'rxjs/operators';
import { RequestRequest } from '@contler/models/request-request';
import { HttpClient } from '@angular/common/http';
import { environment } from 'guest/environments/environment';
import { RequestEntity } from '@contler/entity';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private afDb: AngularFireDatabase, private guestService: GuestService, private http: HttpClient) {}

  saveRequest(request: RequestRequest) {
    return this.http.post(environment.apiUrl + 'request', request)
  }

  getRequests(complete: boolean) {
    return this.guestService.$guest.pipe(
      switchMap(guest =>
        this.http.get<RequestEntity[]>(environment.apiUrl + `guest/${guest!.uid}/request?complete=${complete? 't' : 'f'}`)
      ),
    );
  }

  getRequest(id: number) {
    return this.http.get<RequestEntity>(environment.apiUrl + 'request/' + id)
  }

  updateRequest(request: RequestEntity) {
    return this.http.put(environment.apiUrl + 'request/qualify', request)
  }
}
