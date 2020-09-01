import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RequestTimePipe } from './request-time.pipe';
import { BookingListPipe } from './booking-list.pipe';

@NgModule({
  declarations: [RequestTimePipe, BookingListPipe],
  imports: [CommonModule],
  providers: [DatePipe],
  exports: [RequestTimePipe, BookingListPipe]
})
export class PipesModule {}
