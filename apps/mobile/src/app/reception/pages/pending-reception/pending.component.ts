import { Component, OnInit } from '@angular/core';
import { ReceptionService } from '@contler/core';
import { EmployerEntity } from '@contler/entity';
import { ReceptionModel } from '@contler/models';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { ReceptionLocalService } from '../../../services/reception/reception-local.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from '../../../services/general.service';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'contler-reception-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit {
  user: EmployerEntity | null = null;
  totalReception: number;
  $receptionReq: Observable<ReceptionModel[]>;
  constructor(
    private auth: AuthService,
    private receptionLocalService: ReceptionLocalService,
    private receptionService: ReceptionService,
    private snackBar: MatSnackBar,
    public generalService: GeneralService,
    public menu: MenuController,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.auth.$user.pipe(take(1)).subscribe((user) => (this.user = user));
    this.$receptionReq = this.receptionLocalService
      .getReceptionReq()
      .pipe(tap(({ length }) => (this.totalReception = length)));
  }

  async modalClose(complete: boolean, uid: string) {
    await this.receptionService.receptionRef.doc(uid).update({ active: complete });
    this.snackBar.open(
      this.translate.instant('pendingReception.message'),
      this.translate.instant('pendingReception.close'),
      {
        duration: 3000,
      },
    );
  }
}
