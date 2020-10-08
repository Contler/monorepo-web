import { Component, OnInit } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ReceptionModel } from '@contler/models';
import { ReceptionLocalService } from '../services/reception/reception-local.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomService } from '@contler/core';

@Component({
  selector: 'contler-clean',
  templateUrl: './clean.component.html',
  styleUrls: ['./clean.component.scss'],
})
export class CleanComponent implements OnInit {
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
      .getCleanReq()
      .pipe(tap(({ length }) => (this.totalReception = length)));
  }

  async modalClose(complete: boolean, uid: string) {
    await this.roomService.cleanRef.doc(uid).update({ active: complete });
    this.snackBar.open('Petición actualizada', 'cerrar', { duration: 3000 });
  }
}
