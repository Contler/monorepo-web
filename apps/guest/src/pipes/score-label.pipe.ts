import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scoreLabel',
})
export class ScoreLabelPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'Muy malo 1/5';
      case 2:
        return 'Malo 2/5';
      case 3:
        return 'Regular 3/5';
      case 4:
        return 'Bueno 4/5';
      case 5:
        return 'Excelente 5/5';
      default:
        return '-';
    }
  }
}
