import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';
import { Subscription } from 'rxjs';
import { getDicValue } from './utils/getDicValue';

@Pipe({
  name: 'ctrTranslate',
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private value: string;
  private subscription: Subscription;

  constructor(private translate: TranslateService, private _ref: ChangeDetectorRef) {}

  transform(key: string) {
    if (!this.subscription && key) {
      this.subscription = this.translate.changeDic.subscribe(({ dic, lan }) => {
        const keys = key.split('/');
        const dicLan = getDicValue(dic, keys);
        this.value = !!dicLan ? dicLan[lan.lang] || key : key;
        this._ref.markForCheck();
      });
    }
    return this.value;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
