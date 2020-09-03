import { Injectable } from '@angular/core';
import { environment } from 'guest/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  public readonly NOTIFICATION_URL: string = 'https://onesignal.com/api/v1/notifications';

  constructor(private http: HttpClient) {}

  private async sendNotification(notificationMessage: string, payerId: string) {
    try {
      // Give data to send message
      // The playerId is the id of device for oneSignal
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
        include_player_ids: [payerId],
      };
      // Go to OneSignal REST API endpoint to send push
      return this.http
        .post(this.NOTIFICATION_URL, message, this.getNotificationHeaders())
        .toPromise();
    } catch (err) {
      console.error(err);
    }
  }
  pushNotification(message: string, token: string) {
    return this.sendNotification(message, token);
  }

  sendMassiveNotification(message: string, tokens: string[]) {
    return new Promise((resolve, reject) => {
      const promisesToExecute: Promise<any>[] = [];
      for (let i = 0; i < tokens.length; i++) {
        promisesToExecute.push(this.sendNotification(message, tokens[i]));
      }
      Promise.all(promisesToExecute)
        .then(() => resolve())
        .catch(() => reject());
    });
  }

  private getNotificationHeaders() {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + environment.oneSignalKeyApiKey,
    });
    return { headers };
  }
}
