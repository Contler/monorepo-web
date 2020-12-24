import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'ctrTranslate',
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private value: string;
  private subscription: Subscription;

  constructor(private translate: TranslateService, private _ref: ChangeDetectorRef) {}

  getValueDic(dic: any, keys: string[]) {
    if (keys.length === 1) {
      return dic[keys[0]];
    } else {
      const key = keys.shift();
      const newDic = dic[key];
      return !!newDic ? this.getValueDic(newDic, keys) : null;
    }
  }

  transform(key: string) {
    if (!this.subscription) {
      this.subscription = this.translate.changeDic.subscribe(({ dic, lan }) => {
        const keys = key.split('/');
        const dicLan = this.getValueDic(dic, keys);
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
