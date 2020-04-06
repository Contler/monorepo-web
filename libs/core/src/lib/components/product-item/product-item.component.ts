import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEntity } from '@contler/entity';

@Component({
  selector: 'contler-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product: ProductEntity | undefined;
  @Input() count = 0;
  @Output() changeCount = new EventEmitter<number>();

  constructor() {}

  add() {
    if (this.count >= 99) {
      this.count = 99;
    } else {
      this.count ++;
    }
    this.changeCount.emit(this.count);
  }

  remove() {
    if (this.count <= 0) {
      this.count = 0;
    } else {
      this.count --;
    }
    this.changeCount.emit(this.count);
  }
}
