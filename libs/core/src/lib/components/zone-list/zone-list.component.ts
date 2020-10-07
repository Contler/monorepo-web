import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ZoneEntity } from '@contler/entity';

@Component({
  selector: 'contler-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss'],
})
export class ZoneListComponent {
  @Input() $zones: Observable<ZoneEntity[]> | undefined;
  @Input() zonesSelected: { [key: string]: boolean } = {};

  @Input() wakeZone: boolean | undefined;
  @Output() wakeZoneChange = new EventEmitter();

  @Input() lateZone: boolean | undefined;
  @Output() lateZoneChange = new EventEmitter();

  @Input() deliveryZone: boolean | undefined;
  @Output() deliveryZoneChange = new EventEmitter();

  @Input() receptionZone: boolean | undefined;
  @Output() receptionZoneChange = new EventEmitter();

  @Input() cleanZone: boolean | undefined;
  @Output() cleanZoneChange = new EventEmitter();

  @Input() maintainZone: boolean | undefined;
  @Output() maintainZoneChange = new EventEmitter();

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
