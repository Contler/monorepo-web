import { Component, OnInit } from '@angular/core';
import { HotelEntity, WakeUpEntity } from '@contler/entity';
import { GuestService } from 'guest/services/guest.service';
import { take } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { GuestEntity } from '@contler/entity/guest.entity';
import { WakeUpService } from 'guest/services/wake-up.service';

@Component({
  selector: 'contler-wake-up',
  templateUrl: './wake-up.component.html',
  styleUrls: ['./wake-up.component.scss'],
})
export class WakeUpComponent implements OnInit {
  hotel: HotelEntity | null | undefined;
  indexLoad: number | null = null;
  private guest!: GuestEntity;
  wakes: WakeUpEntity[] | null = null;

  constructor(
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
    private wakeService: WakeUpService,
  ) {
    this.guestService.$hotel.pipe(take(1)).subscribe((hotel) => (this.hotel = hotel));
    this.guestService.$guest.pipe(take(1)).subscribe((guest) => (this.guest = guest!));
    this.wakeService.$wakeUp.subscribe((wakes) => {
      this.wakes = wakes;
    });
  }

  ngOnInit() {}

  delete(wake: WakeUpEntity, index: number) {
    this.indexLoad = index;
    this.wakeService.deleteWake(wake.id).subscribe(() => (this.indexLoad = null));
  }
}
