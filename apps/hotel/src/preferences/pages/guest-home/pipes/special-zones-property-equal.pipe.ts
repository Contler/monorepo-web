import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ArrFilterPropertyEqual',
})
export class ArrFilterPropertyEqualPipe implements PipeTransform {
  transform(arr: unknown[], property: string, condition: boolean): unknown[] {
    if (!arr) {
      return [];
    }
    return arr.filter((element) =>
      element.hasOwnProperty(property) ? element[property] === condition : false,
    );
  }
}
