import { Pipe, PipeTransform } from '@angular/core';
import { BookingEntity, ZoneEntity } from '@contler/entity';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';

@Pipe({
  name: 'zoneBook',
})
export class ZoneBookPipe implements PipeTransform {
  transform(value: BookingEntity[], zone: ZoneReserveEntity): unknown {
    return zone ? value.filter((book) => book.schedule.reservation.id === zone.id) : value;
  }
}
