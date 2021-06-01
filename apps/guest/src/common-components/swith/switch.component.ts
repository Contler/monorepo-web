import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SWITCH_CONSTANTS } from './swith.constants';

@Component({
  selector: 'contler-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent implements OnInit {
  @Output() value = new EventEmitter<boolean>();
  readonly constants = SWITCH_CONSTANTS;
  complete = false;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.complete = !this.complete;
    this.value.emit(this.complete);
  }
}
