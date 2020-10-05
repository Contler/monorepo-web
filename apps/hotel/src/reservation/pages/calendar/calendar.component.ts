import { Component } from '@angular/core';
import { ReservationService, UserService } from '@contler/core';
import { switchMap } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { MonthViewDay } from 'calendar-utils';
import * as fns from 'date-fns';
import { BookingEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';

@Component({
  selector: 'contler-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;
  viewDate = new Date();
  activeDayIsOpen = false;
  zone: ZoneReserveEntity;

  booking$: Observable<BookingEntity[]>;
  zones$: Observable<ZoneReserveEntity[]>;

  constructor(
    private reservation: ReservationService,
    private usrService: UserService,
    private reservationService: ReservationService,
  ) {
    this.zones$ = this.usrService
      .getUser()
      .pipe(switchMap((user) => this.reservationService.getHotelReservation(user.hotel.uid)));
    this.booking$ = this.usrService
      .getUser()
      .pipe(switchMap((usr) => this.reservation.getBookingByHotel(usr.hotel.uid)));
  }

  dayClicked(event: { day: MonthViewDay<any>; sourceEvent: any }) {
    if (event.day.events.length > 0 && !this.activeDayIsOpen) {
      this.activeDayIsOpen = true;
      this.viewDate = event.day.date;
    } else {
      this.activeDayIsOpen = false;
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  convertBooking(booking: BookingEntity[]) {
    return booking ? booking.map(this.bookingToCalendar) : [];
  }

  private bookingToCalendar(book: BookingEntity): CalendarEvent {
    const start = new Date(book.schedule.timeInit);
    start.setDate(new Date(book.date).getDate());
    start.setMonth(new Date(book.date).getMonth());
    start.setFullYear(new Date(book.date).getFullYear());

    const end = new Date(book.schedule.timeFinish);
    end.setDate(new Date(book.date).getDate());
    end.setMonth(new Date(book.date).getMonth());
    end.setFullYear(new Date(book.date).getFullYear());

    return {
      title: `${book.schedule.reservation.name} - ${book.name} (${fns.format(start, 'H:mm')} - ${fns.format(
        end,
        'H:mm',
      )})`,
      start,
      end,
    };
  }
}
