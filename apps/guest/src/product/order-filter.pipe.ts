import { Pipe, PipeTransform } from '@angular/core';
import { OrderEntity, ProductOrderEntity } from '@contler/entity';
import { FilterListData } from '../common-components/filter-list/filter-list.component';
import { ORDER_CONSTANTS } from './product.constants';

@Pipe({
  name: 'orderFilter',
})
export class OrderFilterPipe implements PipeTransform {
  constants = ORDER_CONSTANTS;
  transform(value: OrderEntity[], listFilter: FilterListData<string>[]): OrderEntity[] {
    return !listFilter || !value || listFilter.find((f) => f.value === this.constants.all).select
      ? value
      : value.filter(({ productsOrder }) => this.checkProduct(productsOrder, listFilter));
  }

  checkProduct(product: ProductOrderEntity[], listFilter: FilterListData<string>[]) {
    for (const prod of product) {
      if (listFilter.find((f) => f.value === prod.product.restaurant.uid).select) {
        return true;
      }
    }
    return false;
  }
}
