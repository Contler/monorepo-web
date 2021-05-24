import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { DateAdapter, CalendarView } from 'angular-calendar';
import { addDaysWithExclusions } from '@contler/hotel/utils/calendar.util';

@Directive({
  selector: '[contlerCalendarPreviuosView]',
})
export class CalendarPreviuosViewDirective {
  /**
   * The current view
   */
  @Input() view: CalendarView | 'month' | 'week' | 'day';

  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * Days to skip when going back by 1 day
   */
  @Input() excludeDays: number[] = [];

  /**
   * The number of days in a week. If set will subtract this amount of days instead of 1 week
   */
  @Input() daysInWeek: number;

  /**
   * Called when the view date is changed
   */
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  constructor(private dateAdapter: DateAdapter) {}

  /**
   * @hidden
   */
  @HostListener('click')
  onClick(): void {
    const subFn: any = {
      day: this.dateAdapter.subDays,
      week: this.dateAdapter.subWeeks,
      month: this.dateAdapter.subMonths,
    }[this.view];

    if (this.view === CalendarView.Day) {
      this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, -1, this.excludeDays));
    } else if (this.view === CalendarView.Week && this.daysInWeek) {
      this.viewDateChange.emit(
        addDaysWithExclusions(this.dateAdapter, this.viewDate, -this.daysInWeek, this.excludeDays),
      );
    } else {
      this.viewDateChange.emit(subFn(this.viewDate, 1));
    }
  }
}
