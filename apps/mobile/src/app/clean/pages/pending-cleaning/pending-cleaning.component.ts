import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomService } from '@contler/core';
import { EmployerEntity } from '@contler/entity';
import { ReceptionModel } from '@contler/models';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { GeneralService } from '../../../services/general.service';
import { ReceptionLocalService } from '../../../services/reception/reception-local.service';

@Component({
  selector: 'contler-pending-cleaning',
  templateUrl: './pending-cleaning.component.html',
  styleUrls: ['./pending-cleaning.component.scss'],
})
export class PendingCleaningComponent implements OnInit {
  user: EmployerEntity | null = null;
  totalReception: number;
  $receptionReq: Observable<ReceptionModel[]>;

  constructor(
    private auth: AuthService,
    private receptionLocalService: ReceptionLocalService,
    private snackBar: MatSnackBar,
    public generalService: GeneralService,
    public menu: MenuController,
    private roomService: RoomService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.auth.$user.pipe(take(1)).subscribe((user) => (this.user = user));
    this.$receptionReq = this.receptionLocalService
      .getCleanReq()
      .pipe(tap(({ length }) => (this.totalReception = length)));
  }

  async modalClose(complete: boolean, uid: string) {
    await this.roomService.cleanRef.doc(uid).update({ active: complete });
    const msn = this.translate.instant('clean.petitionUpdate');
    const err = this.translate.instant('global.CLOSE');
    this.snackBar.open(msn, err, { duration: 3000 });
  }
}
