import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@contler/core';
import { map, switchMap } from 'rxjs/operators';
import { ProductEntity } from '@contler/entity';
import { OrderEntity } from '@contler/entity';
import { CATEGORY_PRODUCTS } from '@contler/const';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'contler-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent {
  product!: ProductEntity;
  order!: OrderEntity;

  categories = CATEGORY_PRODUCTS;

  productForm!: FormGroup;
  orderForm!: FormGroup;

  load = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    formBuild: FormBuilder,
  ) {
    this.route.params
      .pipe(
        map(data => data['id']),
        switchMap(id => this.productService.getOrder(id)),
      )
      .subscribe(order => {
        this.order = order;
        this.orderForm = formBuild.group({
          comment: [order.comment, Validators.required],
          time: [order.time, Validators.required],
          state: [order.state, Validators.required],
          productsOrder: [order.productsOrder, Validators.required],
          zone: [order.zone, Validators.required],
          guest: [order.guest, Validators.required]
        });
      });
  }

  orderProductsTotalValue(order : OrderEntity) {
    let totalOrder = 0;
    order.productsOrder.forEach(elm => {
      totalOrder += (elm.quantity * elm.product.value);
    });
    return totalOrder;
  }

  updateProduct() {
    this.error = '';
    this.load = true;
    this.productService.updateProduct(this.product).subscribe(() => {
      this.load = false;
      this.router.navigate(['home/product']);
    });
  }

  deleteProduct() {
    this.load = true;
    this.error = '';
    this.productService.deleteProduct(this.product.id).subscribe(
      () => {
        this.router.navigate(['home/product']);
      },
      () => {
        this.load = false;
        this.error = 'No se puede borrar el producto';
      },
    );
  }
}
