import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { EmployerEntity } from '@contler/entity';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'contler-latecheck-out',
  templateUrl: './latecheck-out.component.html',
  styleUrls: ['./latecheck-out.component.scss'],
})
export class LatecheckOutComponent implements OnInit {
  user: EmployerEntity | null = null;

  constructor(public generalService: GeneralService, auth: AuthService, public menu: MenuController,) {
    auth.$user.subscribe(user => (this.user = user));
  }

  ngOnInit() {}
}
