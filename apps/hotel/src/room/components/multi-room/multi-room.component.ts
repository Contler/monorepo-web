import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RoomService } from 'hotel/room/services/room.service';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { RoomEntity } from '@contler/entity';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService,
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
        this.translate.get('room.susses').subscribe((value) => {
          this.load = false;
          this.messagesService.showToastMessage(value);
          this.roomGroup.reset({ init: '', end: '' });
          this.completeRoomCreation.emit(rooms);
        });
      },
      (e) => {
        this.load = false;
        if (e.status === 400) {
          const rooms = e.error.map((room) => room.name).join(', ');
          this.translate.get(['room.hasExistRooms', 'global.CLOSE'], { value: rooms }).subscribe((value) => {
            this.messagesService.showToastMessage(value['room.hasExistRooms'], value['global.CLOSE'], 5000);
          });
        } else {
          this.messagesService.showServerError();
        }
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
