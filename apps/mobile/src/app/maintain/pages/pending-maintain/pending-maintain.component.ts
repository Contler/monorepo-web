import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployerEntity } from '@contler/entity';
import { ReceptionModel } from '@contler/models';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { GeneralService } from '../../../services/general.service';
import { ReceptionLocalService } from '../../../services/reception/reception-local.service';
import { RoomService } from '@contler/core';

@Component({
  selector: 'contler-pending-maintain',
  templateUrl: './pending-maintain.component.html',
  styleUrls: ['./pending-maintain.component.scss'],
})
export class PendingMaintainComponent implements OnInit {
  $receptionReq: Observable<ReceptionModel[]>;
  user: EmployerEntity | null = null;
  totalReception: number;

  constructor(
    private auth: AuthService,
    private receptionLocalService: ReceptionLocalService,
    private snackBar: MatSnackBar,
    public generalService: GeneralService,
    public menu: MenuController,
    public roomService: RoomService,
  ) {}

  ngOnInit() {
    this.auth.$user.pipe(take(1)).subscribe((user) => (this.user = user));
    this.$receptionReq = this.receptionLocalService
      .getMaintainReq()
      .pipe(tap(({ length }) => (this.totalReception = length)));
  }

  async modalClose(complete: boolean, uid: string) {
    await this.roomService.maintainRef.doc(uid).update({ active: complete });
    this.snackBar.open('Petición actualizada', 'cerrar', { duration: 3000 });
  }
}
