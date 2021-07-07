import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HotelEntity, OrderEntity, ProductOrderEntity } from '@contler/entity';

@Component({
  selector: 'contler-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnChanges {
  @Input() order!: OrderEntity;
  @Input() hotel: HotelEntity;
  total = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.order && this.order) {
      this.total = this.calculateTotal(this.order.productsOrder);
    }
  }

  calculateTotal(products: ProductOrderEntity[]) {
    return products.reduce((previousValue, currentValue) => {
      return currentValue.quantity * currentValue.product.value + previousValue;
    }, 0);
  }
}
