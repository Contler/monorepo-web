import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'contler-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(storage: AngularFireStorage, db: AngularFireDatabase) {
    if (environment.emulate) {
      storage.storage.useEmulator('localhost', 9199);
      db.database.useEmulator('localhost', 9000);
    }
  }
}
