import { Component, ViewChild } from '@angular/core';
import { HotelEntity, OrderEntity } from '@contler/entity';
import { first, switchMap, take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@contler/hotel/services/auth.service';
import { HotelService, ProductService } from '@contler/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UpdateInformationalMessageComponent } from '@contler/hotel/order/modals/update-informational-message/update-informational-message.component';
import { TranslateService as transDynamic } from '@contler/dynamic-translate';
import { getLan } from '@contler/const';
import { MessagesService } from '@contler/hotel/services/messages/messages.service';

@Component({
  selector: 'contler-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
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

  constructor(
    private auth: AuthService,
    private productService: ProductService,
    private router: Router,
    private matDialog: MatDialog,
    private hotelService: HotelService,
    private dynTranslate: transDynamic,
    private messagesService: MessagesService,
  ) {
    this.getAllOrders();
    this.dataSource.paginator = this.paginator!;
  }

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

  public async updateMessageInformational(): Promise<void> {
    const hotel = await this.auth.$hotel.pipe(first()).toPromise();
    const updateInformationalMessage = this.matDialog.open(UpdateInformationalMessageComponent, {
      width: '500px',
      height: '300px',
      data: hotel.orderText,
    });
    updateInformationalMessage.afterClosed().subscribe(async (orderText) => {
      if (typeof orderText === 'string') {
        const loader = this.messagesService.showLoader();
        if (orderText) {
          const [actualLan, languages] = getLan();
          const orderTextOld = hotel.orderText;
          try {
            const translateOrderText = await this.dynTranslate
              .generateUrl({
                actualLan,
                languages,
                hotel: hotel.uid,
                mgs: orderText,
                url: `orderText/name`,
              })
              .toPromise();
            hotel.orderText = translateOrderText.key;
            await this.hotelService.updateHotel(hotel).pipe(first()).toPromise();
            if (orderTextOld) {
              await this.dynTranslate.removeTranslate(orderTextOld, hotel.uid);
            }
            this.messagesService.closeLoader(loader);
          } catch (err) {
            this.messagesService.closeLoader(loader);
            this.messagesService.showServerError();
          }
        } else {
          try {
            await this.removeOldTextOrder(hotel);
            this.messagesService.closeLoader(loader);
          } catch (err) {
            this.messagesService.closeLoader(loader);
            this.messagesService.showServerError();
          }
        }
      }
    });
  }

  private async removeOldTextOrder(hotel: HotelEntity): Promise<void> {
    const orderTextOld = hotel.orderText;
    if (orderTextOld) {
      try {
        hotel.orderText = null;
        await this.hotelService.updateHotel(hotel).pipe(first()).toPromise();
        await this.dynTranslate.removeTranslate(orderTextOld, hotel.uid);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject();
      }
    }
  }
}
