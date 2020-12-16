import { Pipe, PipeTransform } from '@angular/core';
import { BookingEntity } from '@contler/entity';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';

@Pipe({
  name: 'zoneBook',
})
export class ZoneBookPipe implements PipeTransform {
  transform(value: BookingEntity[], zone: ZoneReserveEntity): BookingEntity[] {
    return zone ? value.filter((book) => book.schedule.reservation.id === zone.id) : value;
  }
}
