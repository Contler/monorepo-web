import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnHotelDirective } from './btn-hotel.directive';
import { ColorHotelDirective } from './color-hotel.directive';
import { ColorSlideToggleDirective } from './color-slide-toggle.directive';

const directives = [BtnHotelDirective, ColorHotelDirective];

@NgModule({
  declarations: [...directives, ColorSlideToggleDirective],
  imports: [CommonModule],
  exports: [...directives, ColorSlideToggleDirective],
})
export class DirectivesModule {}
