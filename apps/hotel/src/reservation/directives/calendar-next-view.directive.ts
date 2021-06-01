import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { addDaysWithExclusions } from '@contler/hotel/utils/calendar.util';
import { DateAdapter, CalendarView } from 'angular-calendar';

@Directive({
  selector: '[contlerCalendarNextView]',
})
export class CalendarNextViewDirective {
  /**
   * The current view
   */
  @Input() view: CalendarView | 'month' | 'week' | 'day';

  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * Days to skip when going forward by 1 day
   */
  @Input() excludeDays: number[] = [];

  /**
   * The number of days in a week. If set will add this amount of days instead of 1 week
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
    const addFn: any = {
      day: this.dateAdapter.addDays,
      week: this.dateAdapter.addWeeks,
      month: this.dateAdapter.addMonths,
    }[this.view];

    if (this.view === CalendarView.Day) {
      this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, 1, this.excludeDays));
    } else if (this.view === CalendarView.Week && this.daysInWeek) {
      this.viewDateChange.emit(
        addDaysWithExclusions(this.dateAdapter, this.viewDate, this.daysInWeek, this.excludeDays),
      );
    } else {
      this.viewDateChange.emit(addFn(this.viewDate, 1));
    }
  }
}
