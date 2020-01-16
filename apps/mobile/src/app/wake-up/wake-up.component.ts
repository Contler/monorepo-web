import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EmployerEntity } from '@contler/entity';

@Component({
  selector: 'contler-wake-up',
  templateUrl: './wake-up.component.html',
  styleUrls: ['./wake-up.component.scss'],
})
export class WakeUpComponent implements OnInit {
  user: EmployerEntity | null = null;

  constructor(private auth: AuthService) {
    this.auth.$user.subscribe(user => (this.user = user));
  }

  ngOnInit() {}
}
