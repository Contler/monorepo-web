import { Component, Input } from '@angular/core';
import { ImmediateOptionLink } from '@contler/models';

@Component({
  selector: 'contler-cleaning-item',
  templateUrl: './cleaning-item.component.html',
  styleUrls: ['./cleaning-item.component.scss'],
})
export class CleaningItemComponent {
  @Input() option: ImmediateOptionLink;
  @Input() isEven: boolean;
}
