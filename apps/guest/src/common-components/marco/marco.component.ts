import { Component, OnDestroy } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'contler-marco',
  templateUrl: './marco.component.html',
  styleUrls: ['./marco.component.scss'],
})
export class MarcoComponent implements OnDestroy {
  private color: string | null | undefined;
  private subscribe: Subscription;

  constructor(private guestService: GuestService, private sanitizer: DomSanitizer) {
    this.subscribe = this.guestService.$hotel.subscribe(hotel => (this.color = hotel!.color));
  }

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(this.color ? `color: ${this.color}` : '');
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
}
