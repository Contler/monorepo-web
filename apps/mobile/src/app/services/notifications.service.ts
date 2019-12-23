import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  public userTokens: UserTokens[] = [];

  constructor(private oneSignal: OneSignal, private db: AngularFireDatabase) {}

  getPlayerId(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.oneSignal
        .getIds()
        .then((data: { userId: string; pushToken: string }) => {
          resolve(data.userId);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  setTokenToUser(uid: string, token: string) {
    return this.db.object(`user-tokens/${uid}/${token}`).set(true);
  }
}

interface UserTokens {
  uid: string;
  tokens: string[];
}
