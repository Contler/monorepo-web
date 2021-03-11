import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getLan, GUEST, LANGUAGES } from '@contler/const';
import { GuestService } from 'guest/services/guest.service';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '@contler/models';

@Component({
  selector: 'contler-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loader = false;
  error: string | undefined;
  actualLanguage: Language;
  readonly languages = LANGUAGES;

  constructor(
    formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private guestService: GuestService,
    private translate: TranslateService,
  ) {
    const [actualLan] = getLan();
    this.actualLanguage = actualLan;
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]],
    });
  }

  async login() {
    this.error = undefined;
    this.loader = true;
    const { email, pass } = this.loginForm.value;
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, pass);
      const token = await userCredential.user!.getIdTokenResult();
      if (token.claims.role !== GUEST) {
        this.error = this.translate.instant(`login.youDoNotHavePermissionToAccess`);
      }
      this.guestService.checkAvailableUser().subscribe(({ checkIn, checkOut }) => {
        this.loader = false;
        if (new Date() < checkIn) {
          this.afAuth.signOut();
          this.error = `${this.translate.instant(
            'login.yourEntryDateIs',
          )} ${checkIn.toLocaleDateString()}. ${this.translate.instant(
            'login.weInviteYouToLogInOnThisDate',
          )}.`;
        } else if (new Date() > checkOut) {
          this.afAuth.signOut();
          this.error = `${this.translate.instant(
            'login.yourDepartureDateWas',
          )} ${checkOut.toLocaleDateString()}.`;
        } else {
          this.router.navigate(['/home']);
        }
      });
    } catch (error) {
      this.loader = false;
      const { code } = error;

      switch (code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          this.error = this.translate.instant('auth.userNotFound');
          break;
        case 'auth/user-disabled':
          this.error = this.translate.instant('auth.userDisabled');
          break;
      }
    }
  }
  changeLanguage() {
    this.translate.use(this.actualLanguage.prefix);
    window.localStorage.lan = this.actualLanguage.prefix;
  }
}
