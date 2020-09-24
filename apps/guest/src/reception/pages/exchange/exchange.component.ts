import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReceptionService } from '@contler/core';
import { GuestEntity } from '@contler/entity';
import { ExchangeReqModel } from '@contler/models';

import { MONEY_OPTIONS } from '../../const/exchange.const';
import { GuestService } from '../../../services/guest.service';
import { map, switchMap } from 'rxjs/operators';
import { ModalConfigModel } from '../../../../../../libs/models/modal-config.model';
import { ModalCompleteComponent } from '../../../common-components/modal-complete/modal-complete.component';

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
      text:
        'Your currency exchange request has been succesfully received. Come to the reception to receive your money.',
      close: 'Got it!',
      icon: 'fas fa-check-circle',
    };
    this.guestService.$guest
      .pipe(
        map((guest) => this.generateExchangeReq(guest, money, value)),
        switchMap((req) => this.receptionService.createExchangePetition(req)),
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

  private generateExchangeReq(guest: GuestEntity, money: string, value: string): ExchangeReqModel {
    return {
      guest: guest.uid,
      hotel: guest.hotel.uid,
      money,
      value,
    };
  }
}
