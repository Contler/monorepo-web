import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { tap } from 'rxjs/operators';
import { SpecialZoneGuest } from '@contler/models/special-zone-guest';
import { DataSourceSpecialZoneGuest } from '@contler/const/data-source-special-zone-guest';
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

  updateMultipleSpecialZoneGuest(
    hotelUid: string,
    zones: { [index: string]: SpecialZoneGuest },
  ): Promise<void> {
    const updates: { [ref: string]: SpecialZoneGuest } = {};
    for (const zoneKey in zones) {
      if (zones.hasOwnProperty(zoneKey)) {
        updates[`specialZoneGuest/${hotelUid}/zones/${zoneKey}`] = zones[zoneKey];
      }
    }
    return this.angularFireDatabase.database.ref().update(updates);
  }

  private setUpSpecialZoneGuest(url: string): void {
    this.angularFireDatabase.object(url).set(DataSourceSpecialZoneGuest);
  }
}
