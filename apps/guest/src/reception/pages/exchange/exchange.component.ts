import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReceptionService } from '@contler/core';
import { GuestEntity } from '@contler/entity';
import { ReceptionModel } from '@contler/models';
import { ModalConfigModel } from '@contler/models/modal-config.model';

import { map, switchMap, take } from 'rxjs/operators';

import { MONEY_OPTIONS } from '../../const/exchange.const';
import { GuestService } from '../../../services/guest.service';
import { ModalCompleteComponent } from '../../../common-components/modal-complete/modal-complete.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'contler-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent {
  readonly moneyOptions = MONEY_OPTIONS;

  changeForm: FormGroup;
  symbol: string;
  load = false;

  constructor(
    formBuild: FormBuilder,
    private receptionService: ReceptionService,
    private guestService: GuestService,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.changeForm = formBuild.group({
      money: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  save() {
    this.load = true;
    const { money, value } = this.changeForm.value;
    const modalConf: ModalConfigModel = {
      text: this.translate.instant('exchange.text'),
      close: this.translate.instant('exchange.close'),
      icon: 'fas fa-check-circle',
    };
    this.guestService.$guest
      .pipe(
        take(1),
        map((guest) => this.generateExchangeReq(guest, money, value)),
        switchMap((req) => this.receptionService.createReception(req)),
        switchMap(() => this.dialog.open(ModalCompleteComponent, { data: modalConf }).afterClosed()),
      )
      .subscribe(() => {
        this.load = false;
        this.router.navigate(['/home/reception']);
      });
  }

  updateSymbol(symbol: string) {
    this.symbol = symbol;
  }

  private generateExchangeReq(
    guest: GuestEntity,
    money: {
      name: string;
      symbol: string;
    },
    value: string,
  ): ReceptionModel {
    return {
      guest: guest.uid,
      hotel: guest.hotel.uid,
      comment: `${money.symbol} ${value}`,
      createAt: new Date(),
      active: true,
      type: 'Exchange',
    };
  }
}
