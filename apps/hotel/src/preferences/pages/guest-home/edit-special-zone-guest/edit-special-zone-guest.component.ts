import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpecialZoneGuest } from '@contler/models';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'contler-edit-special-zone-guest',
  templateUrl: './edit-special-zone-guest.component.html',
  styleUrls: ['./edit-special-zone-guest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSpecialZoneGuestComponent implements OnInit {
  public specialZoneNameForm: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SpecialZoneGuest,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.changeDetectorRef.markForCheck();
    this.specialZoneNameForm = new FormControl('', Validators.required);
  }
}
