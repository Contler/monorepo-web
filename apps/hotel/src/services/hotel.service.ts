import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'hotel/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { environment } from 'hotel/environments/environment';
import { Statistic } from '@contler/models/statistic';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getScore() {
    return this.authService.$employer.pipe(
      switchMap(user => this.http.get<Statistic[]>(environment.apiUrl + `hotel/${user.hotel.uid}/score`)),
    );
  }

  getTime() {
    return this.authService.$employer.pipe(
      switchMap(user => this.http.get<Statistic[]>(environment.apiUrl + `hotel/${user.hotel.uid}/time`)),
    );
  }
}
