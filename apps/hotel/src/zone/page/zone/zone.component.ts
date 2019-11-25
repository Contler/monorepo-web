import { Component, OnInit } from '@angular/core';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Zone, MapZone, ZoneCategory } from '@contler/core/models';
import { ICONS } from '@contler/core/const';

@Component({
  selector: 'contler-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
})
export class ZoneComponent implements OnInit {
  zoneGroup: FormGroup;
  load = false;
  $categoryZone: Observable<Zone[]> | undefined;
  $mapZone: Observable<MapZone> | undefined;
  icons = ICONS;

  constructor(private zoneService: ZoneService, private formBuild: FormBuilder) {
    this.zoneGroup = formBuild.group({
      name: ['', Validators.required],
      category: [''],
      icon: [''],
      principal: [false],
    });
  }

  ngOnInit(): void {
    const $zone = this.zoneService.getZones();
    this.$categoryZone = $zone.pipe(map(zones => zones.filter(zone => !zone.parentZone)));
    this. $mapZone = this.zoneService.getMapZone($zone)
  }

  saveZone() {
    this.load = true;
    const { name, category, icon, principal } = this.zoneGroup.value;
    this.zoneService.saveZone(name, principal, icon, category).subscribe(() => {
      this.load = false;
      this.zoneGroup.reset({ name: '', category: '', icon: '', principal: false });
    });
  }

  deleteZone(zone: ZoneCategory | Zone) {
    this.zoneService.deleteZone(zone);
  }
}
