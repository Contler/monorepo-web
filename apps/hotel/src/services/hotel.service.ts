import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'hotel/services/auth.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { environment } from 'hotel/environments/environment';
import { Statistic } from '@contler/models/statistic';
import { Interval } from '@contler/models/interval';

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
}
