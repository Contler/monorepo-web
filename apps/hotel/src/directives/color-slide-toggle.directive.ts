import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { AuthService } from 'hotel/services/auth.service';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[contlerColorSlideToggle]',
})
export class ColorSlideToggleDirective implements OnChanges, AfterViewInit {
  @Input() contlerColorHotel: 'primary' | 'second' | '' = 'primary';
  private hotel!: HotelEntity | null;

  constructor(private auth: AuthService, private elemRef: ElementRef, private renderer2: Renderer2) {}

  public ngAfterViewInit(): void {
    this.auth.$employer.pipe(take(1)).subscribe(({ hotel }) => {
      this.hotel = hotel;
      this.setColor();
    });
  }

  ngOnChanges(): void {
    if (this.hotel) {
      this.setColor();
    }
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
      this.elemRef.nativeElement!.children[0]!.children[0]!,
      'style',
      `background-color: ${this.hexToRGB(
        this.contlerColorHotel === 'primary' || this.contlerColorHotel === ''
          ? this.hotel!.color
          : this.hotel!.colorSecond,
        0.7,
      )}`,
    );

    this.renderer2.setAttribute(
      this.elemRef.nativeElement!.children[0]!.children[0]!.children[1]!.children[0],
      'style',
      `background-color: ${
        this.contlerColorHotel === 'primary' || this.contlerColorHotel === ''
          ? this.hotel!.color
          : this.hotel!.colorSecond
      }`,
    );
  }
}
