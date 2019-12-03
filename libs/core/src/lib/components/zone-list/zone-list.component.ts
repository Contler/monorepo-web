import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MapZone, Zone } from 'lib/models';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'contler-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss'],
})
export class ZoneListComponent {
  @Input() $zones: Observable<Zone[]> | undefined;
  @Input() zonesSelected: { [key: string]: boolean } = {};
  @Output() selected = new EventEmitter<{ [key: string]: boolean }>();

  select(event: MatCheckboxChange, zone: Zone) {
    if (event.checked) {
      this.zonesSelected[zone.uid] = true;
    } else {
      delete this.zonesSelected[zone.uid];
    }
    this.selected.emit(this.zonesSelected)
  }

}
