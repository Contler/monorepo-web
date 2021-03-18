import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpecialZoneGuestService } from '@contler/core';
import { GuestService } from 'guest/services/guest.service';
import { Observable, Subscription } from 'rxjs';
import { GuestEntity } from '@contler/entity';
import { SpecialZoneGuest } from '@contler/models';

@Component({
  selector: 'contler-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  $guest: Observable<GuestEntity | null>;
  zones$: Observable<SpecialZoneGuest[]>;
  private subscribe: Subscription;

  constructor(private guestService: GuestService, private specialZoneGuestService: SpecialZoneGuestService) {}

  ngOnInit(): void {
    this.$guest = this.guestService.$guest;
    this.subscribe = this.guestService.$hotel.subscribe((hotel) => {
      this.zones$ = this.specialZoneGuestService.getSpecialZoneGuestActive(hotel.uid);
    });
  }
  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
}
