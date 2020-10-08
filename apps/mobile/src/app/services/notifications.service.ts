import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private router: Router,
  ) {
    this.oneSignal.startInit(environment.oneSignalKey);
    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      switch (data.notification.payload.additionalData.type) {
        case 'clean':
          this.router.navigate(['/home/clean']);
          break;
        case 'reception':
          this.router.navigate(['/home/reception']);
          break;
        case 'maintain':
          this.router.navigate(['/home/maintain']);
          break;
      }
    });
    this.oneSignal.endInit();
  }

  getPlayerId() {
    return this.oneSignal.getIds();
  }

  setTokenToUser() {
    this.auth.$user.pipe(take(1)).subscribe(async (user) => {
      const { userId } = await this.oneSignal.getIds();
      console.log(userId);
      user.pushToken = userId;
      this.http.put(`${environment.apiUrl}employer`, user).subscribe();
    });
  }
}

interface UserTokens {
  uid: string;
  token: string;
}
