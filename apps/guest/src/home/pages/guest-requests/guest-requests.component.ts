import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Guest, Hotel, Zone } from '@contler/core/models';
import { GuestService } from 'guest/services/guest.service';
import { ZoneService } from 'guest/services/zone.service';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'contler-guest-requests',
  templateUrl: './guest-requests.component.html',
  styleUrls: ['./guest-requests.component.scss'],
})
export class GuestRequestsComponent implements OnDestroy {
  $guest: Observable<Guest | null>;
  $zones: Observable<Zone[]>;
  hotel: Hotel | null | undefined;
  private subscribe: Subscription;

  constructor(private guestService: GuestService, private zoneService: ZoneService, private sanitizer: DomSanitizer) {
    this.$guest = this.guestService.$guest;
    this.subscribe = this.guestService.$hotel.subscribe(hotel => (this.hotel = hotel));
    this.$zones = this.zoneService.$zones.pipe(map(zones => zones.filter(zone => zone.principal)));
  }

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '');
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
}
