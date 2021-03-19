import { Component, OnInit } from '@angular/core';
import { first, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { HotelEntity, SpecialZoneHotelEntity } from '@contler/entity';
import { HotelService, SpecialZoneGuestService } from '@contler/core';
import { MessagesService } from '../../../services/messages/messages.service';
import { SpecialZoneGuest } from '@contler/models';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-guest-home',
  templateUrl: './guest-home.component.html',
  styleUrls: ['./guest-home.component.scss'],
})
export class GuestHomeComponent implements OnInit {
  hotel: HotelEntity;
  SpecialZoneHotelEntity = SpecialZoneHotelEntity;
  specialZoneGuest$: Observable<SpecialZoneGuest[]>;
  private preparedZonesUpdate: { [index: string]: SpecialZoneGuest } = {};

  constructor(
    private authService: AuthService,
    private hotelService: HotelService,
    private messagesService: MessagesService,
    private specialZoneGuestService: SpecialZoneGuestService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.specialZoneGuest$ = this.authService.$hotel.pipe(
      tap((hotel) => (this.hotel = hotel)),
      switchMap((hotel) => this.specialZoneGuestService.getSpecialZoneGuest(hotel.uid)),
    );
  }

  public async goToHome(): Promise<void> {
    const specialZoneGuest = await this.specialZoneGuest$.pipe(first()).toPromise();
    const zonesUpdate: { [index: string]: SpecialZoneGuest } = {};
    specialZoneGuest.forEach((zone, index) => {
      if (
        this.preparedZonesUpdate.hasOwnProperty(index) &&
        this.preparedZonesUpdate[index].status !== zone.status
      ) {
        zonesUpdate[index] = this.preparedZonesUpdate[index];
      }
    });
    const loader = this.messagesService.showLoader();
    try {
      await this.specialZoneGuestService.updateMultipleSpecialZoneGuest(this.hotel.uid, zonesUpdate);
      this.messagesService.closeLoader(loader);
    } catch (err) {
      this.messagesService.closeLoader(loader);
      this.messagesService.showServerError();
      console.log(err);
    }
    // this.router.navigate([ 'home' ]);
  }

  public async updateZone(
    $event: MatSlideToggleChange,
    zone: SpecialZoneGuest,
    index: number,
  ): Promise<void> {
    zone.status = $event.checked;
    this.preparedZonesUpdate[index] = zone;
  }
}
