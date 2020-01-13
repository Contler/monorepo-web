import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GUEST } from '@contler/const';

@Component({
  selector: 'contler-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loader = false;
  error: string | undefined;

  constructor(formBuilder: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {
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
      const userCredential = await this.afAuth.auth.signInWithEmailAndPassword(email, pass);

      this.router.navigate(['/home']);
      const token = await userCredential.user!.getIdTokenResult();
      if (token.claims.rol !== GUEST) {
        this.error = 'No tiene permisos para acceder'
      }
      this.loader = false;
    } catch (error) {
      this.loader = false;
      const { code } = error;
      console.log(code);
      switch (code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          this.error = 'Correo o contraseña invalida';
          break;
        case 'auth/user-disabled':
          this.error = 'La cuenta ya no esta activa';
          break;
      }
    }
  }
}
