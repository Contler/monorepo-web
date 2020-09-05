import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RoomService } from 'hotel/room/services/room.service';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { RoomEntity } from '@contler/entity';

@Component({
  selector: 'contler-multi-room',
  templateUrl: './multi-room.component.html',
  styleUrls: ['./multi-room.component.scss'],
})
export class MultiRoomComponent {
  @Output() completeRoomCreation = new EventEmitter<RoomEntity[]>();

  load = false;
  roomGroup: FormGroup;

  constructor(
    formBuild: FormBuilder,
    private roomService: RoomService,
    private messagesService: MessagesService,
  ) {
    this.roomGroup = formBuild.group({
      init: ['', [Validators.required, this.checkRooms.bind(this)]],
      end: ['', [Validators.required, this.checkRooms.bind(this)]],
    });
    this.endRoom.valueChanges.subscribe(() => {
      this.initRoom.updateValueAndValidity();
    });
  }

  checkRooms(): ValidationErrors | null {
    if (!this.roomGroup || !this.initRoom.value || !this.endRoom.value) {
      return null;
    }
    return Number(this.endRoom.value) > Number(this.initRoom.value)
      ? Number(this.endRoom.value) - Number(this.initRoom.value) < 20
        ? null
        : { maxRooms: 'max Rooms' }
      : { badRooms: 'init room bad' };
  }

  saveRooms() {
    this.load = true;
    const { init, end } = this.roomGroup.value;
    const names = [];
    for (let i = Number(init); i <= Number(end); i++) {
      names.push('Habitación ' + i);
    }
    this.roomService.saveRooms(names).subscribe(
      (rooms) => {
        this.load = false;
        this.messagesService.showToastMessage('Habitación creada exitosamente');
        this.roomGroup.reset({ init: '', end: '' });
        this.completeRoomCreation.emit(rooms);
      },
      () => {
        this.load = false;
        this.messagesService.showServerError();
      },
    );
  }

  get initRoom() {
    return this.roomGroup.get('init');
  }

  get endRoom() {
    return this.roomGroup.get('end');
  }
}
