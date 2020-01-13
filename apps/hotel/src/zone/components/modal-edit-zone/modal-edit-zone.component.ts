import { Component, Inject, OnInit } from '@angular/core';
import { ICONS } from '@contler/const';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Zone } from '@contler/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { MessagesService } from 'hotel/services/messages/messages.service';

@Component({
  selector: 'contler-modal-edit-zone',
  templateUrl: './modal-edit-zone.component.html',
  styleUrls: ['./modal-edit-zone.component.scss'],
})
export class ModalEditZoneComponent implements OnInit {
  icons = ICONS;
  load = false;

  zoneGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Zone,
    public dialogRef: MatDialogRef<ModalEditZoneComponent>,
    private zoneService: ZoneService,
    private messagesService: MessagesService,
    formBuild: FormBuilder,
  ) {
    this.zoneGroup = formBuild.group({
      name: [data.name, Validators.required],
      icon: [data.icon],
    });
  }

  save() {
    this.load = true;
    const { name, icon } = this.zoneGroup.value;
    this.data.name = name;
    this.data.icon = icon;
    this.zoneService.updateZone(this.data).then(
      () => {
        this.load = false;
        this.dialogRef.close();
        this.messagesService.showToastMessage('Zona actualizada exitosamente');
      },
      () => {
        this.load = false;
        this.messagesService.showServerError();
      },
    );
  }

  ngOnInit() {}
}
