import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRoomComponent } from './my-room.component';
import { MaterialModule } from '../material/material.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MyRoomRoutingModule } from './my-room.routing.module';
import { UiModule } from '@contler/ui';
import { CoreModule } from '@contler/core';

@NgModule({
  declarations: [MyRoomComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CommonComponentsModule,
    MyRoomRoutingModule,
    UiModule,
    CoreModule,
  ],
})
export class MyRoomModule {}
