import { Component, OnInit } from '@angular/core';
import { ReceptionService } from '@contler/core';
import { EmployerEntity } from '@contler/entity';
import { ReceptionModel, ReceptionStatus } from '@contler/models';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { ReceptionLocalService } from '../../../services/reception/reception-local.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from '../../../services/general.service';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {
  DynamicModuleService,
  DynamicRequest,
  DynamicRequestStatus,
  MODULES,
} from '@contler/dynamic-services';

@Component({
  selector: 'contler-reception-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit {
  user: EmployerEntity | null = null;
  totalReception: number;
  totalReception2: number;
  $receptionReq: Observable<ReceptionModel[]>;
  dynamicReq: Observable<DynamicRequest[]>;
  filter: DynamicRequestStatus;
  constructor(
    private auth: AuthService,
    private receptionLocalService: ReceptionLocalService,
    private receptionService: ReceptionService,
    private snackBar: MatSnackBar,
    public generalService: GeneralService,
    public menu: MenuController,
    private translate: TranslateService,
    private dynamicService: DynamicModuleService,
  ) {}

  ngOnInit() {
    this.auth.$user.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.dynamicReq = this.dynamicService
        .getDynamicRequest(user.hotel.uid, MODULES.reception, true)
        .pipe(tap(({ length }) => (this.totalReception2 = length)));
    });
    this.$receptionReq = this.receptionLocalService
      .getReceptionReq()
      .pipe(tap(({ length }) => (this.totalReception = length)));
  }

  async modalClose(status: ReceptionStatus, uid: string) {
    await this.receptionService.receptionRef
      .doc(uid)
      .update({ status, active: status !== ReceptionStatus.COMPLETED });
    this.snackBar.open(
      this.translate.instant('pendingReception.message'),
      this.translate.instant('pendingReception.close'),
      {
        duration: 3000,
      },
    );
  }

  convertDate(data: string) {
    return new Date(data);
  }
}
