import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Guest, Hotel, Zone } from '@contler/core/models';
import { GuestService } from 'guest/services/guest.service';
import { ZoneService } from 'guest/services/zone.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { ModalQualifyComponent } from 'guest/home/components/modal-qualify/modal-qualify.component';
import { RequestService } from 'guest/services/request.service';
import { GeneralService } from 'guest/services/general.service';

@Component({
  selector: 'contler-guest-requests',
  templateUrl: './guest-requests.component.html',
  styleUrls: ['./guest-requests.component.scss'],
})
export class GuestRequestsComponent implements OnDestroy {
  $guest: Observable<Guest | null>;
  hotel: Hotel | null | undefined;
  private subscribe: Subscription;
  private zones: Zone[] = [];
  public showedZones: Zone[] = [];
  public allZonesShowed: boolean = false;

  private zonesSubscription: Subscription | null = null;
  private requestSubscription: Subscription | null = null;

  constructor(
    private guestService: GuestService,
    private zoneService: ZoneService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private requestService: RequestService,
    public generalService: GeneralService,
  ) {
    this.$guest = this.guestService.$guest;
    this.subscribe = this.guestService.$hotel.subscribe(hotel => (this.hotel = hotel));
    this.zonesSubscription = this.zoneService.$zones.subscribe(zones => {
      this.zones = zones;
      this.showedZones = this.allZonesShowed ? this.zones.slice() : this.zones.filter(zone => zone.principal);
    });
    this.requestSubscription = this.requestService.getRequestFinish().subscribe(requests => {
      if (requests && requests.length > 0) {
        requests.forEach(request => {
          console.log('request', request);
          this.dialog.open(ModalQualifyComponent, {
            width: '342px',
            panelClass: 'cot-dialog',
            data: request,
            disableClose: true,
          });
        });
      }
    });
  }

  showAllZones() {
    this.showedZones = this.zones.slice();
    this.allZonesShowed = true;
  }

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '');
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.zonesSubscription) {
      this.zonesSubscription.unsubscribe();
    }
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
  }
}
