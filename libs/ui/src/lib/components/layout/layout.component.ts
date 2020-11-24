import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'contler-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}
}
