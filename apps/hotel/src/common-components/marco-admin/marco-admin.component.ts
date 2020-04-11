import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'contler-marco-admin',
  templateUrl: './marco-admin.component.html',
  styleUrls: ['./marco-admin.component.scss'],
})
export class MarcoAdminComponent implements OnInit {
  @Input() title = ''
  constructor() { }

  ngOnInit() {
  }

}
