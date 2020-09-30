import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  public userTokens: UserTokens | undefined;

  constructor(
    private oneSignal: OneSignal,
    private db: AngularFireDatabase,
    private auth: AuthService,
    private http: HttpClient,
  ) {
    this.oneSignal.startInit(environment.oneSignalKey);
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      console.log('entro aca');
    });
    this.oneSignal.endInit();
  }

  getPlayerId() {
    return this.oneSignal.getIds();
  }

  setTokenToUser() {
    this.auth.$user.pipe(take(1)).subscribe(async (user) => {
      const { userId } = await this.oneSignal.getIds();
      user.pushToken = userId;
      this.http.put(`${environment.apiUrl}employer`, user).subscribe();
    });
  }
}

interface UserTokens {
  uid: string;
  token: string;
}
