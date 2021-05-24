import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@Component({
  selector: 'contler-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(afAuth: AngularFireAuth, fireStore: AngularFirestore, db: AngularFireDatabase) {
    if (environment.emulate) {
      afAuth.useEmulator('http://localhost:9099/');
      fireStore.firestore.useEmulator('localhost', 8081);
      db.database.useEmulator('localhost', 9000);
    }
  }
}
