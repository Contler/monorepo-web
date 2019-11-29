import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GuestRequest } from '@contler/core/models';
import { environment } from 'hotel/environments/environment';

@Injectable()
export class GuestService {

  constructor(private http: HttpClient) { }

  saveGuest(guestRequest: GuestRequest) {
    return this.http.post(environment.apiUrl + 'guest', guestRequest)
  }
}
