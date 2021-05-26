import { Component } from '@angular/core';
import { ProductService } from '@contler/core';
import { GuestService } from 'guest/services/guest.service';
import { switchMap, take, tap } from 'rxjs/operators';
import { OrderEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ORDER_CONSTANTS } from '../../product.constants';

@Component({
  selector: 'contler-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  pending = true;
  order$: Observable<OrderEntity[]>;
  constants = ORDER_CONSTANTS;

  constructor(
    private productService: ProductService,
    private guestService: GuestService,
    private router: Router,
  ) {
    this.order$ = this.guestService.$guest.pipe(
      take(1),
      switchMap((guest) => this.productService.getOrderByGuest(guest!.uid)),
      tap(console.log),
    );
  }

  goToOrder(order: OrderEntity) {
    this.router.navigate(['home/product', order.id]);
  }
}
