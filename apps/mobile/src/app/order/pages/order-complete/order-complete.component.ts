import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MenuController } from '@ionic/angular';
import { GeneralService } from '../../../services/general.service';
import { ProductService } from '@contler/core';
import { take, tap, map } from 'rxjs/operators';
import { OrderEntity, EmployerEntity } from '@contler/entity';

@Component({
  selector: 'contler-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.scss'],
})
export class OrderCompleteComponent implements OnInit {
  orders: OrderEntity[] = [];
  user: EmployerEntity | null = null;

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
            .pipe(map(orders => orders.filter(order => order.state === 2)))
            .subscribe(orders => (this.orders = orders)),
        ),
      )
      .subscribe(user => (this.user = user));
  }

  ngOnInit() {}
}
