import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WakeUpEntity } from '@contler/entity';

@Component({
  selector: 'contler-wake',
  templateUrl: './wake.component.html',
  styleUrls: ['./wake.component.scss'],
})
export class WakeComponent implements OnInit {
  @Input() wake: WakeUpEntity | undefined;

  @Output() clickSlide = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
