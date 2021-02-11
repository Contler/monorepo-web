import { Injectable, Optional } from '@angular/core';
import { CoreConfig, ReservationRequest } from '@contler/models';
import { HttpClient } from '@angular/common/http';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';
import { BookingEntity, ScheduleEntity } from '@contler/entity';
import { BookingRequest } from '@contler/models/booking-request';
import { map } from 'rxjs/operators';
import { getLan } from '@contler/const';
import { SubZoneReservationRequest } from '@contler/models/sub-zone-reservation-request';
import { SubZoneReserveEntity } from '@contler/entity/sub-zone-reserve.entity';
import { Observable } from 'rxjs';

@Injectable()
export class ReservationService {
  private readonly url: string;

  constructor(@Optional() private config: CoreConfig, private http: HttpClient) {
    this.url = config.urlBackend;
  }

  createReservation(reservationRequest: ReservationRequest) {
    const [to, from] = getLan();
    reservationRequest.to = to;
    reservationRequest.from = from;
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
    return this.http
      .get<BookingEntity[]>(this.url + `guest/${id}/reservation`)
      .pipe(map((bookings) => bookings.filter((booking) => booking.active)));
  }

  getBookingByHotel(id: string) {
    return this.http.get<BookingEntity[]>(this.url + `hotel/${id}/booking`);
  }

  getBooking(id: number) {
    return this.http.get<BookingEntity>(this.url + `reservation/booking/${id}`);
  }

  updateBooking(booking: BookingEntity) {
    return this.http.put(this.url + `reservation/booking`, booking);
  }

  cancelBooking(booking: BookingEntity) {
    return this.http.post(this.url + 'reservation/booking/cancel', booking);
  }

  completeBooking(booking: BookingEntity) {
    return this.http.post(this.url + 'reservation/booking/complete', booking);
  }

  qualifyBooking(bookingId: number, qualify: number) {
    return this.http.post(this.url + `reservation/booking/${bookingId}/qualify`, { qualify });
  }

  createSubZoneReservation(
    subZoneReservationRequest: SubZoneReservationRequest,
  ): Observable<SubZoneReserveEntity> {
    const [to, from] = getLan();
    subZoneReservationRequest.to = to;
    subZoneReservationRequest.from = from;
    return this.http.post<SubZoneReserveEntity>(this.url + 'sub-zone-reservation', {
      ...subZoneReservationRequest,
    });
  }

  deleteSubZoneReservation(id: number) {
    return this.http.delete(this.url + `sub-zone-reservation/${id}`);
  }

  getSubZoneReservation(id: number) {
    return this.http.get<SubZoneReserveEntity>(this.url + `sub-zone-reservation/${id}`);
  }

  updateSubZoneReservation(reservation: SubZoneReserveEntity) {
    return this.http.post(this.url + `sub-zone-reservation/${reservation.id}`, reservation);
  }

  createSubZoneSchedule(id: number, schedule: ScheduleEntity) {
    return this.http.post(this.url + `sub-zone-reservation/${id}/schedule`, schedule);
  }

  deleteSubZoneSchedule(id: number) {
    return this.http.delete(this.url + `sub-zone-reservation/schedule/${id}`);
  }

  updateSubZoneSchedule(schedule: ScheduleEntity) {
    return this.http.put(this.url + `sub-zone-reservation/schedule/${schedule.id}`, schedule);
  }

  saveSubZoneBooking(id: number, request: BookingRequest) {
    return this.http.post(this.url + `sub-zone-reservation/schedule/${id}/booking`, request);
  }
}
