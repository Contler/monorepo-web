import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SpecialZoneHotelEntity, ZoneEntity } from '@contler/entity';

@Component({
  selector: 'contler-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss'],
})
export class ZoneListComponent {
  @Input() $zones: Observable<ZoneEntity[]> | undefined;
  @Input() zonesSelected: { [key: string]: boolean } = {};

  @Input() specialZones: SpecialZoneHotelEntity[];
  @Output() specialZonesChange = new EventEmitter();

  @Output() selected = new EventEmitter<{ [key: string]: boolean }>();

  select(event: MatCheckboxChange, zone: ZoneEntity) {
    if (event.checked) {
      this.zonesSelected[zone.uid] = true;
    } else {
      delete this.zonesSelected[zone.uid];
    }
    this.selected.emit(this.zonesSelected);
  }
}
