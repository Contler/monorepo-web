import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import { environment } from 'guest/environments/environment';
import { State } from 'guest/app/reducers';
import * as UserAction from '../app/reducers/user/user.actions';
import { selectUserState } from 'guest/app/reducers/user/user.selectors';
import { AnalyticsService } from '@contler/analytics';

@Component({
  selector: 'contler-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'guest';

  constructor(
    db: AngularFireDatabase,
    fire: AngularFirestore,
    private afAuth: AngularFireAuth,
    private store: Store<State>,
    private analytics: AngularFireAnalytics,
    private analyticsService: AnalyticsService,
  ) {
    if (environment.emulate) {
      db.database.useEmulator('localhost', 9000);
      fire.firestore.useEmulator('localhost', 8081);
    }
  }

  ngOnInit(): void {
    this.afAuth.authState.pipe(filter((user) => !!user)).subscribe(({ uid }) => {
      this.store.dispatch(UserAction.loadUsers({ uid }));
    });

    this.store.pipe(selectUserState).subscribe((data) => {
      if (data.user && data.user.hotel) {
        this.analytics.setUserId(data.user.uid);
        this.analytics.setUserProperties({ hotel: data.hotel.uid });
        this.analyticsService.hotel = data.user.hotel;
      }
    });
  }
}
