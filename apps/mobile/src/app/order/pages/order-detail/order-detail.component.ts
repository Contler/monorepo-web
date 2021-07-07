import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuController } from '@ionic/angular';
import { ProductService } from '@contler/core';
import { RestaurantProductsModel } from '@contler/models';
import { EmployerEntity, OrderEntity, ProductOrderEntity } from '@contler/entity';

import { map, switchMap, take } from 'rxjs/operators';

import { AuthService } from '../../../services/auth.service';
import { GeneralService } from '../../../services/general.service';
import { EmployerService } from '../../../services/employer.service';
import { CheckOrdersService } from '../../services/check-orders.service';

@Component({
  selector: 'contler-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  user: EmployerEntity | null = null;
  order!: OrderEntity;
  total = 0;
  employers: EmployerEntity[] = [];
  load = false;
  load2 = false;
  productsRestaurant: RestaurantProductsModel;

  constructor(
    public auth: AuthService,
    public menu: MenuController,
    public generalService: GeneralService,
    private productService: ProductService,
    private employerService: EmployerService,
    private router: Router,
    private checkProduct: CheckOrdersService,
    route: ActivatedRoute,
  ) {
    route.params
      .pipe(
        map((data) => data['id']),
        switchMap((id) => this.productService.getOrder(id)),
      )
      .subscribe((order) => {
        this.order = order;
        this.productsRestaurant = ProductService.convertProductToRestaurantProducts(order.productsOrder);
        this.total = this.calculateTotal(order.productsOrder);
      });
    this.auth.$user.pipe(take(1)).subscribe((user) => (this.user = user));
    this.employerService.getEmployers().subscribe((employers) => (this.employers = employers));
  }

  ngOnInit() {}

  calculateTotal(products: ProductOrderEntity[]) {
    return products.reduce((previousValue, currentValue) => {
      return currentValue.quantity * currentValue.product.value + previousValue;
    }, 0);
  }

  update() {
    this.load = true;
    this.order.state = 1;
    this.productService.updateOrder(this.order).subscribe(() => {
      this.load = false;
    });
  }

  complete() {
    this.load2 = true;
    this.order.state = 2;
    if (this.order.dateComplete == null) {
      this.order.dateComplete = new Date();
    }
    this.productService.updateOrder(this.order).subscribe(() => {
      this.load2 = false;
      this.checkProduct.complete();
      this.router.navigate(['/home/order/pending']);
    });
  }

  compare(a: EmployerEntity, b: EmployerEntity) {
    return b && a.uid === b.uid;
  }
}
