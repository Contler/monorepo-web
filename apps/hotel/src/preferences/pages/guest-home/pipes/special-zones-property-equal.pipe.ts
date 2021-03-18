import { Pipe, PipeTransform } from '@angular/core';
import { SpecialZoneEntity, SpecialZoneHotelEntity } from '@contler/entity';

@Pipe({
  name: 'ArrFilterPropertyEqual',
})
export class ArrFilterPropertyEqualPipe implements PipeTransform {
  transform(arr: unknown[], property: string, condition: boolean): unknown[] {
    if (!arr) {
      return [];
    }
    return arr.filter((element) => {
      if (element.hasOwnProperty(property)) {
        return element[property] === condition;
      }
      return false;
    });
  }
}
