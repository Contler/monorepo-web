import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { SUPER_ADMIN } from '@contler/const';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string;
  load = false;

  constructor(formBuild: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {
    this.loginForm = formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    this.error = '';
    this.load = true;
    const { email, pass } = this.loginForm.value;
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, pass);
      const token = await credential.user?.getIdTokenResult();
      const { role } = token.claims;
      if (role === SUPER_ADMIN) {
        this.router.navigate(['home']);
      } else {
        this.error = 'No tiene permiso para acceder';
        this.afAuth.signOut();
      }
    } catch (e) {
      const { message } = e;
      this.error = message;
    } finally {
      this.load = false;
    }
  }
}
