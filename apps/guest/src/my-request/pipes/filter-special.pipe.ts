import { Pipe, PipeTransform } from '@angular/core';
import { DynamicRequest, NAME_MODULES } from '@contler/dynamic-services';
import { MY_REQUEST_CONSTANTS } from '../my-request.constants';

@Pipe({
  name: 'filterSpecial',
})
export class FilterSpecialPipe implements PipeTransform {
  readonly constants = MY_REQUEST_CONSTANTS;
  readonly nameModule = NAME_MODULES;
  transform(value: DynamicRequest[], type: string): DynamicRequest[] {
    return type === this.constants.all
      ? value
      : value.filter((data) => this.nameModule[data.service] === type);
  }
}
