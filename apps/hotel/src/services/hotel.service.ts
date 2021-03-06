import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@contler/hotel/services/auth.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { environment } from '@contler/hotel/environments/environment';
import { Statistic } from '@contler/models/statistic';
import { Interval } from '@contler/models/interval';
import { SpecialZoneHotelEntity } from '@contler/entity';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getScore() {
    return this.authService.$employer.pipe(
      switchMap((user) => this.http.get<Statistic[]>(environment.apiUrl + `hotel/${user.hotel.uid}/score`)),
    );
  }

  getTime() {
    return this.authService.$employer.pipe(
      switchMap((user) => this.http.get<Interval>(environment.apiUrl + `hotel/${user.hotel.uid}/time`)),
      filter((time) => !!time),
      map((data) => {
        const hours = 'hours' in data ? data.hours + ' hrs' : '';
        const minutes = 'minutes' in data ? data.minutes + ' mins' : '';
        const seconds = 'seconds' in data ? data.seconds + ' secs' : '';
        return [hours, minutes, seconds].join(' ').trim();
      }),
    );
  }

  getSpecialZone(hotelId: string) {
    return this.http.get<SpecialZoneHotelEntity[]>(`${environment.apiUrl}hotel/${hotelId}/special-zones`);
  }
}
