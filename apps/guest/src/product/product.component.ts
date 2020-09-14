import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'guest/services/general.service';
import { CATEGORY_PRODUCTS } from '@contler/const';
import { GuestService } from 'guest/services/guest.service';
import { ProductService, RestaurantService } from '@contler/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ObjectCategoryProduct, ProductListModel } from '@contler/models/product-list-model';
import { ProductOrderService } from 'guest/product/services/product-order.service';
import { Router } from '@angular/router';
import { RestaurantEntity } from '@contler/entity/restaurant.entity';
import { Observable } from 'rxjs';
import { CategoryModels } from '@contler/models/category.models';
import { ProductEntity } from '@contler/entity';

@Component({
  selector: 'contler-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  restaurant$: Observable<RestaurantEntity[]>;

  categories: { [key: string]: Observable<CategoryModels[]> } = {};
  productCategories: ObjectCategoryProduct = {};
  error = '';

  constructor(
    public general: GeneralService,
    private guestService: GuestService,
    private productService: ProductService,
    private restaurantService: RestaurantService,
    private productOrderService: ProductOrderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.restaurant$ = this.guestService.$hotel.pipe(
      take(1),
      switchMap((hotel) => this.restaurantService.getAllRestaurantsByHotel(hotel!.uid)),
      tap(this.loadCategories.bind(this)),
    );
  }

  nextStep() {
    this.error = '';
    let totalProducts: ProductListModel[] = [];
    Object.values(this.productCategories).forEach((data) => {
      totalProducts = [
        ...totalProducts,
        ...data.productList.filter((product) => product.quantity > 0),
      ];
    });
    if (totalProducts.length) {
      this.productOrderService.saveOrder(totalProducts);
      this.router.navigate(['/home/product/order']);
    } else {
      this.error = 'Debes seleccionar al menos un producto';
    }
  }

  getProductsByCategory(products: ProductEntity[], category: string) {
    return products.filter((pro) => pro.category === category);
  }

  private loadCategories(restaurants: RestaurantEntity[]) {
    restaurants.forEach(
      ({ uid }) => (this.categories[uid] = this.restaurantService.getCategoryRestaurant(uid)),
    );
  }
}
