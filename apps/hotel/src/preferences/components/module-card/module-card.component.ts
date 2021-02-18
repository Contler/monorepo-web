import { Component, OnInit, Input } from '@angular/core';
import { Module } from 'hotel/preferences/pages/module-list/models/module';

@Component({
  selector: 'contler-module-card',
  templateUrl: './module-card.component.html',
  styleUrls: ['./module-card.component.scss'],
})
export class ModuleCardComponent implements OnInit {
  public check = true;
  @Input() module: Module;

  constructor() {}

  ngOnInit(): void {}
}
