import { Component, OnInit } from '@angular/core';
import { EmployerEntity, WakeUpEntity } from '@contler/entity';
import { AuthService } from '../../../services/auth.service';
import { WakeService } from '../../../services/wake.service';
import { tap } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';
import { MatDialog } from '@angular/material';
import { ModalConfirmWakeComponent } from '../../components/modal-confirm-wake/modal-confirm-wake.component';
import { Observable } from 'rxjs';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'contler-wake-pending',
  templateUrl: './wake-pending.component.html',
  styleUrls: ['./wake-pending.component.scss'],
})
export class WakePendingComponent implements OnInit {
  user: EmployerEntity | null = null;

  search = '';
  private wakes: Observable<WakeUpEntity[]>;

  constructor(
    private auth: AuthService,
    wakeService: WakeService,
    public menu: MenuController,
    public dialog: MatDialog,
    public generalService: GeneralService
  ) {
    this.auth.$user
      .pipe(tap(user => wakeService.getWakeIncomplete(user!.hotel.uid).subscribe()))
      .subscribe(user => (this.user = user));
    this.wakes = wakeService.$wakeIncomplete;
  }

  ngOnInit() {}

  goToComplete(wake: WakeUpEntity) {
    this.dialog.open(ModalConfirmWakeComponent, { data: wake });
  }
}
