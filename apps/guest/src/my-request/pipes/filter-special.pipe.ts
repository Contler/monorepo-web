import { Pipe, PipeTransform } from '@angular/core';
import { DynamicRequest, NAME_MODULES } from '@contler/dynamic-services';
import { MY_REQUEST_CONSTANTS } from '../my-request.constants';

@Pipe({
  name: 'filterSpecial',
})
export class FilterSpecialPipe implements PipeTransform {
  readonly constants = MY_REQUEST_CONSTANTS;
  readonly nameModule = NAME_MODULES;
  transform(value: DynamicRequest[], type: { select: boolean; value: any }[]): DynamicRequest[] {
    const valid = type.find((f) => f.value === this.constants.options.all)?.select || !value;
    return valid
      ? value
      : value.filter((data) => {
          return type.find((f) => {
            return f.value === this.nameModule[data.service];
          })?.select;
        });
  }
}
