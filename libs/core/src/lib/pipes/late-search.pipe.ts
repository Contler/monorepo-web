import { Pipe, PipeTransform } from '@angular/core';
import { LateCheckUser } from '@contler/models';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'lateSearch',
})
export class LateSearchPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: LateCheckUser[], search: string): any {
    return !!search
      ? value.filter(item => {
          const textLow = search.toLowerCase();
          const status = item.status === 0 ? 'Creada' : item.status === 1 ? 'No aceptada' : 'Aceptada';
          return (
            item.user.room.name.toLowerCase().includes(textLow) ||
            this.datePipe
              .transform(item.date, 'shortTime')!
              .toLowerCase()
              .includes(textLow) ||
            status.toLowerCase().includes(textLow) ||
            item.user.name.toLowerCase().includes(textLow) ||
            item.user.lastName.toLowerCase().includes(textLow)
          );
        })
      : value;
  }
}
