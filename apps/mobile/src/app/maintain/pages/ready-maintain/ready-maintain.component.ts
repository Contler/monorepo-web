import { Component, OnInit } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { ReceptionModel } from '@contler/models';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { ReceptionLocalService } from '../../../services/reception/reception-local.service';
import { GeneralService } from '../../../services/general.service';
import { MenuController } from '@ionic/angular';
import { DynamicModuleService, DynamicRequest, MODULES } from '@contler/dynamic-services';

@Component({
  selector: 'contler-ready-maintain',
  templateUrl: './ready-maintain.component.html',
  styleUrls: ['./ready-maintain.component.scss'],
})
export class ReadyMaintainComponent implements OnInit {
  user: EmployerEntity | null = null;
  totalReception: number;
  $receptionReq: Observable<ReceptionModel[]>;
  dynamicReq: Observable<DynamicRequest[]>;
  totalReception2: number;

  constructor(
    private auth: AuthService,
    private receptionLocalService: ReceptionLocalService,
    public generalService: GeneralService,
    public menu: MenuController,
    private dynamicService: DynamicModuleService,
  ) {}

  ngOnInit() {
    this.auth.$user.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.dynamicReq = this.dynamicService
        .getDynamicRequest(user.hotel.uid, MODULES.maintenance, false, 7)
        .pipe(tap(({ length }) => (this.totalReception2 = length)));
    });
    this.$receptionReq = this.receptionLocalService
      .getMaintainInactive()
      .pipe(tap(({ length }) => (this.totalReception = length)));
  }
}
