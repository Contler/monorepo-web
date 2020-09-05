import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { RoomService } from 'hotel/room/services/room.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomEntity, ZoneEntity } from '@contler/entity';

@Component({
  selector: 'contler-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  roomGroup: FormGroup;
  zones: ZoneEntity[] = [];
  rooms: RoomEntity[] = [];
  isFullRooms = true;

  constructor(
    formBuild: FormBuilder,
    private zoneService: ZoneService,
    private roomService: RoomService,
    private snackBar: MatSnackBar,
  ) {
    this.roomGroup = formBuild.group({
      name: ['', Validators.required],
    });
    this.zoneService.getZones().subscribe((zones) => (this.zones = zones));
    this.roomService.getRoom().subscribe((rooms) => (this.rooms = rooms));
  }

  completeSingleRoom(room: RoomEntity) {
    this.rooms = [...this.rooms, room];
  }

  deleteRoom(room: RoomEntity) {
    if (room.guest) {
      this.snackBar.open('Este cuarto esta en usu, no se puede eliminar', 'cerrar', {
        duration: 5000,
      });
    } else {
      this.roomService.deleteRoom(room.uid).subscribe(() => {
        this.rooms = this.rooms.filter((r) => r.uid !== room.uid);
      });
    }
  }
}
