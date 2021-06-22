import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[contlerBtnHotel]',
})
export class BtnHotelDirective implements OnChanges {
  @Input() contlerBtnHotel: 'primary' | 'second' | '' = 'primary';
  @Input() opacity: number;
  @Input() loading = false;

  private hotel!: HotelEntity | null;
  private content: string;

  constructor(private auth: AuthService, private elemRef: ElementRef<HTMLButtonElement>) {
    this.auth.$user.pipe(take(1)).subscribe(({ hotel }) => {
      this.hotel = hotel;
      this.setColor();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.hotel) {
      this.setColor();
    }
    if (changes['loading']) {
      if (this.loading) {
        this.content = this.elemRef.nativeElement.innerHTML;
        this.elemRef.nativeElement.innerHTML = '';
        this.elemRef.nativeElement.classList.add('cnt-loading');
      } else if (!!this.content) {
        this.elemRef.nativeElement.innerHTML = this.content;
        this.content = undefined;
        this.elemRef.nativeElement.classList.remove('cnt-loading');
      }
    }
  }

  private setColor() {
    let backGroundColor = '#006633';
    let textColor = '#fff';
    if (this.hotel) {
      if (this.contlerBtnHotel === 'primary' || this.contlerBtnHotel === '') {
        backGroundColor = this.hotel.color + (this.opacity ? this.opacity : '');
        textColor = this.hotel.colorText;
      } else {
        backGroundColor = this.hotel.colorSecond + (this.opacity ? this.opacity : '');
      }
    }
    this.elemRef.nativeElement!.style.backgroundColor = backGroundColor;
    this.elemRef.nativeElement!.style.color = this.hotel.colorText || textColor;
  }
}
