import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Zone, ZoneCategory, MapZone } from '@contler/core/models';
import { UserService } from '@contler/core';
import { map, switchMap, take } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ZoneService {
  constructor(private afDb: AngularFireDatabase, private userService: UserService) {}

  saveZone(name: string, principal: boolean, icon: string, parent?: string) {
    return this.userService.getUser().pipe(
      take(1),
      map(user => new Zone(principal, name, icon, user.hotel!, this.afDb.createPushId()!, parent)),
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

  getMapZone($zone: Observable<Zone[]>) {
    return $zone.pipe(
      map(zones => {
        const principalZones: MapZone = {};
        zones.forEach(zone => {
          if (!zone.parentZone) {
            principalZones[zone.uid] = { zone, subZones: [] };
          } else if (zone.parentZone && principalZones[zone.parentZone]) {
            principalZones[zone.parentZone].subZones = [...principalZones[zone.parentZone].subZones, zone];
          }
        });
        return principalZones;
      }),
    );
  }

  deleteZone(zoneMap: ZoneCategory | Zone) {
    if ('zone' in zoneMap) {
      zoneMap.subZones.forEach(zone => this.afDb.object(`${Zone.REF}/${zone.uid}`).remove());
      this.afDb.object(`${Zone.REF}/${zoneMap.zone.uid}`).remove();
    } else {
      this.afDb.object(`${Zone.REF}/${zoneMap.uid}`).remove();
    }

  }
}
