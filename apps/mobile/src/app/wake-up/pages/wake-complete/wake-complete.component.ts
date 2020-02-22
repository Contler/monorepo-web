import { Component, OnInit } from '@angular/core';
import { EmployerEntity, WakeUpEntity } from '@contler/entity';
import { AuthService } from '../../../services/auth.service';
import { WakeService } from '../../../services/wake.service';
import { MenuController } from '@ionic/angular';
import { MatDialog } from '@angular/material';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'contler-wake-complete',
  templateUrl: './wake-complete.component.html',
  styleUrls: ['./wake-complete.component.scss'],
})
export class WakeCompleteComponent implements OnInit {
  user: EmployerEntity | null = null;
  search = '';
  wakes: Observable<WakeUpEntity[]>;

  constructor(
    private auth: AuthService,
    wakeService: WakeService,
    public menu: MenuController,
    public dialog: MatDialog,
    public generalService: GeneralService
  ) {
    this.auth.$user
      .pipe(tap(user => wakeService.getWakeComplete(user!.hotel.uid).subscribe()))
      .subscribe(user => (this.user = user));
    this.wakes = wakeService.$wakeComplete
  }

  ngOnInit() {}

  goToComplete(wake: WakeUpEntity) {}
}
