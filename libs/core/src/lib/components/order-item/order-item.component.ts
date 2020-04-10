import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OrderEntity, ProductOrderEntity } from '@contler/entity';

@Component({
  selector: 'contler-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnChanges {
  @Input() order!: OrderEntity;
  total = 0;
  textProducts = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.order && this.order) {
      this.total = this.calculateTotal(this.order.productsOrder);
      this.textProducts = this.convertProductToString(this.order.productsOrder);
    }
  }

  calculateTotal(products: ProductOrderEntity[]) {
    return products.reduce((previousValue, currentValue) => {
      return currentValue.quantity * currentValue.product.value + previousValue;
    }, 0);
  }

  convertProductToString(products: ProductOrderEntity[]) {
    return products.map(product => product.product.name).join(', ');
  }
}
