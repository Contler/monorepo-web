import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      init: ['', [Validators.required]],
      end: ['', [Validators.required]],
    });
  }
}
