import { Injectable, Optional } from '@angular/core';
import { CoreConfig } from '@contler/models';
import { HttpClient } from '@angular/common/http';
import { RestaurantEntity } from '@contler/entity/restaurant.entity';

@Injectable()
export class RestaurantService {
  private readonly url: string;

  constructor(@Optional() private config: CoreConfig, private http: HttpClient) {
    this.url = this.config.urlBackend;
  }

  createRestaurant(nameRestaurant: string, hotelId: string) {
    return this.http.post<RestaurantEntity>(`${this.url}/restaurant`, {
      name: nameRestaurant,
      hotelId,
    });
  }

  getAllRestaurantsByHotel(hotelId: string) {
    return this.http.get<RestaurantEntity[]>(`${this.url}/hotel/${hotelId}/restaurant`);
  }

  deleteRestaurant(restaurantId: string) {
    return this.http.delete(`${this.url}/restaurant/${restaurantId}`);
  }

  updateNameRestaurant(restaurantId: string, newName: string) {
    return this.http.post<RestaurantEntity>(`${this.url}/restaurant/${restaurantId}`, {
      name: newName,
    });
  }
}
