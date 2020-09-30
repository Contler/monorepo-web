import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { EmployerEntity } from '@contler/entity';
import { ReceptionModel } from '@contler/models';

import { take, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { GeneralService } from '../services/general.service';
import { Observable } from 'rxjs';
import { ReceptionLocalService } from './services/reception/reception-local.service';

@Component({
  selector: 'contler-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
})
export class ReceptionComponent implements OnInit {
  user: EmployerEntity | null = null;
  totalReception: number;
  $receptionReq: Observable<ReceptionModel[]>;

  constructor(
    private auth: AuthService,
    public menu: MenuController,
    public generalService: GeneralService,
    private receptionService: ReceptionLocalService,
  ) {
    this.auth.$user.pipe(take(1)).subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.$receptionReq = this.receptionService
      .getReceptionReq()
      .pipe(tap(({ length }) => (this.totalReception = length)));
  }
}
