import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReceptionService } from '@contler/core';
import { ReceptionModel, ReceptionStatus } from '@contler/models';
import { ModalCompleteComponent } from 'guest/common-components/modal-complete/modal-complete.component';
import { GuestService } from 'guest/services/guest.service';
import { ModalConfigModel } from '@contler/models/modal-config.model';
import { map, switchMap, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService,
  ) {}

  savePetition() {
    const modalConf: ModalConfigModel = {
      text: this.translate.instant('cashLoan.text'),
      close: this.translate.instant('cashLoan.close'),
      icon: 'fas fa-check-circle',
    };

    this.load = true;
    this.guestService.$guest
      .pipe(
        take(1),
        map(
          ({ uid, hotel }) =>
            ({
              guest: uid,
              hotel: hotel.uid,
              comment: this.cashControl.value,
              active: true,
              createAt: new Date(),
              type: 'Cash loan',
              status: ReceptionStatus.PROGRAMING,
            } as ReceptionModel),
        ),
        switchMap((req) => this.receptionService.createReception(req)),
        switchMap(() => this.dialog.open(ModalCompleteComponent, { data: modalConf }).afterClosed()),
      )
      .subscribe(() => {
        this.load = false;
        this.router.navigate(['/home/reception']);
      });
  }
}
