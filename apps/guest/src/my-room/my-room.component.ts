import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SUB_CATEGORY_ROOM } from '@contler/const';
import { HotelEntity } from '@contler/entity';
import { GuestService } from 'guest/services/guest.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'contler-my-room',
  templateUrl: './my-room.component.html',
  styleUrls: ['./my-room.component.scss'],
})
export class MyRoomComponent implements OnInit, OnDestroy {
  categories = SUB_CATEGORY_ROOM;
  hotel: HotelEntity | null | undefined;
  selectedSubcategory = '';
  showRequestField = false;
  loader = false;

  private guestSubscribe: Subscription;

  constructor(private sanitizer: DomSanitizer, private guestService: GuestService) {}

  ngOnInit() {
    this.guestSubscribe = this.guestService.$hotel.subscribe((hotel) => (this.hotel = hotel));
  }

  ngOnDestroy(): void {
    if (this.guestSubscribe) {
      this.guestSubscribe.unsubscribe();
    }
  }

  subCategorySelected(value: string) {
    this.selectedSubcategory = value;
  }

  getButtonColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color
        ? `background-color: ${this.hotel.color}; color: #ffffff !important`
        : '',
    );
  }

  buttonDisabled() {
    let disabledButton = false;
    if (!this.selectedSubcategory) {
      disabledButton = true;
    } else if (this.selectedSubcategory === 'Other') {
      disabledButton = true;
    }
    return disabledButton;
  }
}
