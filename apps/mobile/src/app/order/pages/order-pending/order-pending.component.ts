import { Component, OnInit } from '@angular/core';
import { EmployerEntity, OrderEntity } from '@contler/entity';
import { AuthService } from '../../../services/auth.service';
import { MenuController } from '@ionic/angular';
import { GeneralService } from '../../../services/general.service';
import { map, take, tap } from 'rxjs/operators';
import { ProductService } from '@contler/core';

@Component({
  selector: 'contler-order-pending',
  templateUrl: './order-pending.component.html',
  styleUrls: ['./order-pending.component.scss'],
})
export class OrderPendingComponent implements OnInit {
  user: EmployerEntity | null = null;
  orders: OrderEntity[] = [];

  constructor(
    private auth: AuthService,
    public menu: MenuController,
    public generalService: GeneralService,
    productService: ProductService,
  ) {
    this.auth.$user
      .pipe(
        take(1),
        tap(user =>
          productService
            .getOrdersByHotel(user!.hotel.uid)
            .pipe(map(orders => orders.filter(order => order.state < 2)))
            .subscribe(orders => (this.orders = orders)),
        ),
      )
      .subscribe(user => (this.user = user));
  }

  ngOnInit() {}
}
