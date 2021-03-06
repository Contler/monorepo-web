import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GuestService } from 'guest/services/guest.service';
import { ModalQualifyComponent } from 'guest/home/components/modal-qualify/modal-qualify.component';
import { RequestService } from 'guest/services/request.service';
import { GeneralService } from 'guest/services/general.service';
import { GuestEntity } from '@contler/entity/guest.entity';
import { HotelEntity, ZoneEntity } from '@contler/entity';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { ProductService, ReservationService } from '@contler/core';
import { ModalBookingQualifyComponent } from 'guest/home/components/modal-booking-qualify/modal-booking-qualify.component';
import { ModalOrdersQuialifyComponent } from 'guest/home/components/modal-orders-quialify/modal-orders-quialify.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'contler-guest-requests',
  templateUrl: './guest-requests.component.html',
  styleUrls: ['./guest-requests.component.scss'],
})
export class GuestRequestsComponent implements OnDestroy {
  $guest: Observable<GuestEntity | null>;
  hotel: HotelEntity | null | undefined;
  private subscribe: Subscription;
  private zones: ZoneEntity[] = [];
  public showedZones: ZoneEntity[] = [];
  public allZonesShowed = false;
  private requestSubscription: Subscription | null = null;

  constructor(
    private guestService: GuestService,
    private dialog: MatDialog,
    private requestService: RequestService,
    public generalService: GeneralService,
  ) {
    this.$guest = this.guestService.$guest;

    this.subscribe = this.guestService.$hotel.subscribe((hotel) => {
      this.hotel = hotel;
      this.zones = hotel!.zones;
      this.showedZones = this.allZonesShowed
        ? this.zones.slice()
        : this.zones.filter((zone) => zone.principal);
    });
  }

  showAllZones() {
    this.showedZones = this.zones.slice();
    this.allZonesShowed = true;
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
  }
}
