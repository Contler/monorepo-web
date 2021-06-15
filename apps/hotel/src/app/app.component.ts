import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter } from 'rxjs/operators';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { HotelService } from '@contler/core';

@Component({
  selector: 'contler-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    fireStore: AngularFirestore,
    db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private analytics: AngularFireAnalytics,
    private hotelService: HotelService,
  ) {
    if (environment.emulate) {
      fireStore.firestore.useEmulator('localhost', 8081);
      db.database.useEmulator('localhost', 9000);
    }

    this.userStatus();
  }

  userStatus() {
    this.afAuth.authState.pipe(filter((user) => !!user)).subscribe((user) => {
      this.analytics.setUserId(user?.uid);
      this.hotelService
        .getUserHotel(user?.uid)
        .toPromise()
        .then((hotel) => this.analytics.setUserProperties({ hotel: hotel.uid }));
    });
  }
}
