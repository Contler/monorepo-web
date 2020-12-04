import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { RoomService } from 'hotel/room/services/room.service';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { RoomEntity } from '@contler/entity';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService,
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
          this.translate
            .get('room.susses')
            .subscribe((value) => this.messagesService.showToastMessage(value));
          this.roomGroup.reset({ name: '', zone: '' });
          this.completeRoomCreation.emit(room);
        },
        (e) => {
          this.load = false;
          if (e.status === 400) {
            this.translate
              .get('room.exist')
              .subscribe((value) => this.messagesService.showToastMessage(value));
          } else {
            this.messagesService.showServerError();
          }
        },
      );
  }
}
