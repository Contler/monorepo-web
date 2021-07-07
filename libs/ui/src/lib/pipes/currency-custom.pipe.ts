import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency } from '@angular/common';

@Pipe({
  name: 'currencyCustom',
})
export class CurrencyCustomPipe implements PipeTransform {
  public transform(value: number | string, currency: string): string {
    const val = Number(value);
    return formatCurrency(val, 'en-US', `${currency} `, currency, '1.0-0');
  }
}
