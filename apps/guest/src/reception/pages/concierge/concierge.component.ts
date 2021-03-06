import { Component } from '@angular/core';
import { ReceptionService } from '@contler/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { GuestEntity } from '@contler/entity';
import { ModalConfigModel, ReceptionModel, ReceptionStatus } from '@contler/models';
import { GuestService } from '../../../services/guest.service';
import { map, switchMap, take } from 'rxjs/operators';
import { ModalCompleteComponent } from '../../../common-components/modal-complete/modal-complete.component';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'contler-concierge',
  templateUrl: './concierge.component.html',
  styleUrls: ['./concierge.component.scss'],
})
export class ConciergeComponent {
  formGroup: FormGroup;
  load: boolean;

  constructor(
    formBuild: FormBuilder,
    private receptionService: ReceptionService,
    private guestService: GuestService,
    private dialog: MatDialog,
    private router: Router,
    private datePipe: DatePipe,
    private translate: TranslateService,
  ) {
    this.formGroup = formBuild.group({
      date: ['', Validators.required],
      comment: [''],
    });
  }

  save() {
    const { date, comment } = this.formGroup.value;
    const modalConf: ModalConfigModel = {
      text: this.translate.instant('concierge.text'),
      close: this.translate.instant('concierge.close'),
      icon: 'fas fa-check-circle',
    };
    this.load = true;
    this.guestService.$guest
      .pipe(
        take(1),
        map((guest) => this.generateReq(guest, date, comment)),
        switchMap((req) => this.receptionService.createReception(req)),
        switchMap(() => this.dialog.open(ModalCompleteComponent, { data: modalConf }).afterClosed()),
      )
      .subscribe(() => {
        this.load = false;
        this.router.navigate(['/home/reception']);
      });
  }

  private generateReq(guest: GuestEntity, date: Date, comment: string): ReceptionModel {
    return {
      guest: guest.uid,
      hotel: guest.hotel.uid,
      comment: `${comment} - ${this.datePipe.transform(date, 'longDate')}`,
      active: true,
      createAt: new Date(),
      type: 'Concierge',
      status: ReceptionStatus.PROGRAMING,
    };
  }
}
