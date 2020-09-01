import { Component, OnInit } from '@angular/core';
import { ReservationService, UserService } from '@contler/core';
import { map, switchMap } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';
import { MonthViewDay } from 'calendar-utils';
import * as fns from 'date-fns';



@Component({
  selector: 'contler-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  viewDate = new Date();
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;

  constructor(private reservation: ReservationService, private usrService: UserService) {
    this.usrService
      .getUser()
      .pipe(
        switchMap(usr => this.reservation.getBookingByHotel(usr.hotel.uid)),
        map(info =>
          info.map(book => {
            const start = new Date(book.schedule.timeInit);
            start.setDate(new Date(book.date).getDate());

            const end = new Date(book.schedule.timeFinish);
            end.setDate(new Date(book.date).getDate());

            const event: CalendarEvent = {
              title: `${book.schedule.reservation.name} - ${book.name} (${fns.format(start, 'H:mm')} - ${fns.format(end, 'H:mm')})`,
              start,
              end,
            };
            return event;
          }),
        ),
      )
      .subscribe(data => {
        this.events = data;
      });
  }

  dayClicked(event: { day: MonthViewDay<any>; sourceEvent: any }) {
    if (event.day.events.length > 0 && !this.activeDayIsOpen) {
      this.activeDayIsOpen = true;
      this.viewDate = event.day.date;
    } else {
      this.activeDayIsOpen = false;
    }
  }

  ngOnInit() {}
}
