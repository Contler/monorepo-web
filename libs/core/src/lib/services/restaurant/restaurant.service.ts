import { Injectable, Optional } from '@angular/core';
import { CoreConfig } from '@contler/models';
import { HttpClient } from '@angular/common/http';
import { RestaurantEntity } from '@contler/entity/restaurant.entity';
import { AngularFireDatabase } from '@angular/fire/database';
import { CategoryModels } from '@contler/models/category.models';
import { getLan } from '@contler/const';
import { TranslateService } from '@contler/dynamic-translate';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable()
export class RestaurantService {
  private readonly url: string;

  constructor(
    @Optional() private config: CoreConfig,
    private http: HttpClient,
    private afDb: AngularFireDatabase,
    private translate: TranslateService,
  ) {
    this.url = this.config.urlBackend;
  }

  createRestaurant(nameRestaurant: string, hotelId: string) {
    const [to, languages] = getLan();
    return this.http.post<RestaurantEntity>(`${this.url}restaurant`, {
      name: nameRestaurant,
      hotelId,
      to,
      from: languages,
    });
  }

  getAllRestaurantsByHotel(hotelId: string) {
    return this.http.get<RestaurantEntity[]>(`${this.url}hotel/${hotelId}/restaurant`);
  }

  deleteRestaurant(restaurantId: string) {
    return this.http.delete(`${this.url}restaurant/${restaurantId}`);
  }

  updateNameRestaurant(restaurantId: string, newName: string) {
    return this.http.post<RestaurantEntity>(`${this.url}restaurant/${restaurantId}`, {
      name: newName,
    });
  }

  createCategoryRestaurant(restaurantId: string, hotelId: string, name: string) {
    const [actualLan, languages] = getLan();
    const ref = this.afDb.database.ref('restaurantCategories').child(restaurantId);
    const pushRef = ref.push();
    return this.translate
      .generateUrl({ actualLan, languages, hotel: hotelId, url: 'category', mgs: name })
      .pipe(
        switchMap(({ key }) =>
          from(
            pushRef.set({
              restaurant: restaurantId,
              name: key,
              uid: pushRef.key,
            }),
          ),
        ),
      );
  }

  getCategoryRestaurant(restaurantId: string) {
    const ref = this.afDb.database.ref('restaurantCategories').child(restaurantId);
    return this.afDb.list<CategoryModels>(ref).valueChanges();
  }

  updateCategoryRestaurant(restaurantId: string, categoryId: string, name: string) {
    const ref = this.afDb.database.ref('restaurantCategories').child(restaurantId).child(categoryId);
    return ref.update({ name });
  }

  deleteRestaurantCategory(restaurantId: string, categoryId: string) {
    const ref = this.afDb.database.ref('restaurantCategories').child(restaurantId).child(categoryId);
    return this.afDb.object(ref).remove();
  }
}
