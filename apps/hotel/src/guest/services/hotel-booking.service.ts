import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HotelBookingRequest } from '@contler/models/hotel-booking-request';
import { environment } from '@contler/hotel/environments/environment';
import { HotelBookingEntity } from '@contler/entity/hotel-booking.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelBookingService {
  constructor(private httpClient: HttpClient) {}

  createHotelBookingService(hotelBooking: HotelBookingRequest): Observable<HotelBookingEntity> {
    return this.httpClient.post<HotelBookingEntity>(environment.apiUrl + 'booking', hotelBooking);
  }
}
