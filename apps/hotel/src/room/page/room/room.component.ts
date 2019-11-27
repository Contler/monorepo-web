import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { Observable } from 'rxjs';
import { Room, Zone } from '@contler/core/models';
import { RoomService } from 'hotel/room/services/room.service';

@Component({
  selector: 'contler-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  load = false;
  roomGroup: FormGroup;
  zones: Zone[] = [];
  $rooms: Observable<Room[]>;

  constructor(formBuild: FormBuilder, private zoneService: ZoneService, private roomService: RoomService) {
    this.roomGroup = formBuild.group({
      name: ['', Validators.required],
      zone: ['', Validators.required],
    });
    this.zoneService.getZones().subscribe(zones => (this.zones = zones));
    this.$rooms = this.roomService.getRoom();
  }

  createRoom() {
    this.load = true;
    const { name, zone } = this.roomGroup.value;
    this.roomService.saveRoom(name, zone).subscribe(() => {
      this.load = false;
      this.roomGroup.reset({ name: '', zone: '' });
    });
  }

  getZone(zoneUid: string) {
    return this.zones.find(zone => zone.uid === zoneUid);
  }

  deleteRoom(room: Room) {
    this.roomService.deleteRoom(room.uid);
  }
}
