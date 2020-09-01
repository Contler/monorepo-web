import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GuestService } from 'guest/services/guest.service';
import { take } from 'rxjs/operators';
import { GuestEntity, HotelEntity } from '@contler/entity';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'contler-create-late',
  templateUrl: './create-late.component.html',
  styleUrls: ['./create-late.component.scss'],
})
export class CreateLateComponent implements OnInit {
  time = new Array(48);
  timeSelect: Date | undefined;
  load = false;
  private hotel: HotelEntity | null | undefined;
  private guest: GuestEntity | null | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private guestService: GuestService,
    private afFirestore: AngularFirestore,
  ) {
    this.guestService.$hotel.pipe(take(1)).subscribe(hotel => (this.hotel = hotel));
    this.guestService.$guest.subscribe(guest => (this.guest = guest));
  }

  ngOnInit() {}

  getHour(index: number) {
    const extraTime = 30 * index * 60 * 1000;
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return new Date(date.getTime() + extraTime);
  }

  getColorButtonHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color
        ? `background: ${this.hotel.color};  color: #ffffff !important`
        : '',
    );
  }

  async create() {
    this.load = true;
    const key = this.afFirestore.createId();
    this.afFirestore
      .collection('late')
      .doc(key)
      .set({
        uid: key,
        date: this.timeSelect!.toUTCString(),
        hotel: this.hotel!.uid,
        user: this.guest!.uid,
        status: 0,
      });
  }
}
