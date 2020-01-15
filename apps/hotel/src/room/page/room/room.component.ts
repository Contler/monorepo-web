import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { RoomService } from 'hotel/room/services/room.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { RoomEntity, ZoneEntity } from '@contler/entity';

@Component({
  selector: 'contler-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  load = false;
  roomGroup: FormGroup;
  zones: ZoneEntity[] = [];
  rooms: RoomEntity[] = [];

  constructor(
    formBuild: FormBuilder,
    private zoneService: ZoneService,
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    private messagesService: MessagesService,
  ) {
    this.roomGroup = formBuild.group({
      name: ['', Validators.required],
    });
    this.zoneService.getZones().subscribe(zones => (this.zones = zones));
    this.roomService.getRoom().subscribe(rooms => (this.rooms = rooms));
  }

  createRoom() {
    this.load = true;
    const { name, zone } = this.roomGroup.value;
    this.roomService.saveRoom(name).subscribe(
      room => {
        this.load = false;
        this.messagesService.showToastMessage('Habitación creada exitosamente');
        this.roomGroup.reset({ name: '', zone: '' });
        this.rooms = [...this.rooms, room];
      },
      () => {
        this.load = false;
        this.messagesService.showServerError();
      },
    );
  }

  deleteRoom(room: RoomEntity) {
    if (room.guest) {
      this.snackBar.open('Este cuarto esta en usu, no se puede eliminar', 'cerrar', { duration: 5000 });
    } else {
      this.roomService.deleteRoom(room.uid).subscribe(() => {
        this.rooms = this.rooms.filter(r => r.uid !== room.uid);
      });
    }
  }
}
