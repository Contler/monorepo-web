import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { ZoneEntity } from '@contler/entity';
import { IconsService } from '@contler/ui';
import { IconModel } from '@contler/models/icon.model';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TranslateService as DynamicService } from '@contler/dynamic-translate';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'contler-modal-edit-zone',
  templateUrl: './modal-edit-zone.component.html',
  styleUrls: ['./modal-edit-zone.component.scss'],
})
export class ModalEditZoneComponent implements OnInit {
  load = false;

  zoneGroup: FormGroup;
  maxPrincipalZone = 0;
  $icons: Observable<IconModel[]>;
  zones: ZoneEntity[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ZoneEntity,
    public dialogRef: MatDialogRef<ModalEditZoneComponent>,
    private zoneService: ZoneService,
    private messagesService: MessagesService,
    private translate: TranslateService,
    private dynamicTrs: DynamicService,
    formBuild: FormBuilder,
    iconService: IconsService,
  ) {
    this.zoneGroup = formBuild.group({
      name: [this.dynamicTrs.getInstant(data.name), Validators.required],
      icon: [data.icon],
      admitOrder: [data.admitOrders],
      principal: [data.principal],
    });
    this.$icons = iconService.$icons;
    this.zoneService.getZones().subscribe((zones) => {
      this.maxPrincipalZone = zones.filter((z) => z.principal === true).length;
    });
  }

  ngOnInit(): void {
    this.getPrincipal.valueChanges.subscribe((principal) => {
      if (principal) {
        this.maxPrincipalZone++;
      } else {
        this.maxPrincipalZone--;
      }
    });
  }

  async save() {
    this.load = true;
    const { name, icon, admitOrder, principal } = this.zoneGroup.value;
    this.data.icon = icon;
    this.data.admitOrders = admitOrder;

    if (this.maxPrincipalZone > 4) {
      this.translate
        .get(['zone.errorUpdate', 'global.CLOSE'])
        .subscribe((data) =>
          this.messagesService.showToastMessage(data['zone.errorUpdate'], data['global.CLOSE'], 5000),
        );

      this.dialogRef.close();
    } else {
      this.data.principal = principal;

      this.dynamicTrs
        .updateTranslate(this.data.name, name, this.data.hotel.uid)
        .pipe(switchMap(() => this.zoneService.updateZone(this.data)))
        .subscribe(
          () => {
            this.load = false;
            this.dialogRef.close();
            this.translate
              .get(['zone.updateSuccess', 'global.CLOSE'])
              .subscribe((msg) =>
                this.messagesService.showToastMessage(msg['zone.updateSuccess'], msg['global.CLOSE']),
              );
          },
          () => {
            this.load = false;
            this.messagesService.showServerError();
          },
        );
    }
  }

  get getPrincipal() {
    return this.zoneGroup.get('principal')!;
  }
}
