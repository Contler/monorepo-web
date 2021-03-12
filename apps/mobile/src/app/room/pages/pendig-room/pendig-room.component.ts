import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { take, tap } from 'rxjs/operators';
import {
  DynamicModuleService,
  DynamicRequest,
  DynamicRequestStatus,
  MODULES,
} from '@contler/dynamic-services';
import { EmployerEntity } from '@contler/entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-pendig-room',
  templateUrl: './pendig-room.component.html',
  styleUrls: ['./pendig-room.component.scss'],
})
export class PendigRoomComponent implements OnInit {
  user: EmployerEntity;
  totalReception: number;
  dynamicReq: Observable<DynamicRequest[]>;
  listStatus = [DynamicRequestStatus.ALL, DynamicRequestStatus.PROGRAMING, DynamicRequestStatus.ATTENDED];
  filter = DynamicRequestStatus.ALL;

  constructor(public menu: MenuController, private auth: AuthService, dynamicService: DynamicModuleService) {
    this.auth.$user.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.dynamicReq = dynamicService
        .getDynamicRequest(user.hotel.uid, MODULES.room, true)
        .pipe(tap(({ length }) => (this.totalReception = length)));
    });
  }

  ngOnInit(): void {}
}
