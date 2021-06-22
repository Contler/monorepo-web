import { Pipe, PipeTransform } from '@angular/core';
import { RequestEntity } from '@contler/entity';
import { RequestMessage } from '@contler/dynamic-services';

@Pipe({
  name: 'requestTime',
})
export class RequestTimePipe implements PipeTransform {
  transform(value: RequestMessage): string | null {
    if (!value.createAt || !value.completeAt) {
      return null;
    }
    const difference = Math.floor(
      (new Date(value.completeAt).getTime() - new Date(value.createAt).getTime()) / 1000 / 60,
    );
    if (difference < 60) {
      return `${this.parseNumber(difference)} min`;
    } else {
      const hours = Math.floor(difference / 60);
      const minutes = difference % 60;
      return `${this.parseNumber(hours)} hrs y ${this.parseNumber(minutes)} min`;
    }
  }

  private parseNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
