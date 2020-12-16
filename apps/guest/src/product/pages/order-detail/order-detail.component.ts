import { Component, OnInit } from '@angular/core';
import { ProductService } from '@contler/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { OrderEntity, ProductOrderEntity } from '@contler/entity';
import { STATUS_ORDER } from '@contler/const';

@Component({
  selector: 'contler-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  order!: OrderEntity;
  total = 0;
  readonly status = STATUS_ORDER;
  constructor(private productService: ProductService, route: ActivatedRoute) {
    route.params
      .pipe(
        map((data) => data['id']),
        switchMap((id) => this.productService.getOrder(id)),
      )
      .subscribe((order) => {
        this.order = order;
        this.total = this.calculateTotal(order.productsOrder);
      });
  }

  ngOnInit() {}

  calculateTotal(products: ProductOrderEntity[]) {
    return products.reduce((previousValue, currentValue) => {
      return currentValue.quantity * currentValue.product.value + previousValue;
    }, 0);
  }
}
