import { Component } from '@angular/core';
import { ProductOrderService } from 'guest/product/services/product-order.service';
import { Router } from '@angular/router';
import { ZoneService } from 'guest/services/zone.service';
import { map, switchMap, take } from 'rxjs/operators';
import { GuestEntity, HotelEntity, ZoneEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderRequest } from '@contler/models/order-request';
import { GuestService } from 'guest/services/guest.service';
import { ProductService } from '@contler/core';
import generateTine from 'guest/utils/generateTime';
import { Store } from '@ngrx/store';
import { State } from 'guest/app/reducers';
import * as OrderReducer from 'guest/app/reducers/order/order.reducer';
import { orderFeatureKey, ProductOrder } from 'guest/app/reducers/order/order.reducer';
import { MatDialog } from '@angular/material/dialog';
import { CompleteOrderModalComponent } from 'guest/product/components/complete-order-modal/complete-order-modal.component';
import { AnalyticsService } from '@contler/analytics';

@Component({
  selector: 'contler-finish-order',
  templateUrl: './finish-order.component.html',
  styleUrls: ['./finish-order.component.scss'],
})
export class FinishOrderComponent {
  products$: Observable<ProductOrder[]>;
  zones$: Observable<ZoneEntity[]>;
  totalPrice$: Observable<number>;

  time = generateTine();
  orderForm: FormGroup;
  loading = false;
  hotel!: HotelEntity | null;
  guest!: GuestEntity | null;

  constructor(
    private productOrderService: ProductOrderService,
    private router: Router,
    private zoneService: ZoneService,
    private formBuild: FormBuilder,
    private guestService: GuestService,
    private productService: ProductService,
    private store: Store<State>,
    private dialog: MatDialog,
    private analytics: AnalyticsService,
  ) {
    this.products$ = this.store.select((state) => OrderReducer.selectAll(state[orderFeatureKey]));
    this.totalPrice$ = this.store.select((state) => state[orderFeatureKey].totalPrice);
    this.zones$ = this.zoneService.$zones.pipe(map((zones) => zones.filter((zone) => zone.admitOrders)));
    this.orderForm = this.formBuild.group({
      time: ['', Validators.required],
      zone: ['', Validators.required],
      comment: [''],
    });
    this.guestService.$hotel.pipe(take(1)).subscribe((hotel) => (this.hotel = hotel));
    this.guestService.$guest.pipe(take(1)).subscribe((guest) => (this.guest = guest));
  }

  createOrder() {
    this.loading = true;
    this.products$
      .pipe(
        take(1),
        map((products) => this.generateProductOrderRequest(products)),
        switchMap((request) => this.productService.createOrder(request)),
        switchMap(() => this.dialog.open(CompleteOrderModalComponent).afterClosed()),
      )
      .subscribe(() => {
        this.analytics.logEvent('restaurant_complete', { module: 'restaurant' });
        this.productOrderService.resetOrder();
        this.loading = false;
        this.router.navigate(['/home/product']);
      });
  }

  get actualTime() {
    return new Date();
  }

  private generateProductOrderRequest(products: ProductOrder[]): OrderRequest {
    const { time, zone, comment } = this.orderForm.value;
    return {
      time,
      comment,
      zone,
      productList: products,
      hotel: this.hotel!,
      guest: this.guest!,
    };
  }
}
