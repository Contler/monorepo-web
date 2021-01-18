import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { GuestService } from 'guest/services/guest.service';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { RequestRequest } from '@contler/models/request-request';
import { HttpClient } from '@angular/common/http';
import { environment } from 'guest/environments/environment';
import { RequestEntity, ZoneEntity } from '@contler/entity';
import { ZoneService } from 'guest/services/zone.service';
import { combineLatest } from 'rxjs';
import { NotificationsService } from 'guest/services/notifications.service';
import { TranslateService as DynamicService } from '@contler/dynamic-translate';
import { TranslateService } from '@ngx-translate/core';
import { getLan } from '@contler/const';

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
    private dynamicService: DynamicService,
    private translate: TranslateService,
    private notificationsService: NotificationsService,
  ) {}

  newRequest(zone: ZoneEntity, msg: string) {
    const chiefTokens = zone.leaders.filter((leader) => !!leader.pushToken).map((leader) => leader.pushToken);
    return this.guestService.$guest.pipe(
      take(1),
      map((guest) => {
        const request = new RequestRequest();
        request.hotel = guest!.hotel;
        request.guest = guest!;
        request.room = guest!.room;
        request.zone = zone!;
        request.special = false;
        request.message = msg;
        return request;
      }),
      switchMap((request) => this.saveRequest(request)),
      switchMap(() => this.translate.getTranslation('en-US')),
      switchMap((dic) => {
        const waiting = dic['zoneRequest']['waitingToBeAttended'];
        const immediateRequest = dic['zoneRequest']['thereIsAnImmediateRequestAt'];
        const zoneName = this.dynamicService.getInstantWithLan('en-US', zone.name);

        return this.notificationsService.sendNotification(
          `${immediateRequest} ${zoneName} ${waiting}`,
          chiefTokens,
        );
      }),
    );
  }

  createRequest(zoneId: string, msg: string, isSpecial = false) {
    const zone$ = this.zoneService.$zones.pipe(map((zones) => zones.find((zone) => zone.uid === zoneId)));

    return combineLatest([zone$, this.guestService.$guest]).pipe(
      tap(([zone]) => {
        const tokens = zone!.leaders.filter((leader) => !!leader.pushToken).map((leader) => leader.pushToken);
        const msn = this.translate.instant('notification.newRequest', {
          zoneName: this.dynamicService.getInstant(zone.name),
        });
        this.ntfService.sendNotification(msn, tokens).subscribe();
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
      switchMap((req) => this.saveRequest(req)),
    );
  }

  saveRequest(request: RequestRequest) {
    const [to, from] = getLan();
    request.to = to;
    request.from = from;
    return this.http.post(environment.apiUrl + 'request', request);
  }

  getRequests(complete: boolean) {
    return this.guestService.$guest.pipe(
      switchMap((guest) =>
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
    const [to, from] = getLan();
    return this.http.put(environment.apiUrl + 'request/qualify', { ...request, to, from });
  }
}
