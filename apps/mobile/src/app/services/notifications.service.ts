import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  public userTokens: UserTokens | undefined;

  constructor(private oneSignal: OneSignal, private db: AngularFireDatabase) {
    this.oneSignal.startInit(environment.oneSignalKey);
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      console.log('entro aca');
    });
    this.oneSignal.endInit();
  }

  getPlayerId() {
    return this.oneSignal.getIds();
  }

  setTokenToUser(uid: string, token: string) {
    this.userTokens = { uid, token };
    // this.oneSignal.setExternalUserId(uid);
    return this.db.object(`user-tokens/${uid}/${token}`).set(true);
  }
}

interface UserTokens {
  uid: string;
  token: string;
}
