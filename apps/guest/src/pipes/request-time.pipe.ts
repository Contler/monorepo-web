import { Pipe, PipeTransform } from "@angular/core";
import { Request } from "@contler/core/models";

@Pipe({
  name: "requestTime"
})
export class RequestTimePipe implements PipeTransform {
  transform(value: Request): string | null {
    if (!value.created_at || !value.finished_at) {
      return null;
    }
    const difference = Math.floor((value.finished_at - value.created_at) / 1000 / 60);
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
