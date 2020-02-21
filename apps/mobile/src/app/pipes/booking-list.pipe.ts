import { Pipe, PipeTransform } from '@angular/core';
import { BookingEntity } from '@contler/entity';
import { DatePipe } from '@angular/common';


@Pipe({
  name: 'bookingList'
})
export class BookingListPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(args: BookingEntity[], value: string,): BookingEntity[] {
    return value === null || value === '' ? args : args.filter(data => {
      const name = data.schedule.reservation.name.toLowerCase();
      const date = this.datePipe.transform(data.date, 'dd/MM/yyyy')!.toLowerCase();
      const time = this.datePipe.transform(data.schedule.timeInit, 'shortTime')!.toLowerCase();
      const textLow = value.toLowerCase();
      return name.includes(textLow) || date.includes(textLow) || time.includes(textLow);
    });
  }

}
