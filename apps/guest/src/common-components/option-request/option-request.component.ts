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

  blur() {
    this.isSelect = false;
  }

  transformText(text: string) {
    if (!text) {
      return '';
    }
    const data = text.split(' ');
    data[0] = data[0].replace(/[a-zA-ZÀ-ÖØ-öø-ÿ]/, function (m) {
      return m.toUpperCase();
    });
    return data.join(' ');
  }
}
