import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { EmployerEntity } from '@contler/entity';
import { ReceptionService } from '@contler/core';
import { ConciergeModel, ExchangeReqModel, MoneyModel, TransportModel } from '@contler/models';

import { switchMap, take, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { GeneralService } from '../services/general.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReceptionLocalService } from './services/reception/reception-local.service';

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
  private totalTransport: number;
  private totalMoney: number;
  private totalExchange: number;
  private totalConcierge: number;

  constructor(
    private auth: AuthService,
    public menu: MenuController,
    public generalService: GeneralService,
    private receptionService: ReceptionLocalService,
  ) {
    this.auth.$user.pipe(take(1)).subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.$transports = this.receptionService
      .getTransport()
      .pipe(tap(({ length }) => (this.totalTransport = length)));
    this.$money = this.receptionService
      .getMoneyExchange()
      .pipe(tap(({ length }) => (this.totalMoney = length)));
    this.$exchanges = this.receptionService
      .getExchanges()
      .pipe(tap(({ length }) => (this.totalExchange = length)));
    this.$concierges = this.receptionService
      .getActiveConcierges()
      .pipe(tap(({ length }) => (this.totalConcierge = length)));
  }

  get totalPetition() {
    return this.totalConcierge || this.totalExchange || this.totalMoney || this.totalTransport;
  }
}
