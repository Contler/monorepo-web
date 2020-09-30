import { Component } from '@angular/core';
import { ReceptionService } from '@contler/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { GuestEntity } from '@contler/entity';
import { ModalConfigModel, ReceptionModel } from '@contler/models';

import { fullRangeDates } from 'guest/utils/generateTime';
import { GuestService } from '../../../services/guest.service';
import { map, switchMap } from 'rxjs/operators';
import { ModalCompleteComponent } from '../../../common-components/modal-complete/modal-complete.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'contler-concierge',
  templateUrl: './concierge.component.html',
  styleUrls: ['./concierge.component.scss'],
})
export class ConciergeComponent {
  hoursOptions = fullRangeDates();
  formGroup: FormGroup;
  load: boolean;

  constructor(
    formBuild: FormBuilder,
    private receptionService: ReceptionService,
    private guestService: GuestService,
    private dialog: MatDialog,
    private router: Router,
    private datePipe: DatePipe,
  ) {
    this.formGroup = formBuild.group({
      date: ['', Validators.required],
      comment: [''],
    });
  }

  save() {
    const { date, comment } = this.formGroup.value;
    const modalConf: ModalConfigModel = {
      text:
        'Your concierge information request has been succesful. Our staff will be contacting you very soon.',
      close: 'Got it!',
      icon: 'fas fa-check-circle',
    };
    this.load = true;
    this.guestService.$guest
      .pipe(
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
      comment: `${comment} - ${this.datePipe.transform(date, 'shortTime')}`,
      active: true,
      createAt: new Date(),
      type: 'Concierge',
    };
  }
}
