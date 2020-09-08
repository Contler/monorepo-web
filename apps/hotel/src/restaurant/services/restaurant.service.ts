import { Injectable } from '@angular/core';
import { UserService } from '@contler/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { environment } from 'hotel/environments/environment';
import { RestaurantEntity } from '@contler/entity/restaurant.entity';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private userSer: UserService, private http: HttpClient) {}

  saveRestaurant(name: string, hotelId: string) {
    return this.userSer.getUser().pipe(
      switchMap((user) =>
        this.http.post<RestaurantEntity>(`${environment.apiUrl}restaurant/`, {
          name,
          hotelId,
        }),
      ),
    );
  }

  getRestaurants() {
    return this.userSer
      .getUser()
      .pipe(
        switchMap((user) =>
          this.http.get<RestaurantEntity[]>(
            `${environment.apiUrl}hotel/${user.hotel.uid}/restaurant`,
          ),
        ),
      );
  }

  updateRestaurant(name: string, restId: string) {
    return this.http.post(`${environment.apiUrl}restaurant/${restId}`, {
      name,
    });
  }

  deleteRestaurant(restaurant: RestaurantEntity) {
    return this.http.delete(`${environment.apiUrl}restaurant/${restaurant.uid}`);
  }
}
