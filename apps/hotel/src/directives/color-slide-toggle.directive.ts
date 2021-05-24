import { AfterViewChecked, Directive, Input, Renderer2 } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { take } from 'rxjs/operators';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[contlerColorSlideToggle]',
})
export class ColorSlideToggleDirective implements AfterViewChecked {
  @Input() contlerColorHotel: 'primary' | 'second' | '' = 'primary';
  private hotel!: HotelEntity | null;
  private slideValueChangeSubscription$: Subscription;
  constructor(private auth: AuthService, private elemRef: MatSlideToggle, private renderer2: Renderer2) {}

  ngAfterViewChecked(): void {
    this.auth.$employer.pipe(take(1)).subscribe(({ hotel }) => {
      this.hotel = hotel;
      this.slideValueChangeSubscription$ = this.elemRef.change.asObservable().subscribe((change) => {
        if (change.checked) {
          this.setColor();
        } else {
          this.setUnChecked();
        }
      });
    });
    this.elemRef.checked === true ? this.setColor() : this.setUnChecked();
  }

  /**
   * method from stack overflow | pass a hexadecimal color and convert to rgb color with alpha
   * https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
   * @param hex
   * @param alpha
   */
  public hexToRGB(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }

  private setColor() {
    this.renderer2.setAttribute(
      this.elemRef._thumbBarEl.nativeElement,
      'style',
      `background-color: ${this.hexToRGB(
        this.contlerColorHotel === 'primary' || this.contlerColorHotel === ''
          ? this.hotel!.color
          : this.hotel!.colorSecond,
        0.7,
      )}`,
    );
    this.renderer2.setAttribute(
      this.elemRef._thumbEl.nativeElement.children[0]!,
      'style',
      `background-color: ${
        this.contlerColorHotel === 'primary' || this.contlerColorHotel === ''
          ? this.hotel!.color
          : this.hotel!.colorSecond
      }`,
    );
  }

  private setUnChecked(): void {
    this.renderer2.setAttribute(
      this.elemRef._thumbBarEl.nativeElement,
      'style',
      `background-color: rgba(0, 0, 0, 0.38)`,
    );

    this.renderer2.setAttribute(
      this.elemRef._thumbEl.nativeElement.children[0]!,
      'style',
      `background-color: rgba(255, 255, 255, 1)`,
    );
  }
}
