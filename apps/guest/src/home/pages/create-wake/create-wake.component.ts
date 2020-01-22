import { Component, OnInit } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuestEntity } from '@contler/entity/guest.entity';
import { GuestService } from 'guest/services/guest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { WakeUpService } from 'guest/services/wake-up.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { WakeRequest } from '@contler/models';

@Component({
  selector: 'contler-create-wake',
  templateUrl: './create-wake.component.html',
  styleUrls: ['./create-wake.component.scss']
})
export class CreateWakeComponent implements OnInit {

  hotel: HotelEntity | null | undefined;
  time = new Array(48);
  wakeUpForm: FormGroup;
  private guest!: GuestEntity;
  private load = false;

  constructor(
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
    formBuild: FormBuilder,
    private wakeService: WakeUpService,
    private router: Router,
  ) {
    this.guestService.$hotel.pipe(take(1)).subscribe(hotel => (this.hotel = hotel));
    this.guestService.$guest.pipe(take(1)).subscribe(guest => (this.guest = guest!));
    this.wakeUpForm = formBuild.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit() {}

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '');
  }

  getHour(index: number) {
    const extraTime = 30 * index * 60 * 1000;
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return new Date(date.getTime() + extraTime);
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
      this.router.navigate(['/home/wake-up'])
    });
  }

}
