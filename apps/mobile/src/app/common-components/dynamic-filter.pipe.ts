import { Pipe, PipeTransform } from '@angular/core';
import { DynamicRequest, DynamicRequestStatus } from '@contler/dynamic-services';

@Pipe({
  name: 'dynamicFilter',
})
export class DynamicFilterPipe implements PipeTransform {
  transform(value: DynamicRequest[], status: DynamicRequestStatus): DynamicRequest[] {
    return status === DynamicRequestStatus.ALL ? value : value.filter((item) => item.status === status);
  }
}
