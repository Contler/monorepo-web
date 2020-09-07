import { Component, Input } from '@angular/core';

@Component({
  selector: 'contler-icon',
  template: ` <i [class]="key"></i> `,
  styles: [],
})
export class IconComponent {
  @Input() key: string;
}
