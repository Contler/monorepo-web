import { Injectable } from '@angular/core';
import { ProductListModel } from '@contler/models/product-list-model';

@Injectable()
export class ProductOrderService {
  constructor() {}

  saveOrder(products: ProductListModel[]) {
    sessionStorage.setItem('order', JSON.stringify(products));
  }

  resetOrder() {
    sessionStorage.clear();
  }

  getOrder() {
    const data = sessionStorage.getItem('order');
    return data ? (JSON.parse(data) as ProductListModel[]) : [];
  }

  calculateTotal(products: ProductListModel[]) {
    return products.reduce((previousValue, currentValue) => {
      return currentValue.quantity * currentValue.product.value + previousValue;
    }, 0);
  }
}
