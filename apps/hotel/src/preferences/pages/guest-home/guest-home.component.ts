import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
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
  public hotel$: Observable<HotelEntity>;
  hotel: HotelEntity;
  SpecialZoneHotelEntity = SpecialZoneHotelEntity;
  specialZoneGuest$: Observable<SpecialZoneGuest[]>;
  constructor(
    private authService: AuthService,
    private hotelService: HotelService,
    private messagesService: MessagesService,
    private specialZoneGuestService: SpecialZoneGuestService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.hotel$ = this.authService.$hotel.pipe(
      tap((hotel) => (this.hotel = hotel)),
      tap((hotel) => {
        this.specialZoneGuest$ = this.specialZoneGuestService.getSpecialZoneGuest(hotel.uid);
      }),
    );
  }

  public goToHome(): void {
    this.router.navigate(['home']);
  }

  public async updateZone(
    $event: MatSlideToggleChange,
    zone: SpecialZoneGuest,
    index: number,
  ): Promise<void> {
    const loader = this.messagesService.showLoader();
    zone.status = $event.checked;
    try {
      await this.specialZoneGuestService.updateSpecialZoneGuest(this.hotel.uid, index, zone);
      this.messagesService.closeLoader(loader);
    } catch (err) {
      this.messagesService.closeLoader(loader);
      this.messagesService.showServerError();
      console.log(err);
    }
  }
}
