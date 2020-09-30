import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[contlerBtnHotel]',
})
export class BtnHotelDirective implements OnChanges {
  @Input() contlerBtnHotel: 'primary' | 'second' | '' = 'primary';
  private hotel!: HotelEntity | null;

  constructor(private auth: AuthService, private elemRef: ElementRef) {
    this.auth.$user.pipe(take(1)).subscribe(({ hotel }) => {
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
    let backGroundColor = '#006633';
    let textColor = '#fff';
    if (this.hotel) {
      if (this.contlerBtnHotel === 'primary' || this.contlerBtnHotel === '') {
        backGroundColor = this.hotel.color;
        textColor = this.hotel.colorText;
      } else {
        backGroundColor = this.hotel.colorSecond;
      }
    }
    this.elemRef.nativeElement!.style.backgroundColor = backGroundColor;
    this.elemRef.nativeElement!.style.color = this.hotel.colorText || textColor;
  }
}
