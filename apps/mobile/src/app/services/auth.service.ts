import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { User } from '@contler/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | undefined;

  constructor(private auth: AngularFireAuth, private storage: Storage, private platform: Platform) {}

  loginWithEmail(email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return new Promise(async (resolve, reject) => {
      this.auth.auth
        .signOut()
        .then(async () => {
          this.user = undefined;
          if (this.platform.is('cordova')) {
            await this.storage.clear();
            resolve();
          } else {
            localStorage.clear();
            resolve();
          }
        })
        .catch(() => reject());
    });
  }

  signUp(email: string, password: string) {
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  getUserDataStorage() {
    return new Promise(async resolve => {
      if (this.platform.is('cordova')) {
        await this.storage.ready();
        const userData = await this.storage.get('user');
        this.user = userData ? userData : null;
        resolve();
      } else {
        const userData = JSON.parse(localStorage.getItem('user')!);
        this.user = userData ? userData : null;
        resolve();
      }
    });
  }

  saveUserDataStorage(user: User) {
    return new Promise(async resolve => {
      this.user = Object.assign({}, user);
      if (this.platform.is('cordova')) {
        await this.storage.set('user', user);
        resolve();
      } else {
        localStorage.setItem('user', JSON.stringify(user));
        resolve();
      }
    });
  }

  changeEmail(email: string) {
    return this.auth.auth.currentUser!.updateEmail(email);
  }

  changePassword(password: string) {
    return this.auth.auth.currentUser!.updatePassword(password);
  }

  userLoginChanges() {
    return this.auth.authState;
  }
}
