import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { take } from 'rxjs/operators';
import { HotelEntity } from '@contler/entity';

@Directive({
  selector: '[contlerColorHotel]',
})
export class ColorHotelDirective implements OnChanges {
  @Input() contlerColorHotel: 'primary' | 'second' | '' = 'primary';
  @Input() overwrite: string;
  private hotel!: HotelEntity | null;

  constructor(private guestService: GuestService, private elemRef: ElementRef) {
    this.guestService.$hotel.pipe(take(1)).subscribe((hotel) => {
      this.hotel = hotel;
      this.setColor();
    });
  }

  ngOnChanges(): void {
    if (this.hotel) {
      this.setColor();
    }
  }

  private setColor() {
    this.elemRef.nativeElement!.style.color =
      this.contlerColorHotel === 'primary' || this.contlerColorHotel === ''
        ? this.hotel!.color
        : this.hotel!.colorSecond;
    if (!!this.overwrite) {
      this.elemRef.nativeElement!.style.color = this.overwrite;
    }
  }
}
