import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'contler-update-informational-message',
  templateUrl: './update-informational-message.component.html',
  styleUrls: ['./update-informational-message.component.scss'],
})
export class UpdateInformationalMessageComponent implements OnInit {
  orderTextForm: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit(): void {
    this.orderTextForm = new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    );
  }
}
