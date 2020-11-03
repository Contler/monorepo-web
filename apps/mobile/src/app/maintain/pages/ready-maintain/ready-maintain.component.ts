import { Component, OnInit } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { ReceptionModel } from '@contler/models';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { ReceptionLocalService } from '../../../services/reception/reception-local.service';
import { GeneralService } from '../../../services/general.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'contler-ready-maintain',
  templateUrl: './ready-maintain.component.html',
  styleUrls: ['./ready-maintain.component.scss'],
})
export class ReadyMaintainComponent implements OnInit {
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
      .getMaintainInactive()
      .pipe(tap(({ length }) => (this.totalReception = length)));
  }
}
