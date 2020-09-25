import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { User } from '@contler/models';
import { filter, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EmployerEntity } from '@contler/entity';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | undefined;
  private employerSubject = new BehaviorSubject<EmployerEntity | null>(null);

  constructor(
    private auth: AngularFireAuth,
    private storage: Storage,
    private platform: Platform,
    private http: HttpClient,
  ) {
    this.auth.user
      .pipe(
        filter((user) => !!user),
        switchMap((user) => this.http.get<EmployerEntity>(environment.apiUrl + `employer/${user!.uid}`)),
      )
      .subscribe((employer) => this.employerSubject.next(employer));
  }

  loginWithEmail(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  saveUserDataStorage(user: User) {
    return new Promise(async (resolve) => {
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

  get $user(): Observable<EmployerEntity | null> {
    return this.employerSubject.asObservable().pipe(filter((user) => !!user));
  }
}
