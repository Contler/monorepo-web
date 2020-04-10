import { Component, OnInit } from '@angular/core';
import { ProductService } from '@contler/core';
import { GuestService } from 'guest/services/guest.service';
import { switchMap, take } from 'rxjs/operators';
import { OrderEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {

  pending = true
  order$: Observable<OrderEntity[]>;

  constructor(private productService: ProductService, private guest: GuestService, private router: Router) {
    this.order$ = this.guest.$guest.pipe(
      take(1),
      switchMap(guest => this.productService.getOrderByGuest(guest!.uid)),
    );
  }

  goToOrder(order: OrderEntity) {
    this.router.navigate(['home/product', order.id])
  }

}
