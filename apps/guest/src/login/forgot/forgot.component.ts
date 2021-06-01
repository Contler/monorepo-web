import { Component, OnInit } from '@angular/core';
import { LOGIN_CONSTANTS } from 'guest/login/login.constants';
import { AngularFireAuth } from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'contler-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  constants = LOGIN_CONSTANTS;
  password: string;
  error: string;

  constructor(private afAuth: AngularFireAuth, private dialogRef: MatDialogRef<ForgotComponent>) {}

  ngOnInit(): void {}

  recoveryPassword() {
    this.error = '';
    this.afAuth
      .sendPasswordResetEmail(this.password)
      .then(() => {
        this.dialogRef.close();
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/argument-error':
          case 'auth/user-not-found':
            this.error = this.constants.invalidEmail;
        }
        console.log(err);
      });
  }
}
