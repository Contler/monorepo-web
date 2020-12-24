import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { TranslateService, UserService } from '@contler/core';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CategoryEntity, ZoneEntity } from '@contler/entity';
import { environment } from 'hotel/environments/environment';
import { getLan } from '@contler/const';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  constructor(
    private afDb: AngularFireDatabase,
    private userService: UserService,
    private http: HttpClient,
  ) {}

  saveZone(name: string, principal: boolean, icon: string, category: CategoryEntity) {
    const [actualLan, languages] = getLan();

    return this.userService.getUser().pipe(
      switchMap((user) =>
        this.http.post<ZoneEntity>(environment.apiUrl + `hotel/${user.hotel.uid}/zone`, {
          name,
          icon,
          principal,
          category,
          actualLan,
          languages,
        }),
      ),
    );
  }

  getCategories() {
    return this.http.get<CategoryEntity[]>(environment.apiUrl + 'hotel/category');
  }

  getZones() {
    return this.userService
      .getUser()
      .pipe(
        switchMap((user) => this.http.get<ZoneEntity[]>(environment.apiUrl + `hotel/${user.hotel.uid}/zone`)),
      );
  }

  updateZone(zone: ZoneEntity) {
    return this.http.put(environment.apiUrl + `hotel/zone/`, { ...zone });
  }

  deleteZone(zone: ZoneEntity) {
    return this.http.delete(environment.apiUrl + `hotel/zone/${zone.uid}`);
  }
}
