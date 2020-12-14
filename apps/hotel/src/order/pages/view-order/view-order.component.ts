import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@contler/core';
import { map, switchMap } from 'rxjs/operators';
import { OrderEntity, ProductEntity } from '@contler/entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantProductsModel } from '@contler/models';

@Component({
  selector: 'contler-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent {
  product!: ProductEntity;
  order!: OrderEntity;
  restaurantProds: RestaurantProductsModel;

  readonly states = [
    { name: 'order.pending', value: 0 },
    { name: 'order.complete', value: 1 },
  ];
  state = 0;

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
        map((data) => data['id']),
        switchMap((id) => this.productService.getOrder(id)),
      )
      .subscribe((order) => {
        this.order = order;
        this.state = this.order.state;
        this.restaurantProds = ProductService.convertProductToRestaurantProducts(order.productsOrder);

        this.orderForm = formBuild.group({
          comment: [order.comment, Validators.required],
          time: [order.time, Validators.required],
          state: [order.state, Validators.required],
          productsOrder: [order.productsOrder, Validators.required],
          zone: [order.zone, Validators.required],
          guest: [order.guest, Validators.required],
        });
      });
  }

  changeOrderState(event: number) {
    this.order.state = event;
    this.state = this.order.state;
  }

  orderProductsTotalValue(order: OrderEntity) {
    let totalOrder = 0;
    order.productsOrder.forEach((elm) => {
      totalOrder += elm.quantity * elm.product.value;
    });
    return totalOrder;
  }

  updateOrder() {
    this.error = '';
    this.load = true;
    this.productService.updateOrder(this.order).subscribe(() => {
      this.load = false;
      this.router.navigate(['home/order']);
    });
  }

  deleteOrder() {
    this.load = true;
    this.error = '';
    this.productService.deleteOrder(this.order.id).subscribe(
      () => {
        this.router.navigate(['home/order']);
      },
      () => {
        this.load = false;
        this.error = 'No se puede borrar el pedido';
      },
    );
  }
}
