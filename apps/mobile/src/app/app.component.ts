import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import * as userActions from './reducers/user/user.actions';
import { environment } from '../environments/environment';
import { AnalyticsService } from '@contler/analytics';
import { selectHotel } from './reducers/user/user.selectors';

@Component({
  selector: 'contler-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mobile';

  constructor(
    db: AngularFireDatabase,
    fire: AngularFirestore,
    private afAuth: AngularFireAuth,
    private store: Store<State>,
    private analytics: AnalyticsService,
  ) {
    if (environment.emulate) {
      db.database.useEmulator('localhost', 9000);
      fire.firestore.useEmulator('localhost', 8081);
    }
  }

  ngOnInit(): void {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        this.store.dispatch(userActions.loadUser({ uid: user.uid }));
      }
    });

    this.store.pipe(selectHotel).subscribe((hotel) => {
      this.analytics.hotel = hotel;
    });
  }
}
