import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { GuestService } from 'guest/services/guest.service';
import { combineAll, map, mergeAll, switchMap, take, tap } from 'rxjs/operators';
import { RequestRequest } from '@contler/models/request-request';
import { HttpClient } from '@angular/common/http';
import { environment } from 'guest/environments/environment';
import { RequestEntity } from '@contler/entity';
import { ZoneService } from 'guest/services/zone.service';
import { combineLatest } from 'rxjs';
import { NotificationsService } from 'guest/services/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(
    private afDb: AngularFireDatabase,
    private guestService: GuestService,
    private http: HttpClient,
    private zoneService: ZoneService,
    private ntfService: NotificationsService,
  ) {}

  createRequest(zoneId: string, msg: string, isSpecial = false) {
    const zone$ = this.zoneService.$zones.pipe(
      map(zones => zones.find(zone => zone.uid === zoneId)),
    );

    return combineLatest(zone$, this.guestService.$guest).pipe(
      tap(([zone]) => {
        const tokens = zone!.leaders
          .filter(leader => !!leader.pushToken)
          .map(leader => leader.pushToken);
        this.ntfService.sendMassiveNotification('Tienes una nueva solicitud inmediata', tokens);
      }),
      map(([zone, guest]) => {
        return {
          hotel: guest!.hotel,
          guest: guest!,
          room: guest!.room,
          zone: zone!,
          special: isSpecial,
          message: msg,
        } as RequestRequest;
      }),
      switchMap(req => this.saveRequest(req)),
    );
  }

  saveRequest(request: RequestRequest) {
    return this.http.post(environment.apiUrl + 'request', request);
  }

  getRequests(complete: boolean) {
    return this.guestService.$guest.pipe(
      switchMap(guest =>
        this.http.get<RequestEntity[]>(
          environment.apiUrl + `guest/${guest!.uid}/request?complete=${complete ? 't' : 'f'}`,
        ),
      ),
    );
  }

  getRequest(id: number) {
    return this.http.get<RequestEntity>(environment.apiUrl + 'request/' + id);
  }

  updateRequest(request: RequestEntity) {
    return this.http.put(environment.apiUrl + 'request/qualify', request);
  }
}
