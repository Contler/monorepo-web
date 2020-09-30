import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[contlerColorHotel]',
})
export class ColorHotelDirective implements OnChanges {
  @Input() contlerColorHotel: 'primary' | 'second' | '' = 'primary';
  private hotel!: HotelEntity | null;

  constructor(private auth: AuthService, private elemRef: ElementRef) {
    this.auth.$user.pipe(take(1)).subscribe((usr) => {
      this.hotel = usr.hotel;
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
  }
}
