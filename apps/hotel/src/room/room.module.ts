import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './page/room/room.component';
import { RoomRoutingModule } from './room-routing.module';
import { MaterialModule } from 'hotel/material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    RoomRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class RoomModule { }
