import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GUEST } from '@contler/const';
import { GuestService } from 'guest/services/guest.service';

@Component({
  selector: 'contler-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loader = false;
  error: string | undefined;

  constructor(
    formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private guestService: GuestService,
  ) {
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
      const token = await userCredential.user!.getIdTokenResult();
      if (token.claims.role !== GUEST) {
        this.error = 'No tiene permisos para acceder';
      }
      this.guestService.checkAvailableUser().subscribe(({ checkIn, checkOut }) => {
        this.loader = false;
        if (new Date() < checkIn) {
          this.afAuth.auth.signOut();
          this.error =
            'Tu fecha de ingreso es el ' +
            checkIn.toLocaleDateString() +
            '. Te invitamos a iniciar sesión en esta fecha';
        } else if (new Date() > checkOut) {
          this.afAuth.auth.signOut();
          this.error = 'Tu fecha de salida fué el ' + checkOut.toLocaleDateString() + '.';
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
          this.error = 'Correo o contraseña invalida';
          break;
        case 'auth/user-disabled':
          this.error = 'La cuenta ya no esta activa';
          break;
      }
    }
  }
}
