import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReceptionService } from '@contler/core';
import { MoneyModel } from '@contler/models';
import { ModalCompleteComponent } from 'guest/common-components/modal-complete/modal-complete.component';
import { GuestService } from 'guest/services/guest.service';
import { ModalConfigModel } from '@contler/models/modal-config.model';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'contler-cash-loan',
  templateUrl: './cash-loan.component.html',
  styleUrls: ['./cash-loan.component.scss'],
})
export class CashLoanComponent {
  cashControl = new FormControl('', Validators.required);
  load = false;

  constructor(
    private receptionService: ReceptionService,
    private guestService: GuestService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  savePetition() {
    const modalConf: ModalConfigModel = {
      text:
        'Your cash loan request has been succesfully received. Come to the reception to receive your money.',
      close: 'Got it!',
      icon: 'fas fa-check-circle',
    };

    this.load = true;
    this.guestService.$guest
      .pipe(
        map(
          (guest) =>
            ({
              guest: guest.uid,
              hotel: guest.hotel.uid,
              value: this.cashControl.value,
            } as MoneyModel),
        ),
        switchMap((req) => this.receptionService.createMoneyChange(req)),
        switchMap(() =>
          this.dialog.open(ModalCompleteComponent, { data: modalConf }).afterClosed(),
        ),
      )
      .subscribe(() => {
        this.load = false;
        this.router.navigate(['/home/reception']);
      });
  }
}
