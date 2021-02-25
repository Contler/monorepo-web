import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { take, tap } from 'rxjs/operators';
import { DynamicModuleService, DynamicRequest, MODULES } from '@contler/dynamic-services';
import { EmployerEntity } from '@contler/entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-complete-room',
  templateUrl: './complete-room.component.html',
  styleUrls: ['./complete-room.component.scss'],
})
export class CompleteRoomComponent implements OnInit {
  user: EmployerEntity;
  totalReception: number;
  dynamicReq: Observable<DynamicRequest[]>;

  constructor(public menu: MenuController, private auth: AuthService, dynamicService: DynamicModuleService) {
    this.auth.$user.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.dynamicReq = dynamicService
        .getDynamicRequest(user.hotel.uid, MODULES.room, false, 7)
        .pipe(tap(({ length }) => (this.totalReception = length)));
    });
  }

  ngOnInit(): void {}
}
