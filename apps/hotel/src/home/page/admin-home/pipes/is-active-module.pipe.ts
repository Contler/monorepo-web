import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isActiveModule',
})
export class IsActiveModulePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
