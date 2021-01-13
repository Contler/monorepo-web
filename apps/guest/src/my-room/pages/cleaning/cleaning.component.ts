import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfigModel } from '@contler/models/modal-config.model';
import { ModalCompleteComponent } from 'guest/common-components/modal-complete/modal-complete.component';
import { Router } from '@angular/router';
import { GuestService } from 'guest/services/guest.service';
import { fullRangeDates } from 'guest/utils/generateTime';
import { map, switchMap, take } from 'rxjs/operators';
import { ReceptionModel } from '@contler/models';
import { RoomService } from '@contler/core';
import { SPECIFIC_CLEANING } from '../../const/cleaning.const';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

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
    private dialog: MatDialog,
    private router: Router,
    private datePipe: DatePipe,
    private roomService: RoomService,
    private translate: TranslateService,
  ) {
    this.cleaningForm = fb.group({
      time: ['', Validators.required],
      cleaning: ['', Validators.required],
      recomendation: [''],
      what: ['', Validators.required],
    });
  }

  saveRequest() {
    this.load = true;
    const { time, cleaning, recomendation, what } = this.cleaningForm.value;

    const modalConfig: ModalConfigModel = {
      text: this.translate.instant('cleaning.text'),
      close: this.translate.instant('cleaning.close'),
      icon: 'fas fa-check-circle',
    };

    this.guestService.$guest
      .pipe(
        take(1),
        map((guest) => {
          const clean = cleaning === 'Other' ? what : cleaning;
          const timeMsj = this.datePipe.transform(time, 'shortTime');
          const dataComment = [clean, timeMsj];
          if (!!recomendation) {
            dataComment.push(recomendation);
          }
          const comm = dataComment.join(' - ');
          const req: ReceptionModel = {
            guest: guest.uid,
            hotel: guest.hotel.uid,
            type: 'Cleaning',
            comment: comm,
            createAt: new Date(),
            active: true,
            room: guest.room,
          };
          return req;
        }),
        switchMap((cleanings) => this.roomService.createClean(cleanings)),
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
