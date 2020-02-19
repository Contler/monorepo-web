import { Injectable, Optional } from '@angular/core';
import { CoreConfig, ReservationRequest } from '@contler/models';
import { HttpClient } from '@angular/common/http';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';
import { BookingEntity, ScheduleEntity } from '@contler/entity';
import { BookingRequest } from '@contler/models/booking-request';

@Injectable()
export class ReservationService {
  private url: string;

  constructor(@Optional() private config: CoreConfig, private http: HttpClient) {
    this.url = config.urlBackend;
  }

  createReservation(reservationRequest: ReservationRequest) {
    return this.http.post<ZoneReserveEntity>(this.url + 'reservation', { ...reservationRequest });
  }

  getHotelReservation(idHotel: string) {
    return this.http.get<ZoneReserveEntity[]>(this.url + `hotel/${idHotel}/reservation`);
  }

  getReservation(id: number) {
    return this.http.get<ZoneReserveEntity>(this.url + `reservation/${id}`);
  }

  updateReservation(reservation: ZoneReserveEntity) {
    return this.http.post(this.url + `reservation/${reservation.id}`, reservation);
  }

  createSchedule(id: number, schedule: ScheduleEntity) {
    return this.http.post(this.url + `reservation/${id}/schedule`, schedule);
  }

  deleteSchedule(id: number) {
    return this.http.delete(this.url + `reservation/schedule/${id}`);
  }

  deleteReservation(id: number) {
    return this.http.delete(this.url + `reservation/${id}`);
  }

  updateSchedule(schedule: ScheduleEntity) {
    return this.http.put(this.url + `reservation/schedule/${schedule.id}`, schedule);
  }

  saveBooking(id: number, request: BookingRequest) {
    return this.http.post(this.url + `reservation/schedule/${id}/booking`, request);
  }

  getBookingByGuest(id: string) {
    return this.http.get<BookingEntity[]>(this.url + `guest/${id}/reservation`);
  }

  getBooking(id: number) {
    return this.http.get<BookingEntity>(this.url + `reservation/booking/${id}`);
  }

  updateBooking(booking: BookingEntity) {
    return this.http.put(this.url + `reservation/booking`, booking);
  }
}
