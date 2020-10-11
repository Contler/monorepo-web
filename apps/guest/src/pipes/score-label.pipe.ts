import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scoreLabel',
})
export class ScoreLabelPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'Very bad 1/5';
      case 2:
        return 'Bad 2/5';
      case 3:
        return 'Fair 3/5';
      case 4:
        return 'Good 4/5';
      case 5:
        return 'Excellent 5/5';
      default:
        return '-';
    }
  }
}
