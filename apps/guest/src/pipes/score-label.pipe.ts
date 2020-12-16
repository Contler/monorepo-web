import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scoreLabel',
})
export class ScoreLabelPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'scoreLabel.veryBad';
      case 2:
        return 'scoreLabel.bad';
      case 3:
        return 'scoreLabelfair';
      case 4:
        return 'scoreLabel.good';
      case 5:
        return 'scoreLabel.excellent';
      default:
        return '-';
    }
  }
}
