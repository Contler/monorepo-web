import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployerEntity } from '@contler/entity';
import { ReceptionModel } from '@contler/models';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { GeneralService } from '../../../services/general.service';
import { ReceptionLocalService } from '../../../services/reception/reception-local.service';
import { RoomService } from '@contler/core';
import { TranslateService } from '@ngx-translate/core';
import {
  DynamicModuleService,
  DynamicRequest,
  DynamicRequestStatus,
  MODULES,
} from '@contler/dynamic-services';

@Component({
  selector: 'contler-pending-maintain',
  templateUrl: './pending-maintain.component.html',
  styleUrls: ['./pending-maintain.component.scss'],
})
export class PendingMaintainComponent implements OnInit {
  user: EmployerEntity | null = null;
  totalReception2: number;
  dynamicReq: Observable<DynamicRequest[]>;
  filter: DynamicRequestStatus;

  constructor(
    private auth: AuthService,
    private receptionLocalService: ReceptionLocalService,
    private snackBar: MatSnackBar,
    public generalService: GeneralService,
    public menu: MenuController,
    public roomService: RoomService,
    private translate: TranslateService,
    private dynamicService: DynamicModuleService,
  ) {}

  ngOnInit() {
    this.auth.$user.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.dynamicReq = this.dynamicService
        .getDynamicRequest(user.hotel.uid, MODULES.maintenance, true)
        .pipe(tap(({ length }) => (this.totalReception2 = length)));
    });
  }
}
