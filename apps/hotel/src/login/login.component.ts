import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';

import { Claim, Language } from '@contler/models';
import { ADMIN, LANGUAGES } from '@contler/const';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'contler-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  readonly languages = LANGUAGES;
  actualLanguage: Language;
  constructor(
    formBuild: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private translate: TranslateService,
  ) {
    const { lan } = window.localStorage;
    this.actualLanguage = LANGUAGES.find((l) => l.prefix === lan) || LANGUAGES[0];
    this.loginForm = formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const { email, pass } = this.loginForm.value;
    this.afAuth.signInWithEmailAndPassword(email, pass).then(async (userCredential) => {
      const token = await userCredential.user!.getIdTokenResult();
      const { rol } = token.claims as Claim;
      if (rol === ADMIN) {
        this.router.navigate(['home', 'admin']);
      } else {
        this.router.navigate(['home']);
      }
    });
  }
  changeLanguage(lan: Language) {
    this.actualLanguage = lan;
    this.translate.use(lan.prefix);
    window.localStorage.lan = lan.prefix;
    // this.changeCurrentLanguage.emit(lan);
  }
}
