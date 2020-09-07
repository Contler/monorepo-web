import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { ZoneEntity } from '@contler/entity';
import { IconsService } from '@contler/ui';
import { IconModel } from '@contler/models/icon.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-modal-edit-zone',
  templateUrl: './modal-edit-zone.component.html',
  styleUrls: ['./modal-edit-zone.component.scss'],
})
export class ModalEditZoneComponent implements OnInit {
  load = false;

  zoneGroup: FormGroup;
  $icons: Observable<IconModel[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ZoneEntity,
    public dialogRef: MatDialogRef<ModalEditZoneComponent>,
    private zoneService: ZoneService,
    private messagesService: MessagesService,
    formBuild: FormBuilder,
    iconService: IconsService,
  ) {
    this.zoneGroup = formBuild.group({
      name: [data.name, Validators.required],
      icon: [data.icon],
      admitOrder: [data.admitOrders],
    });
    this.$icons = iconService.$icons;
  }

  save() {
    this.load = true;
    const { name, icon, admitOrder } = this.zoneGroup.value;
    this.data.name = name;
    this.data.icon = icon;
    this.data.admitOrders = admitOrder;
    this.zoneService.updateZone(this.data).subscribe(
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
