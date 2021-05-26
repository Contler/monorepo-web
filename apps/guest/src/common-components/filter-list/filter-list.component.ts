import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'contler-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
})
export class FilterListComponent implements OnInit {
  list: { select: boolean; value: any }[] = [];
  constructor(
    private bottomSheetRef: MatBottomSheetRef<FilterListComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public listData: { title: string; list: { select: boolean; value: any }[] },
  ) {

  }

  ngOnInit(): void {
    this.list = [...this.listData.list].map(data => ({...data}))
  }


  close() {
    this.bottomSheetRef.dismiss(this.list);
  }
}
