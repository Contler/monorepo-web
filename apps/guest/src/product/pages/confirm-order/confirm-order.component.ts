import { Component } from '@angular/core';
import { ProductOrderService } from 'guest/product/services/product-order.service';
import { ProductListModel } from '@contler/models/product-list-model';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent {
  products: ProductListModel[] = [];
  total = 0;

  constructor(private productOrderService: ProductOrderService, private router: Router) {
    this.products = this.productOrderService.getOrder();
    if (!this.products.length) {
      this.router.navigate(['/home/product']);
    }
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.productOrderService.calculateTotal(this.products);
  }

  nextStep() {
    this.productOrderService.saveOrder(this.products)
    this.router.navigate(['/home/product/finish'])
  }
}
