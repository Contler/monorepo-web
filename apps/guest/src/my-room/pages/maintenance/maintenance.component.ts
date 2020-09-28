import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfigModel } from '@contler/models/modal-config.model';
import { ModalCompleteComponent } from 'guest/common-components/modal-complete/modal-complete.component';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { GuestService } from 'guest/services/guest.service';
import { MaintenanceModel } from '@contler/models';
import { RoomService } from '@contler/core';
import { fullRangeDates } from 'guest/utils/generateTime';

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
      text: 'Your maintenance request has been succesfully received.',
      close: 'Got it!',
      icon: 'fas fa-check-circle',
    };

    this.guestService.$guest
      .pipe(
        map(
          (guest) =>
            ({
              time,
              maintenance,
              createAt: new Date(),
              guest: guest.uid,
              hotel: guest.hotel.uid,
            } as MaintenanceModel),
        ),
        switchMap((maintenances) => this.roomService.createMaintenance(maintenances)),
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
