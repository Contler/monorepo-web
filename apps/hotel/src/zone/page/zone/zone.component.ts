import { Component } from '@angular/core';
import { ZoneService } from '@contler/hotel/zone/services/zone.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditZoneComponent } from '@contler/hotel/zone/components/modal-edit-zone/modal-edit-zone.component';
import { MessagesService } from '@contler/hotel/services/messages/messages.service';
import { CategoryEntity, ZoneEntity } from '@contler/entity';
import { IconsService } from '@contler/ui';
import { IconModel } from '@contler/models/icon.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'contler-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
})
export class ZoneComponent {
  zoneGroup: FormGroup;
  load = false;
  maxPrincipalZone = 0;
  zones: ZoneEntity[] = [];
  categoryZone: Observable<CategoryEntity[]>;
  $icons: Observable<IconModel[]>;

  constructor(
    private zoneService: ZoneService,
    private formBuild: FormBuilder,
    public dialog: MatDialog,
    private messagesService: MessagesService,
    private translate: TranslateService,
    iconsService: IconsService,
  ) {
    this.categoryZone = this.zoneService.getCategories();
    this.zoneGroup = formBuild.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      icon: [''],
      principal: [false],
    });
    this.zoneService.getZones().subscribe((zones) => {
      this.zones = zones;
      this.setMaxPrincipalZone();
    });
    this.$icons = iconsService.$icons;
  }

  saveZone() {
    this.load = true;
    const { name, category, icon, principal } = this.zoneGroup.value;
    this.zoneService.saveZone(name, principal, icon, category).subscribe(
      (zone) => {
        this.zones = [...this.zones, zone];
        this.load = false;
        this.messagesService.showToastMessage(name);
        this.zoneGroup.reset({ name: '', category: '', icon: '', principal: false });
      },
      () => {
        this.load = false;
        this.messagesService.showServerError();
      },
    );
  }

  setMaxPrincipalZone() {
    this.maxPrincipalZone = this.zones.filter((z) => z.principal === true).length;
  }

  editZone(zone: ZoneEntity) {
    this.dialog
      .open(ModalEditZoneComponent, { width: '600px', data: zone })
      .afterClosed()
      .subscribe(() => this.setMaxPrincipalZone());
  }

  deleteZone(zone: ZoneEntity) {
    this.zoneService.deleteZone(zone).subscribe(
      () => {
        this.zones = this.zones.filter((actualZone) => actualZone.uid !== zone.uid);
        this.translate
          .get('zone.deleteSusses')
          .subscribe((msg) => this.messagesService.showToastMessage(msg));
      },
      (err) => {
        if (err.error.statusCode === 400) {
          this.messagesService.showServerError(err, err.error.message);
        } else {
          this.messagesService.showServerError();
        }
      },
    );
  }
}
