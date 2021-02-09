import { Directive, ElementRef, Input, OnChanges, OnDestroy } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[contlerBtnHotel]',
})
export class BtnHotelDirective implements OnChanges {
  @Input() contlerBtnHotel: 'primary' | 'second' | '' = 'primary';
  @Input() disabled = false;
  private hotel!: HotelEntity | null;

  constructor(private auth: AuthService, private elemRef: ElementRef) {
    this.auth.$employer.pipe(take(1)).subscribe(({ hotel }) => {
      this.hotel = hotel;
      if (!this.disabled) {
        this.setColor();
      } else {
        this.setDisabledColor();
      }
    });
  }

  ngOnChanges(): void {
    if (this.hotel) {
      if (!this.disabled) {
        this.setColor();
      } else {
        this.setDisabledColor();
      }
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

  private setDisabledColor(): void {
    this.elemRef.nativeElement!.style.backgroundColor = 'rgba(0,0,0,0.12)';
    this.elemRef.nativeElement!.style.color = this.hotel.colorTextSecond;
  }
}
