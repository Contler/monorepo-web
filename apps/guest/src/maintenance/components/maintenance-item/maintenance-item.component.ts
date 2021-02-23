import { Component, Input } from '@angular/core';
import { ImmediateOptionLink } from '@contler/models';

@Component({
  selector: 'contler-maintenance-item',
  templateUrl: './maintenance-item.component.html',
  styleUrls: ['./maintenance-item.component.scss'],
})
export class MaintenanceItemComponent {
  @Input() option: ImmediateOptionLink;
  @Input() isEven: boolean;
}
