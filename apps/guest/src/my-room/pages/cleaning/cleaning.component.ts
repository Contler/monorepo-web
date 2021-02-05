import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfigModel } from '@contler/models/modal-config.model';
import { ModalCompleteComponent } from 'guest/common-components/modal-complete/modal-complete.component';
import { Router } from '@angular/router';
import { GuestService } from 'guest/services/guest.service';
import { fullRangeDates } from 'guest/utils/generateTime';
import { map, switchMap, take } from 'rxjs/operators';
import { ReceptionModel, ReceptionStatus } from '@contler/models';
import { RoomService } from '@contler/core';
import { SPECIFIC_CLEANING } from '../../const/cleaning.const';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateService as DynamicService } from '@contler/dynamic-translate';
import { getLan } from '@contler/const';

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
    private dynamic: DynamicService,
  ) {
    this.cleaningForm = fb.group({
      time: ['', Validators.required],
      cleaning: ['', Validators.required],
      recomendation: [''],
      what: ['', Validators.required],
    });
  }

  async generateTranslateClean() {
    const dataComment = [];
    const [actualLan, languages] = getLan();
    const { hotel } = await this.guestService.$guest.pipe(take(1)).toPromise();
    const { time, cleaning, recomendation, what } = this.cleaningForm.value;
    if (cleaning === 'cleaning.other') {
      const otherKey = await this.dynamic
        .generateUrl({ mgs: what, hotel: hotel.uid, url: 'cleanMessage/other', languages, actualLan })
        .toPromise();
      dataComment.push(otherKey.key);
    } else {
      dataComment.push(cleaning);
    }
    const timeMsj = this.datePipe.transform(time, 'shortTime');
    dataComment.push(timeMsj);
    if (!!recomendation) {
      const recommendationKey = await this.dynamic
        .generateUrl({
          mgs: recomendation,
          hotel: hotel.uid,
          url: 'cleanMessage/recommendation',
          languages,
          actualLan,
        })
        .toPromise();
      dataComment.push(recommendationKey.key);
    }
    return dataComment.join(' - ');
  }

  async saveRequest() {
    this.load = true;
    const comment = await this.generateTranslateClean();

    const modalConfig: ModalConfigModel = {
      text: this.translate.instant('cleaning.text'),
      close: this.translate.instant('cleaning.close'),
      icon: 'fas fa-check-circle',
    };

    this.guestService.$guest
      .pipe(
        take(1),
        map(
          (guest) =>
            ({
              guest: guest.uid,
              hotel: guest.hotel.uid,
              type: 'Cleaning',
              comment: comment,
              createAt: new Date(),
              active: true,
              room: guest.room,
              status: ReceptionStatus.PROGRAMING,
            } as ReceptionModel),
        ),
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
