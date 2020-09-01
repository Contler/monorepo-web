import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';

import { Claim } from '@contler/models';
import { ADMIN } from '@contler/const';

@Component({
  selector: 'contler-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(formBuild: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {
    this.loginForm = formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  login() {
    const {email, pass} = this.loginForm.value;
    this.afAuth.auth.signInWithEmailAndPassword(email, pass).then(async userCredential => {
      const token = await userCredential.user!.getIdTokenResult();
      const {rol} = token.claims as Claim;
      if (rol === ADMIN) {
        this.router.navigate(['home', 'admin'])
      } else {
        this.router.navigate(['home'])
      }
    })
  }


}
