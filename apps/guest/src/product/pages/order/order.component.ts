import { Component } from '@angular/core';
import { ProductService } from '@contler/core';
import { GuestService } from 'guest/services/guest.service';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { OrderEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ORDER_CONSTANTS } from '../../product.constants';
import {
  FilterListComponent,
  FilterListData,
} from '../../../common-components/filter-list/filter-list.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'contler-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  pending = true;
  order$: Observable<OrderEntity[]>;
  constants = ORDER_CONSTANTS;
  restaurants: {};
  listRestaurants: FilterListData<string>[] = [];

  constructor(
    private productService: ProductService,
    private guestService: GuestService,
    private router: Router,
    private bottomSheet: MatBottomSheet,
  ) {
    this.order$ = this.guestService.$guest.pipe(
      take(1),
      switchMap((guest) => this.productService.getOrderByGuest(guest!.uid)),
      tap(this.getRestaurants.bind(this)),
    );
  }

  getRestaurants(orders: OrderEntity[]) {
    const restaurants = {};
    this.listRestaurants = [{ value: this.constants.all, name: this.constants.all, select: true }];
    orders.forEach(({ productsOrder }) => {
      productsOrder.forEach(({ product }) => {
        restaurants[product.restaurant.uid] = product.restaurant.name;
      });
    });
    this.restaurants = restaurants;
    for (const restaurant in restaurants) {
      if (restaurant in restaurants) {
        this.listRestaurants.push({ name: restaurants[restaurant], select: false, value: restaurant });
      }
    }
  }

  openFilter() {
    this.bottomSheet
      .open(FilterListComponent, {
        data: {
          title: this.constants.filter,
          list: this.listRestaurants,
        },
        panelClass: 'bottom-custom',
      })
      .afterDismissed()
      .pipe(filter((data) => !!data))
      .subscribe((data) => (this.listRestaurants = data));
  }

  goToOrder(order: OrderEntity) {
    this.router.navigate(['home/product', order.id]);
  }
}
