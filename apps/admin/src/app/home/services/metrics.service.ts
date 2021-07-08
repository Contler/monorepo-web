import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MetricsService {
  constructor(private http: HttpClient) {}

  getUserByHotel(hotelId: string, since: Date, until: Date) {
    return this.http.get('/statistics/guest-in-hotel', {
      params: { hotelId, since: since.toISOString(), until: until.toString() },
      responseType: 'blob',
    });
  }
}
