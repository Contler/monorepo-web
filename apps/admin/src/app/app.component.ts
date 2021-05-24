import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'contler-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(afAuth: AngularFireAuth, storage: AngularFireStorage) {
    if (environment.emulate) {
      afAuth.useEmulator('http://localhost:9099/');
      storage.storage.useEmulator('localhost', 9199);
    }
  }
}
