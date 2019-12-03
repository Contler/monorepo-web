import { Component, OnInit } from '@angular/core';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Zone, MapZone, ZoneCategory } from '@contler/core/models';
import { CATEGORY_ZONE, ICONS } from '@contler/core/const';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditZoneComponent } from 'hotel/zone/components/modal-edit-zone/modal-edit-zone.component';

@Component({
  selector: 'contler-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
})
export class ZoneComponent {
  zoneGroup: FormGroup;
  load = false;
  categoryZone = CATEGORY_ZONE;
  icons = ICONS;
  $zones: Observable<Zone[]>;

  constructor(private zoneService: ZoneService, private formBuild: FormBuilder, public dialog: MatDialog) {
    this.zoneGroup = formBuild.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      icon: [''],
      principal: [false],
    });
    this.$zones = this.zoneService.getZones();
  }



  saveZone() {
    this.load = true;
    const { name, category, icon, principal } = this.zoneGroup.value;
    this.zoneService.saveZone(name, principal, icon, category).subscribe(() => {
      this.load = false;
      this.zoneGroup.reset({ name: '', category: '', icon: '', principal: false });
    });
  }

  editZone(zone: Zone) {
    this.dialog.open(ModalEditZoneComponent, {width: '600px', data: zone})
  }

  deleteZone(zone: Zone) {
    this.zoneService.deleteZone(zone);
  }
}
