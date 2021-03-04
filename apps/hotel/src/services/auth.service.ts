import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'hotel/environments/environment';
import { EmployerEntity, HotelEntity } from '@contler/entity';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<EmployerEntity | null>(null);
  private hotelSubject = new BehaviorSubject<HotelEntity | null>(null);

  constructor(private afAuth: AngularFireAuth, http: HttpClient) {
    this.afAuth.user
      .pipe(
        filter((user) => !!user),
        switchMap((user) => http.get<EmployerEntity>(environment.apiUrl + `employer/${user!.uid}`)),
      )
      .subscribe((employer) => {
        this.userSubject.next(employer);
        this.hotelSubject.next(employer.hotel);
      });
  }

  get $employer(): Observable<EmployerEntity> {
    return this.userSubject.asObservable().pipe(
      filter((user) => !!user),
      map((e) => e!),
    );
  }
  get $hotel(): Observable<HotelEntity> {
    return this.hotelSubject.asObservable().pipe(
      filter((hotel) => !!hotel),
      map((e) => e!),
    );
  }

  set hotel(hotel: HotelEntity) {
    this.hotelSubject.next(hotel);
  }
}
