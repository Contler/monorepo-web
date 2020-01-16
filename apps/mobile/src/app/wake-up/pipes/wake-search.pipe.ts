import { Pipe, PipeTransform } from '@angular/core';
import { WakeUpEntity } from '@contler/entity';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'wakeSearch',
})
export class WakeSearchPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(value: WakeUpEntity[], text: string): any {
    if (value && value.length > 0) {
      return value.filter(wake => {
        const textLow = text.toLowerCase();
        const nameGuest = `${wake.guest.name} ${wake.guest.lastName}`.toLowerCase();
        const nameRome = wake.room.name.toLowerCase();
        const time = this.datePipe.transform(wake.competeDate, 'shortTime')!.toLowerCase();
        return nameGuest.includes(textLow) || nameRome.includes(textLow) || time.includes(textLow);
      });
    } else {
      return null;
    }
  }
}
