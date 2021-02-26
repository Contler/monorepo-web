import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'hotel/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'hotel/environments/environment';
import { RequestEntity } from '@contler/entity';
import { AngularFireDatabase } from '@angular/fire/database';
import { MODULES } from '@contler/dynamic-services';
import { ImmediateCategory } from '@contler/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InmediateRequestsService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private afDb: AngularFireDatabase,
  ) {}

  listenInmediateRequestByHotel() {
    return this.authService.$employer.pipe(
      switchMap((user) =>
        this.http.get<RequestEntity[]>(environment.apiUrl + `hotel/${user.hotel.uid}/request`),
      ),
    );
  }

  updateRequest(request: RequestEntity) {
    return this.http.put(environment.apiUrl + 'request', request);
  }

  getRequest(id: number) {
    return this.http.get(environment.apiUrl + `request/${id}`);
  }
  getCategoriesImmediate(hotelUid: string): Observable<ImmediateCategory[]> {
    const url = `${MODULES.root}/${hotelUid}/${MODULES.immediate}/categories`;
    return this.afDb.list<ImmediateCategory>(url).valueChanges();
  }
}
