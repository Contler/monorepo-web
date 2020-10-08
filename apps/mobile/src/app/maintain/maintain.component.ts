import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ReceptionModel } from '@contler/models';
import { EmployerEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ReceptionLocalService } from '../services/reception/reception-local.service';
import { take, tap } from 'rxjs/operators';
import { RoomService } from '@contler/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'contler-maintain',
  templateUrl: './maintain.component.html',
  styleUrls: ['./maintain.component.scss'],
})
export class MaintainComponent implements OnInit {
  $receptionReq: Observable<ReceptionModel[]>;

  user: EmployerEntity | null = null;
  totalReception: number;

  constructor(
    private auth: AuthService,
    public menu: MenuController,
    private receptionService: ReceptionLocalService,
    private roomService: RoomService,
    private snackBar: MatSnackBar,
  ) {
    this.auth.$user.pipe(take(1)).subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.$receptionReq = this.receptionService
      .getMaintainReq()
      .pipe(tap(({ length }) => (this.totalReception = length)));
  }

  async modalClose(complete: boolean, uid: string) {
    await this.roomService.maintainRef.doc(uid).update({ active: complete });
    this.snackBar.open('Petición actualizada', 'cerrar', { duration: 3000 });
  }
}
