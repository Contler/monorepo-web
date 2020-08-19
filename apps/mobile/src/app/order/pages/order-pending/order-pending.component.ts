import { Component, OnDestroy, OnInit } from "@angular/core";
import { EmployerEntity, OrderEntity } from '@contler/entity';
import { AuthService } from '../../../services/auth.service';
import { MenuController } from '@ionic/angular';
import { GeneralService } from '../../../services/general.service';
import { map, take, tap } from 'rxjs/operators';
import { ProductService } from '@contler/core';
import { CheckOrdersService } from "../../services/check-orders.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'contler-order-pending',
  templateUrl: './order-pending.component.html',
  styleUrls: ['./order-pending.component.scss'],
})
export class OrderPendingComponent implements OnInit, OnDestroy {
  user: EmployerEntity | null = null;
  orders: OrderEntity[] = [];
  private uns: Subscription;

  constructor(
    private auth: AuthService,
    public menu: MenuController,
    public generalService: GeneralService,
    private productService: ProductService,
    private checkProduct: CheckOrdersService,
  ) {
    this.loadData();
    this.uns = this.checkProduct.$completeOrder.subscribe(() => this.loadData());
  }

  private loadData() {
    this.auth.$user
      .pipe(
        take(1),
        tap(user =>
          this.productService
            .getOrdersByHotel(user!.hotel.uid)
            .pipe(map(orders => orders.filter(order => order.state < 2)))
            .subscribe(orders => (this.orders = orders)),
        ),
      )
      .subscribe(user => (this.user = user));
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.uns.unsubscribe()
  }
}
