import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ZoneEntity } from '@contler/entity';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  private zoneSubject = new BehaviorSubject<ZoneEntity[]>([]);

  constructor(private http: HttpClient, authService: AuthService, private afDt: AngularFireDatabase) {
    authService.$user.pipe(switchMap(user => this.getZones(user!.hotel.uid)));
  }

  getZones(idHotel: string) {
    return this.http
      .get<ZoneEntity[]>(environment + `hotel/${idHotel}/zone`)
      .pipe(tap(zones => this.zoneSubject.next(zones)));
  }

  get $zones() {
    return this.zoneSubject.asObservable();
  }
}
