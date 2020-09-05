import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'contler-multi-room',
  templateUrl: './multi-room.component.html',
  styleUrls: ['./multi-room.component.scss'],
})
export class MultiRoomComponent {
  load = false;
  roomGroup: FormGroup;

  constructor(formBuild: FormBuilder) {
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

  get initRoom() {
    return this.roomGroup.get('init');
  }

  get endRoom() {
    return this.roomGroup.get('end');
  }
}
