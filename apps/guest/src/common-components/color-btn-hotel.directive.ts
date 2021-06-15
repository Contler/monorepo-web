import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { GuestService } from 'guest/services/guest.service';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[contlerColorBtnHotel]',
})
export class ColorBtnHotelDirective implements OnChanges {
  @Input() contlerColorBtnHotel: 'primary' | 'second' | '' = 'primary';
  private hotel!: HotelEntity | null;

  constructor(private guestService: GuestService, private elemRef: ElementRef<HTMLButtonElement>) {
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
    let backGroundColor;
    const textColor = '#fff';
    if (this.contlerColorBtnHotel === 'primary' || this.contlerColorBtnHotel === '') {
      backGroundColor = this.hotel!.color;
    } else {
      backGroundColor = this.hotel!.colorSecond;
    }
    this.elemRef.nativeElement!.style.backgroundColor = backGroundColor;
    this.elemRef.nativeElement!.style.color = this.hotel.colorText || textColor;
  }
}
