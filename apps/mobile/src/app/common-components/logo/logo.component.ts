import { Component, Input } from '@angular/core';

@Component({
  selector: 'contler-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Input() src: string;

  constructor() {}
}
