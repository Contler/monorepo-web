import { Pipe, PipeTransform } from '@angular/core';
import { BookingEntity } from '@contler/entity';
import { RESERVATION_CONSTANTS } from '../page/my-reservations/my-reservations.constants';
import { FilterListData } from 'guest/common-components/filter-list/filter-list.component';

@Pipe({
  name: 'filterReservation',
})
export class FilterReservationPipe implements PipeTransform {
  constants = RESERVATION_CONSTANTS;

  transform(value: BookingEntity[], data: FilterListData<string | number>[]): BookingEntity[] {
    const valid = !data || data.find((d) => d.value === this.constants.all).select;
    return valid
      ? value
      : value.filter((v) => data.find((d) => d.value === v?.schedule?.reservation?.id).select);
  }
}
