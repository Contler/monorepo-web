import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { EmployerEntity } from '@contler/entity';
import { ReceptionService } from '@contler/core';
import { ConciergeModel, ExchangeReqModel, MoneyModel, TransportModel } from '@contler/models';

import { switchMap, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { GeneralService } from '../services/general.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
})
export class ReceptionComponent implements OnInit {
  user: EmployerEntity | null = null;
  $transports: Observable<TransportModel[]>;
  $money: Observable<MoneyModel[]>;
  $exchanges: Observable<ExchangeReqModel[]>;
  $concierges: Observable<ConciergeModel[]>;

  constructor(
    private auth: AuthService,
    public menu: MenuController,
    public generalService: GeneralService,
    private receptionService: ReceptionService,
  ) {
    this.auth.$user.pipe(take(1)).subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.$transports = this.auth.$user.pipe(
      switchMap(({ hotel }) => this.receptionService.getTransportById(hotel.uid)),
    );
    this.$money = this.auth.$user.pipe(
      switchMap(({ hotel }) => this.receptionService.getMoneyChangesById(hotel.uid)),
    );
    this.$exchanges = this.auth.$user.pipe(
      switchMap(({ hotel }) => this.receptionService.getExchangePetitionByHotel(hotel.uid)),
    );
    this.$concierges = this.auth.$user.pipe(
      switchMap(({ hotel }) => this.receptionService.getConciergeByHotel(hotel.uid)),
    );
  }
}
