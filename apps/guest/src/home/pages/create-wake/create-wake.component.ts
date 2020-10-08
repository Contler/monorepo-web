import { Component } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuestEntity } from '@contler/entity/guest.entity';
import { GuestService } from 'guest/services/guest.service';
import { WakeUpService } from 'guest/services/wake-up.service';
import { MessagesService } from 'guest/services/messages/messages.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { WakeRequest } from '@contler/models';
import { fullRangeDates } from 'guest/utils/generateTime';

@Component({
  selector: 'contler-create-wake',
  templateUrl: './create-wake.component.html',
  styleUrls: ['./create-wake.component.scss'],
})
export class CreateWakeComponent {
  hotel: HotelEntity | null | undefined;
  time = new Array(48);
  wakeUpForm: FormGroup;
  private guest!: GuestEntity;
  load = false;
  readonly timeOptions = fullRangeDates();

  constructor(
    private guestService: GuestService,
    formBuild: FormBuilder,
    private wakeService: WakeUpService,
    private router: Router,
    private messagesService: MessagesService,
  ) {
    this.guestService.$hotel.pipe(take(1)).subscribe((hotel) => (this.hotel = hotel));
    this.guestService.$guest.pipe(take(1)).subscribe((guest) => (this.guest = guest!));
    this.wakeUpForm = formBuild.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  createWakeUp() {
    this.load = true;
    const request = new WakeRequest();
    request.time = this.wakeUpForm.value.time;
    request.name = this.wakeUpForm.value.name;
    request.date = this.wakeUpForm.value.date;
    request.totalTime = this.wakeUpForm.value.date;
    request.totalTime.setHours(request.time.getHours());
    request.totalTime.setMinutes(request.time.getMinutes());
    request.totalTime.setSeconds(request.time.getSeconds());
    request.totalTime.setMilliseconds(request.time.getMilliseconds());
    request.room = this.guest.room;
    request.guest = this.guest;
    request.hotel = this.hotel!;
    this.wakeService.saveWake(request).subscribe(() => {
      this.load = false;
      this.router.navigate(['/home/wake-up']);
      this.messagesService.showToastMessage('Your wake up call was successfully created');
    });
  }
}
