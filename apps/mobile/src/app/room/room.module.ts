import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room.component';
import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PendigRoomComponent } from './pages/pendig-room/pendig-room.component';
import { CompleteRoomComponent } from './pages/complete-room/complete-room.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: RoomComponent,
    children: [
      { path: 'pending', component: PendigRoomComponent },
      { path: 'ready', component: CompleteRoomComponent },
    ],
  },
];

@NgModule({
  declarations: [RoomComponent, PendigRoomComponent, CompleteRoomComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    CommonComponentsModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
  ],
})
export class RoomModule {}
