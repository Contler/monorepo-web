import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency } from '@angular/common';
import { Store } from '@ngrx/store';
import { State } from 'guest/app/reducers';
import { selectUserState } from 'guest/app/reducers/user/user.selectors';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Pipe({
  name: 'currencyCustom',
})
export class CurrencyCustomPipe implements PipeTransform {
  constructor(private store: Store<State>) {}

  public transform(value: number | string, digitsInfo: string = '1.0-0'): Observable<string> {
    const val = Number(value);
    return this.store.pipe(
      selectUserState,
      first(),
      map((user) => formatCurrency(val, 'en-US', user.hotel.currency + ' ', user.hotel.currency, digitsInfo)),
    );
  }
}
