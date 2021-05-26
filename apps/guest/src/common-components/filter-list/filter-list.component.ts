import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'contler-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
})
export class FilterListComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<FilterListComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public listData: { title: string; list: { select: boolean; value: any }[] },
  ) {}

  ngOnInit(): void {}

  close() {
    this.bottomSheetRef.dismiss(this.listData.list);
  }
}
