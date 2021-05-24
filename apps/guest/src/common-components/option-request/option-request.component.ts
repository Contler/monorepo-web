import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'contler-option-request',
  templateUrl: './option-request.component.html',
  styleUrls: ['./option-request.component.scss'],
})
export class OptionRequestComponent implements OnInit {
  @Input() link: string;
  @Input() name: string;
  @Input() icon: string;
  @Input() custom = false;

  isSelect = false;

  constructor() {}

  ngOnInit(): void {}

  select() {
    this.isSelect = true;
  }
}
