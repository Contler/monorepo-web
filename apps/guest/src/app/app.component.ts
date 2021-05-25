import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from 'guest/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'contler-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'guest';
  constructor(db: AngularFireDatabase, fire: AngularFirestore) {
    if (environment.emulate) {
      db.database.useEmulator('localhost', 9000);
      fire.firestore.useEmulator('localhost', 8081);
    }
  }
}
