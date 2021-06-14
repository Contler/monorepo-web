import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from 'guest/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from 'guest/app/reducers';
import * as UserAction from '../app/reducers/user/user.actions';
import { selectUserState } from 'guest/app/reducers/user/user.selectors';
import { AngularFireAnalytics } from '@angular/fire/analytics';

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
      this.analytics.setUserId(data.user.uid);
      this.analytics.setUserProperties({ hotel: data.hotel.uid });
    });
  }
}
