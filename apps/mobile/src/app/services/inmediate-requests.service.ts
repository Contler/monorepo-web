import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Request } from '@contler/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RequestEntity } from '@contler/entity';

@Injectable({
  providedIn: 'root',
})
export class InmediateRequestsService {
  constructor(private http: HttpClient, private afDb: AngularFireDatabase, private authService: AuthService) {}

  listenImmediateRequestByHotel(complete: boolean) {
    return this.authService.$user.pipe(
      switchMap(user =>
        this.http.get<RequestEntity[]>(
          environment.apiUrl + `employer/${user!.uid}/request?complete=${complete ? 't' : 'f'}`,
        ),
      ),
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
