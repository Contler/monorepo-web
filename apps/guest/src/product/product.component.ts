import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'guest/services/general.service';
import { GuestService } from 'guest/services/guest.service';
import { ProductService, RestaurantService } from '@contler/core';
import { switchMap, take, tap } from 'rxjs/operators';
import { ObjectCategoryProduct, ProductListModel } from '@contler/models/product-list-model';
import { ProductOrderService } from 'guest/product/services/product-order.service';
import { Router } from '@angular/router';
import { RestaurantEntity } from '@contler/entity/restaurant.entity';
import { Observable } from 'rxjs';
import { CategoryModels } from '@contler/models/category.models';
import { ProductEntity } from '@contler/entity';
import { Store } from '@ngrx/store';
import { State } from 'guest/app/reducers';
import * as OrderAction from 'guest/app/reducers/order/order.actions';
import * as OrderReduce from 'guest/app/reducers/order/order.reducer';
import { orderFeatureKey } from 'guest/app/reducers/order/order.reducer';

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
  private totalProd$: Observable<number>;

  constructor(
    public general: GeneralService,
    private guestService: GuestService,
    private productService: ProductService,
    private restaurantService: RestaurantService,
    private productOrderService: ProductOrderService,
    private router: Router,
    private store: Store<State>,
  ) {
    this.totalProd$ = this.store.select(({ order }) => OrderReduce.selectTotal(order));
  }

  ngOnInit() {
    this.restaurant$ = this.guestService.$hotel.pipe(
      take(1),
      switchMap((hotel) => this.restaurantService.getAllRestaurantsByHotel(hotel!.uid)),
      tap(this.loadCategories.bind(this)),
    );
  }

  updateProduct(product: ProductEntity, quantity: number) {
    this.store.dispatch(OrderAction.AddProduct({ product, quantity }));
  }

  nextStep() {
    this.error = '';
    this.totalProd$.pipe(take(1)).subscribe((total) => {
      if (total) {
        // this.productOrderService.saveOrder(totalProducts);
        this.router.navigate(['/home/product/order']);
      } else {
        this.error = 'Debes seleccionar al menos un producto';
      }
    });
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
