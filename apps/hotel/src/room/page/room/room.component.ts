import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { Observable } from 'rxjs';
import { Room, Zone } from '@contler/models';
import { RoomService } from 'hotel/room/services/room.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesService } from 'hotel/services/messages/messages.service';

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
    this.$rooms = this.roomService.getRoom();
  }

  createRoom() {
    this.load = true;
    const { name, zone } = this.roomGroup.value;
    this.roomService.saveRoom(name, zone).subscribe(
      () => {
        this.load = false;
        this.messagesService.showToastMessage('Habitación creada exitosamente');
        this.roomGroup.reset({ name: '', zone: '' });
      },
      () => {
        this.load = false;
        this.messagesService.showServerError();
      },
    );
  }

  getZone(zoneUid: string) {
    return this.zones.find(zone => zone.uid === zoneUid);
  }

  deleteRoom(room: Room) {
    if (room.busy) {
      this.snackBar.open('Este cuarto esta en usu, no se puede eliminar', 'cerrar', { duration: 5000 });
    } else {
      this.roomService.deleteRoom(room.uid);
    }
  }
}
