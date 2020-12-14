import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderEntity } from '@contler/entity';
import { switchMap, take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'hotel/services/auth.service';
import { ProductService } from '@contler/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'contler-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  readonly filters = [
    { name: 'order.all', value: 0 },
    { name: 'order.complete', value: 1 },
    { name: 'order.pending', value: 2 },
  ];
  filter = 0;
  dataSource = new MatTableDataSource<OrderEntity>();
  displayedColumns: string[] = ['id', 'guest', 'zone', 'value', 'time', 'state', 'actions'];
  private orders: OrderEntity[] = [];

  constructor(private auth: AuthService, private productService: ProductService, private router: Router) {
    this.getAllOrders();
    this.dataSource.paginator = this.paginator!;
  }

  ngOnInit() {}

  changeOrderView(event: number) {
    if (event === 0) {
      this.getAllOrders();
    } else if (event === 1) {
      this.getCompleteOrder();
    } else {
      this.getInCompleteOrder();
    }
  }

  textFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllOrders() {
    this.auth.$employer
      .pipe(
        take(1),
        switchMap((user) => this.productService.getOrdersByHotel(user.hotel.uid)),
      )
      .subscribe((orders) => {
        this.orders = orders;
        this.dataSource.data = orders;
      });
  }

  getCompleteOrder() {
    this.dataSource.data = this.orders.filter((item) => {
      return item.state === 1;
    });
  }

  getInCompleteOrder() {
    this.dataSource.data = this.orders.filter((item) => {
      return item.state !== 1;
    });
  }

  orderProductsTotalValue(order: OrderEntity) {
    let totalOrder = 0;
    order.productsOrder.forEach((elm) => {
      totalOrder += elm.quantity * elm.product.value;
    });
    return totalOrder;
  }

  goToOrder(order: OrderEntity) {
    this.router.navigate(['home/order', order.id]);
  }
}
