import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { tap } from 'rxjs/operators';
import { SpecialZoneGuest } from '@contler/models/special-zone-guest';
import { DataSourceSpecialZoneGuest } from './data-source-special-zone-guest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecialZoneGuestService {
  constructor(private angularFireDatabase: AngularFireDatabase) {}

  getSpecialZoneGuest(hotelUid: string): Observable<SpecialZoneGuest[] | null> {
    const url = `specialZoneGuest/${hotelUid}/zones`;
    return this.angularFireDatabase
      .object<SpecialZoneGuest[]>(url)
      .valueChanges()
      .pipe(
        tap((zones) => {
          if (!zones) {
            this.setUpSpecialZoneGuest(url);
          }
        }),
      );
  }
  getSpecialZoneGuestActive(hotelUid: string): Observable<SpecialZoneGuest[] | null> {
    const url = `specialZoneGuest/${hotelUid}/zones`;
    return this.angularFireDatabase
      .list<SpecialZoneGuest>(url, (ref) => ref.orderByChild('status').equalTo(true))
      .valueChanges();
  }

  updateSpecialZoneGuest(hotelUid: string, zoneIndex, zone: SpecialZoneGuest): Promise<void> {
    const url = `specialZoneGuest/${hotelUid}/zones/${zoneIndex}`;
    return this.angularFireDatabase.object(url).update(zone);
  }

  private setUpSpecialZoneGuest(url: string): void {
    this.angularFireDatabase.object(url).set(DataSourceSpecialZoneGuest);
  }
}
