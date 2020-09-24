import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HotelEntity, ProductEntity } from '@contler/entity';

@Component({
  selector: 'contler-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product: ProductEntity | undefined;
  @Input() count = 0;
  @Output() countChange = new EventEmitter<number>();
  @Output() valueChange = new EventEmitter<void>();
  @Input() disable = false;
  hotel: HotelEntity | null | undefined;

  constructor() {}

  add() {
    if (this.count >= 99) {
      this.count = 99;
    } else {
      this.count++;
    }
    this.countChange.emit(this.count);
    this.valueChange.emit();
  }

  remove() {
    if (this.count <= 0) {
      this.count = 0;
    } else {
      this.count--;
    }
    this.countChange.emit(this.count);
    this.valueChange.emit();
  }
}
