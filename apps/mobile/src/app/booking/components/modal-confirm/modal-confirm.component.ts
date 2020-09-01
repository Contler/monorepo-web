import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'contler-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ModalConfirmComponent>, public generalService: GeneralService) {}

  ngOnInit() {}
}
