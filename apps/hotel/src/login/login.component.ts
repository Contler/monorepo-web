import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'contler-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(formBuild: FormBuilder) {
    this.loginForm = formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit() {
  }

  get emailForm() {
    return this.loginForm.get('email')
  }

  get passForm() {
    return this.loginForm.get('pass')
  }

}
