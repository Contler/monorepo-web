import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { RoomService } from 'hotel/room/services/room.service';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { RoomEntity } from '@contler/entity';

@Component({
  selector: 'contler-single-room',
  templateUrl: './single-room.component.html',
  styleUrls: ['./single-room.component.scss'],
})
export class SingleRoomComponent {
  @Output() completeRoomCreation = new EventEmitter<RoomEntity>();

  roomGroup: FormGroup;
  load = false;

  constructor(
    formBuild: FormBuilder,
    private roomService: RoomService,
    private messagesService: MessagesService,
  ) {
    this.roomGroup = formBuild.group({
      name: ['', Validators.required],
    });
  }

  createRoom() {
    this.load = true;
    const { name } = this.roomGroup.value;
    this.roomService
      .saveRoom('Habitación ' + name)
      .pipe(take(1))
      .subscribe(
        (room) => {
          this.load = false;
          this.messagesService.showToastMessage('Habitación creada exitosamente');
          this.roomGroup.reset({ name: '', zone: '' });
          this.completeRoomCreation.emit(room);
        },
        (e) => {
          this.load = false;
          if (e.status === 400) {
            this.messagesService.showToastMessage('La habitación ya existe');
          } else {
            this.messagesService.showServerError();
          }
        },
      );
  }
}
