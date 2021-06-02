import { Pipe, PipeTransform } from '@angular/core';
import { RequestEntity } from '@contler/entity';
import { FilterListData } from '../../common-components/filter-list/filter-list.component';
import { MY_REQUEST_CONSTANTS } from '../my-request.constants';

@Pipe({
  name: 'filterRequest',
})
export class FilterRequestPipe implements PipeTransform {
  readonly constants = MY_REQUEST_CONSTANTS;
  transform(value: RequestEntity[], type: FilterListData<any>[]): RequestEntity[] {
    const valid = type.find((f) => f.value === this.constants.options.all)?.select || !value;
    return valid
      ? value
      : value.filter((v) => {
          if (v.special) {
            return type.find((f) => f.value === this.constants.options.specials).select;
          } else {
            return type.find((f) => f.value === this.constants.options.immediate).select;
          }
        });
  }
}
