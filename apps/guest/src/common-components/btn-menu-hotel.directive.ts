import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { GuestService } from 'guest/services/guest.service';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[contlerBtnMenuHotel]',
})
export class BtnMenuHotelDirective implements OnChanges {
  @Input() select = false;
  hotel!: HotelEntity | null;

  constructor(private guestService: GuestService, private elemRef: ElementRef) {
    this.guestService.$hotel.pipe(take(1)).subscribe(hotel => {
      this.hotel = hotel;
      elemRef.nativeElement!.style.color = hotel!.colorSecond;
      elemRef.nativeElement!.style.borderRadius = 0;
      if (this.select) {
        this.selectElement()
      } else {
        this.noSelect();
      }
    });
  }

  ngOnChanges(): void {
    if (this.select && this.hotel) {
      this.selectElement();
    } else if (this.hotel) {
      this.noSelect();
    }
  }

  private selectElement() {
    this.elemRef.nativeElement!.style.backgroundColor = 'transparent';
    this.elemRef.nativeElement!.style.borderBottomColor = `transparent`;
  }

  private noSelect() {
    this.elemRef.nativeElement!.style.backgroundColor = this.hotel!.colorSecond + '14';
    this.elemRef.nativeElement!.style.borderBottom = `2px solid ${this.hotel!.colorSecond}`;
  }
}
