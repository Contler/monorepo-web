import { Pipe, PipeTransform } from '@angular/core';
import { MoneyValue } from '../components/money/money.component';

@Pipe({
  name: 'getLink',
})
export class GetLinkPipe implements PipeTransform {
  transform(value: string | Date | MoneyValue, getLink: boolean): string {
    if (!value) {
      return '';
    }
    const valArr = value.toString().split('|');
    if (getLink) {
      if (valArr.length === 2) {
        return valArr[1];
      }
      return '';
    }
    if (valArr.length === 2) {
      return valArr[0];
    }
    return '';
  }
}
