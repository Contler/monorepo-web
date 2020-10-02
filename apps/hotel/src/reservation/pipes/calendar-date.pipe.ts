import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { CalendarDateFormatter } from 'angular-calendar';
import { registerLocaleData, DatePipe } from '@angular/common';

@Pipe({
  name: 'calendarDate',
})
export class CalendarDatePipe implements PipeTransform {
  constructor(private dateFormatter: CalendarDateFormatter, @Inject(LOCALE_ID) private locale: string) {}

  transform(
    date: Date,
    method: string,
    locale: string = this.locale,
    weekStartsOn: number = 0,
    excludeDays: number[] = [],
    daysInWeek?: number,
  ): string {
    if (typeof this.dateFormatter[method] === 'undefined') {
      const allowedMethods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(CalendarDateFormatter.prototype),
      ).filter((iMethod) => iMethod !== 'constructor');
      throw new Error(
        `${method} is not a valid date formatter. Can only be one of ${allowedMethods.join(', ')}`,
      );
    }
    return this.dateFormatter[method]({
      date,
      locale,
      weekStartsOn,
      excludeDays,
      daysInWeek,
    });
  }
}
