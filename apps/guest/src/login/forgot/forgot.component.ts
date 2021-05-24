import { Component, OnInit } from '@angular/core';
import { LOGIN_CONSTANTS } from 'guest/login/login.constants';

@Component({
  selector: 'contler-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  constants = LOGIN_CONSTANTS;

  constructor() {}

  ngOnInit(): void {}
}
