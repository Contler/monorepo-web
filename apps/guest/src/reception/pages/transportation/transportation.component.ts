import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalCompleteComponent } from 'guest/common-components/modal-complete/modal-complete.component';
import { fullRangeDates } from 'guest/utils/generateTime';
import { ReceptionService } from '@contler/core';
import { ModalConfigModel } from '@contler/models/modal-config.model';
import { DESTINATION_OPTIONS } from '../../const/transportation.const';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReceptionModel } from '@contler/models';
import { GuestService } from 'guest/services/guest.service';
import { map, switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'contler-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss'],
})
export class TransportationComponent {
  readonly hoursOptions = fullRangeDates();
  readonly destinationOptions = DESTINATION_OPTIONS;

  transportForm: FormGroup;
  load = false;

  constructor(
    formBuild: FormBuilder,
    private guestService: GuestService,
    private receptionService: ReceptionService,
    private router: Router,
    private dialog: MatDialog,
    private datePipe: DatePipe,
  ) {
    this.transportForm = formBuild.group({
      date: ['', Validators.required],
      departure: ['', Validators.required],
      destination: ['', Validators.required],
    });
  }

  changeDestination(destination: string) {
    const last = this.destinationOptions.length - 1;
    if (destination === this.destinationOptions[last]) {
      this.transportForm.addControl('place', new FormControl('', Validators.required));
    } else if (this.placeControl) {
      this.transportForm.removeControl('place');
    }
  }

  get placeControl() {
    return this.transportForm.get('place');
  }

  saveTransport() {
    const { destination, place } = this.transportForm.value;
    const date: Date = this.transportForm.value.date;
    const departure: Date = this.transportForm.value.departure;
    const modalConfig: ModalConfigModel = {
      text: 'Your transport has been requested, we´ll be waiting you at the reception at the departure time',
      close: 'Got it!',
      icon: 'fas fa-check-circle',
    };
    date.setHours(departure.getHours());
    date.setMinutes(departure.getMinutes());
    date.setSeconds(departure.getSeconds());
    this.load = true;
    this.guestService.$guest
      .pipe(
        map(({ uid, hotel }) => {
          const temp = destination === 'Other' ? place : destination;
          const req: ReceptionModel = {
            hotel: hotel.uid,
            active: true,
            createAt: new Date(),
            guest: uid,
            type: 'Transport',
            comment: `${temp} - ${this.datePipe.transform(date, 'longDate')}`,
          };
          return req;
        }),
        switchMap((req) => this.receptionService.createReception(req)),
        switchMap(() =>
          this.dialog
            .open<ModalCompleteComponent, ModalConfigModel>(ModalCompleteComponent, {
              data: modalConfig,
            })
            .afterClosed(),
        ),
      )
      .subscribe(() => {
        this.load = false;
        this.router.navigate(['/home/reception']);
      });
  }
}
