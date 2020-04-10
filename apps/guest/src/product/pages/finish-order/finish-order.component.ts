import { Component } from '@angular/core';
import { ProductOrderService } from 'guest/product/services/product-order.service';
import { Router } from '@angular/router';
import { ProductListModel } from '@contler/models/product-list-model';
import { ZoneService } from 'guest/services/zone.service';
import { take } from 'rxjs/operators';
import { GuestEntity, HotelEntity, ZoneEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderRequest } from '@contler/models/order-request';
import { GuestService } from 'guest/services/guest.service';
import { ProductService } from '@contler/core';

@Component({
  selector: 'contler-finish-order',
  templateUrl: './finish-order.component.html',
  styleUrls: ['./finish-order.component.scss'],
})
export class FinishOrderComponent {
  productList: ProductListModel[];
  total = 0;
  time = new Array(48);
  zones$: Observable<ZoneEntity[]>;
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
  ) {
    this.productList = this.productOrderService.getOrder();
    if (!this.productList.length) {
      this.router.navigate(['/home/product']);
    }
    this.total = this.productOrderService.calculateTotal(this.productList);
    this.zones$ = this.zoneService.$zones.pipe(take(1));
    this.orderForm = this.formBuild.group({
      time: ['', Validators.required],
      zone: ['', Validators.required],
      comment: [''],
    });
    this.guestService.$hotel.pipe(take(1)).subscribe(hotel => (this.hotel = hotel));
    this.guestService.$guest.pipe(take(1)).subscribe(guest => (this.guest = guest));
  }

  getHour(index: number) {
    const extraTime = 30 * index * 60 * 1000;
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return new Date(date.getTime() + extraTime);
  }

  createOrder() {
    const { time, zone, comment } = this.orderForm.value;
    this.loading = true;

    const order: OrderRequest = {
      time,
      comment,
      zone,
      productList: this.productList,
      hotel: this.hotel!,
      guest: this.guest!,
    };

    this.productService.createOrder(order).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/home/guest-requests']);
    });
  }
}
