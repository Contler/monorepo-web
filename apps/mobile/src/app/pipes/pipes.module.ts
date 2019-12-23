import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestTimePipe } from './request-time.pipe';

@NgModule({
  declarations: [RequestTimePipe],
  imports: [CommonModule],
  exports: [RequestTimePipe]
})
export class PipesModule {}
