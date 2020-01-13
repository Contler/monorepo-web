import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Zone } from '@contler/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  constructor(private authService: AuthService, private afDt: AngularFireDatabase) {}

  getZones() {
    return this.afDt
      .list<Zone>(`${Zone.REF}`, ref => ref.orderByChild('hotel').equalTo(this.authService.user!.hotel))
      .valueChanges();
  }
}
