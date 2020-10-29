import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { EmployerEntity } from '@contler/entity';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';
import { LateCheckOutService } from '@contler/core';
import { map, switchMap } from 'rxjs/operators';
import { LateCheckUser } from '@contler/models';

@Component({
  selector: 'contler-latecheck-out',
  templateUrl: './latecheck-out.component.html',
  styleUrls: ['./latecheck-out.component.scss'],
})
export class LatecheckOutComponent implements OnInit {
  user: EmployerEntity | null = null;

  lateList: LateCheckUser[] = [];

  search = '';

  constructor(
    public generalService: GeneralService,
    auth: AuthService,
    public menu: MenuController,
    private lateService: LateCheckOutService,
  ) {
    auth.$user.subscribe((user) => (this.user = user));
    auth.$user
      .pipe(
        switchMap((user) => this.lateService.getLateByHotel(user!.hotel.uid)),
        map((lattes) => lattes.filter((late) => !!late.user.room)),
      )
      .subscribe((list) => (this.lateList = list));
  }

  ngOnInit() {}

  acceptLate(item: LateCheckUser) {
    item.status = 2;
    this.lateService.changeStatusLate(2, item.uid);
  }

  cancelLate(item: LateCheckUser) {
    item.status = 1;
    this.lateService.changeStatusLate(1, item.uid);
  }
}
