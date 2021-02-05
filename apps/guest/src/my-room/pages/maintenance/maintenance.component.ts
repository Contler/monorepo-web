import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfigModel } from '@contler/models/modal-config.model';
import { ModalCompleteComponent } from 'guest/common-components/modal-complete/modal-complete.component';
import { Router } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
import { GuestService } from 'guest/services/guest.service';
import { ReceptionModel, ReceptionStatus } from '@contler/models';
import { RoomService } from '@contler/core';
import { fullRangeDates } from 'guest/utils/generateTime';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'contler-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent {
  maintenanceControl: FormGroup;
  load = false;
  readonly timeOptions = fullRangeDates();

  constructor(
    private guestService: GuestService,
    private roomService: RoomService,
    fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private datePipe: DatePipe,
    private translate: TranslateService,
  ) {
    this.maintenanceControl = fb.group({
      time: ['', Validators.required],
      maintenance: ['', Validators.required],
    });
  }

  saveRequest() {
    this.load = true;
    const { time, maintenance } = this.maintenanceControl.value;

    const modalConfig: ModalConfigModel = {
      text: this.translate.instant('maintenance.text'),
      close: this.translate.instant('maintenance.close'),
      icon: 'fas fa-check-circle',
    };

    this.guestService.$guest
      .pipe(
        take(1),
        map((guest) => {
          const comment = `${this.datePipe.transform(time, 'shortTime')} - ${maintenance}`;
          const req: ReceptionModel = {
            createAt: new Date(),
            guest: guest.uid,
            hotel: guest.hotel.uid,
            active: true,
            comment,
            type: 'Maintenance',
            status: ReceptionStatus.PROGRAMING,
          };
          return req;
        }),
        switchMap((req) => this.roomService.createMaintain(req)),
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
        this.router.navigate(['/home/my-room']);
      });
  }
}
