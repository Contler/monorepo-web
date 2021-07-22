import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ArrFilterPropertyEqual',
  pure: false,
})
export class ArrFilterPropertyEqualPipe implements PipeTransform {
  transform<T>(arr: T[], property: string, condition: boolean): T[] {
    if (!arr) {
      return [];
    }
    return arr.filter((element) =>
      element.hasOwnProperty(property) ? element[property] === condition : false,
    );
  }
}
