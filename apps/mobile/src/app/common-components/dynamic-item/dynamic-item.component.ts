import { Component, Input, OnInit } from '@angular/core';
import { DynamicRequest } from '@contler/dynamic-services';
import { MatDialog } from '@angular/material/dialog';
import { DynamicResultComponent } from '../dynamicresult/dynamic-result.component';

@Component({
  selector: 'contler-dynamic-item',
  templateUrl: './dynamic-item.component.html',
  styleUrls: ['./dynamic-item.component.scss'],
})
export class DynamicItemComponent implements OnInit {
  @Input() item: DynamicRequest;
  @Input() isReady: boolean;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openModal() {
    if (this.isReady) {
      this.dialog.open(DynamicResultComponent, {
        data: this.item,
      });
    }
  }

  getDate(data: any) {
    return new Date(data['seconds'] * 1000);
  }
}
