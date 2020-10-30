import { Component, OnInit } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { ReceptionModel } from '@contler/models';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { GeneralService } from '../../../services/general.service';
import { ReceptionLocalService } from '../../../services/reception/reception-local.service';

@Component({
  selector: 'contler-ready-cleaning',
  templateUrl: './ready-cleaning.component.html',
  styleUrls: ['./ready-cleaning.component.scss'],
})
export class ReadyCleaningComponent implements OnInit {
  user: EmployerEntity | null = null;
  totalReception: number;
  $receptionReq: Observable<ReceptionModel[]>;

  constructor(
    private auth: AuthService,
    private receptionLocalService: ReceptionLocalService,
    public generalService: GeneralService,
    public menu: MenuController,
  ) {}

  ngOnInit() {
    this.auth.$user.pipe(take(1)).subscribe((user) => (this.user = user));
    this.$receptionReq = this.receptionLocalService
      .getCleaningInactive()
      .pipe(tap(({ length }) => (this.totalReception = length)));
  }
}
