import { Component, Input } from '@angular/core';
import { ImmediateOptionLink } from '@contler/models';

@Component({
  selector: 'contler-reception-item',
  templateUrl: './reception-item.component.html',
  styleUrls: ['./reception-item.component.scss'],
})
export class ReceptionItemComponent {
  @Input() option: ImmediateOptionLink;
  @Input() isEven: boolean;
}
