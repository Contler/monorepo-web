import { Injectable } from '@angular/core';
import { environment } from 'guest/environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  public readonly NOTIFICATION_URL: string = 'https://onesignal.com/api/v1/notifications';

  constructor(private http: HttpClient) {}

  sendNotification(notificationMessage: string, payerId: string[]) {
    const message = {
      app_id: environment.oneSignalKey,
      headings: {
        en: 'Contler',
        es: 'Contler',
      },
      contents: {
        en: notificationMessage,
        es: notificationMessage,
      },
      include_player_ids: payerId,
    };
    return payerId.length > 0
      ? this.http.post(this.NOTIFICATION_URL, message, {
          headers: {
            Authorization: 'Basic ' + environment.oneSignalKeyApiKey,
          },
        })
      : of({});
  }
}
