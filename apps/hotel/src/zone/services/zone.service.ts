import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Zone } from '@contler/models';
import { UserService } from '@contler/core';
import { map, switchMap, take } from 'rxjs/operators';
import { from } from 'rxjs';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ZoneService {
  constructor(private afDb: AngularFireDatabase, private userService: UserService) {}

  saveZone(name: string, principal: boolean, icon: string, category: {name: string, value: number}) {
    return this.userService.getUser().pipe(
      take(1),
      map(user => new Zone(principal, name, icon, user.hotel!, this.afDb.createPushId()!, category)),
      switchMap(zone => from(this.afDb.object(`${Zone.REF}/${zone.uid}`).set(zone.serialize()))),
    );
  }

  getZones() {
    return this.userService.getUser().pipe(
      take(1),
      switchMap(user =>
        this.afDb.list<Zone>(Zone.REF, ref => ref.orderByChild('hotel').equalTo(user.hotel)).valueChanges(),
      ),
      map(zones => zones.map(zone => plainToClass(Zone, zone)))
    );
  }

  updateZone(zone: Zone) {
    return this.afDb.object(`${Zone.REF}/${zone.uid}`).update(zone.serialize())
  }

  deleteZone(zoneMap: Zone) {
    return this.afDb.object(`${Zone.REF}/${zoneMap.uid}`).remove();
  }
}
