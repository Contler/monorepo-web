import { Pipe, PipeTransform } from '@angular/core';
import { BookingEntity } from '@contler/entity';
import { RESERVATION_CONSTANTS } from '../page/my-reservations/my-reservations.constants';

@Pipe({
  name: 'filterReservation',
})
export class FilterReservationPipe implements PipeTransform {
  constants = RESERVATION_CONSTANTS;

  transform(value: BookingEntity[], data: string | number): BookingEntity[] {
    return data === this.constants.all ? value : value.filter((v) => v?.schedule?.reservation?.id === data);
  }
}
