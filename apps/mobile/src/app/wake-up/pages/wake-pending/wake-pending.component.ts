import { Component, OnInit } from '@angular/core';
import { EmployerEntity, WakeUpEntity } from '@contler/entity';
import { AuthService } from '../../../services/auth.service';
import { WakeService } from '../../../services/wake.service';
import { filter, tap } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';
import { MatDialog } from '@angular/material';
import { ModalConfirmWakeComponent } from '../../components/modal-confirm-wake/modal-confirm-wake.component';

@Component({
  selector: 'contler-wake-pending',
  templateUrl: './wake-pending.component.html',
  styleUrls: ['./wake-pending.component.scss'],
})
export class WakePendingComponent implements OnInit {
  user: EmployerEntity | null = null;
  wakes: WakeUpEntity[] = [];
  search = '';

  constructor(
    private auth: AuthService,
    wakeService: WakeService,
    public menu: MenuController,
    public dialog: MatDialog,
  ) {
    this.auth.$user
      .pipe(tap(user => wakeService.getWakeIncomplete(user!.hotel.uid).subscribe(wake => (this.wakes = wake))))
      .subscribe(user => (this.user = user));
  }

  ngOnInit() {}

  goToComplete(wake: WakeUpEntity) {
    this.dialog
      .open(ModalConfirmWakeComponent, { data: wake })
      .afterClosed()
      .pipe(filter(finish => !!finish))
      .subscribe(() => {
        this.wakes = this.wakes.filter(w => w.id !== wake.id);
      });
  }
}
