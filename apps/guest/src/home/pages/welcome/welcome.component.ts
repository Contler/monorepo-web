import { Component, OnInit } from '@angular/core';
import { SpecialZoneGuestService } from '@contler/core';
import { GuestService } from 'guest/services/guest.service';
import { Observable } from 'rxjs';
import { GuestEntity } from '@contler/entity';
import { SpecialZoneGuest } from '@contler/models';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'contler-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  $guest: Observable<GuestEntity | null>;
  zones$: Observable<SpecialZoneGuest[]>;

  constructor(private guestService: GuestService, private specialZoneGuestService: SpecialZoneGuestService) {}

  ngOnInit(): void {
    this.$guest = this.guestService.$guest;
    this.zones$ = this.guestService.$hotel.pipe(
      switchMap((hotel) => this.specialZoneGuestService.getSpecialZoneGuestActive(hotel.uid)),
    );
  }
}
