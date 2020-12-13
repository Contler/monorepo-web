import { Component, Inject, OnInit } from '@angular/core';
import { OrderEntity } from '@contler/entity';
import { ProductService, ReservationService } from '@contler/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TEXT_RATE } from '../const/qualify.const';

@Component({
  selector: 'contler-modal-orders-quialify',
  templateUrl: './modal-orders-quialify.component.html',
  styleUrls: ['./modal-orders-quialify.component.scss'],
})
export class ModalOrdersQuialifyComponent implements OnInit {
  value: number | undefined;
  readonly textRate = TEXT_RATE;
  load = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OrderEntity,
    private dialogRef: MatDialogRef<ModalOrdersQuialifyComponent>,
    private productService: ProductService,
  ) {}

  ngOnInit() {}

  selectStart(value: any) {
    this.value = value.newValue;
  }

  close() {
    this.load = true;
    this.data.qualification = this.value!;
    this.productService.updateOrder(this.data).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
