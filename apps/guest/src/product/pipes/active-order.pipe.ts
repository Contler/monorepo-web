import { Pipe, PipeTransform } from '@angular/core';
import { OrderEntity } from '@contler/entity';

@Pipe({
  name: 'activeOrder',
})
export class ActiveOrderPipe implements PipeTransform {
  transform(orders: OrderEntity[], active: boolean): any {
    return orders ? orders.filter((order) => (active ? order.state !== 2 : order.state === 2)) : orders;
  }
}
