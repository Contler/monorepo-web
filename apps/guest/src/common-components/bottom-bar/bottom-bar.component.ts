import { Component, OnInit } from '@angular/core';
import { BOTTOM_CONSTANTS } from './bottom-bar.constants';

@Component({
  selector: 'contler-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
})
export class BottomBarComponent implements OnInit {
  constants = BOTTOM_CONSTANTS;

  constructor() {}

  ngOnInit(): void {}
}
