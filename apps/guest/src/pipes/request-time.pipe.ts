import { Pipe, PipeTransform } from '@angular/core';
import { RequestEntity } from '@contler/entity';

@Pipe({
  name: "requestTime"
})
export class RequestTimePipe implements PipeTransform {
  transform(value: RequestEntity): string | null {
    if (!value.createAt || !value.finishAt) {
      return null;
    }
    const difference = Math.floor((new Date(value.finishAt).getTime() - new Date(value.createAt).getTime()) / 1000 / 60);
    if (difference < 60) {
      return `${this.parseNumber(difference)} min`;
    } else {
      const hours = Math.floor(difference / 60);
      const minutes = difference % 60;
      return `${this.parseNumber(hours)} hrs y ${this.parseNumber(minutes)} min`;
    }
  }

  private parseNumber(num: number): string{
    return num < 10 ? `0${num}` : `${num}`;
  }
}
