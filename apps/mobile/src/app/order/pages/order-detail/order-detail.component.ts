import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MenuController } from '@ionic/angular';
import { GeneralService } from '../../../services/general.service';
import { ProductService } from '@contler/core';
import { EmployerEntity, OrderEntity, ProductOrderEntity } from '@contler/entity';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from '../../../services/employer.service';

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

  constructor(
    private auth: AuthService,
    public menu: MenuController,
    public generalService: GeneralService,
    private productService: ProductService,
    private employerService: EmployerService,
    route: ActivatedRoute,
  ) {
    route.params
      .pipe(
        map(data => data['id']),
        take(1),
        switchMap(id => this.productService.getOrder(id)),
      )
      .subscribe(order => {
        this.order = order
        this.total = this.calculateTotal(order.productsOrder)
      });
    this.auth.$user.pipe(take(1)).subscribe(user => (this.user = user));
    this.employerService.getEmployers().subscribe(employers => this.employers = employers)
  }

  ngOnInit() {}

  calculateTotal(products: ProductOrderEntity[]) {
    return products.reduce((previousValue, currentValue) => {
      return currentValue.quantity * currentValue.product.value + previousValue;
    }, 0);
  }
}
