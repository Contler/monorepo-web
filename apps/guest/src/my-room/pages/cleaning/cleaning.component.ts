import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfigModel } from '@contler/models/modal-config.model';
import { ModalCompleteComponent } from 'guest/common-components/modal-complete/modal-complete.component';
import { Router } from '@angular/router';
import { GuestService } from 'guest/services/guest.service';
import { fullRangeDates } from 'guest/utils/generateTime';
import { map, switchMap } from 'rxjs/operators';
import { CleaningModel } from '@contler/models';
import { RoomCleaningService } from '@contler/core';
import { SPECIFIC_CLEANING } from '../../const/cleaning.const';

@Component({
  selector: 'contler-cleaning',
  templateUrl: './cleaning.component.html',
  styleUrls: ['./cleaning.component.scss'],
})
export class CleaningComponent {
  readonly timeOptions = fullRangeDates();
  readonly specificCleanings = SPECIFIC_CLEANING;
  cleaningForm: FormGroup;
  load = false;

  constructor(
    fb: FormBuilder,
    private guestService: GuestService,
    private cleaningService: RoomCleaningService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.cleaningForm = fb.group({
      time: ['', Validators.required],
      cleaning: ['', Validators.required],
      recomendation: [''],
    });
  }

  saveRequest() {
    this.load = true;
    const { time, cleaning, recomendation, what } = this.cleaningForm.value;

    const modalConfig: ModalConfigModel = {
      text: 'Your room cleaning request has been succesfully received.',
      close: 'Got it!',
      icon: 'fas fa-check-circle',
    };

    this.guestService.$guest
      .pipe(
        map(
          (guest) =>
            ({
              time,
              cleaning,
              recomendation,
              what: cleaning === 'Other' ? what : '',
              guest: guest.uid,
              hotel: guest.hotel.uid,
            } as CleaningModel),
        ),
        switchMap((cleanings) => this.cleaningService.createCleaning(cleanings)),
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

  changeCleaning(cleaning: string) {
    const lastSpecificCleaning = this.specificCleanings.length - 1;
    if (cleaning === this.specificCleanings[lastSpecificCleaning]) {
      this.cleaningForm.addControl('what', new FormControl('', Validators.required));
    } else if (this.whatControl) {
      this.cleaningForm.removeControl('what');
    }
  }

  get whatControl() {
    return this.cleaningForm.get('what');
  }
}
