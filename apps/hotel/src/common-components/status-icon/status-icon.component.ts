import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'contler-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss'],
})
export class StatusIconComponent implements OnInit {
  @Input() status = false;

  constructor() {}

  ngOnInit() {}
}
