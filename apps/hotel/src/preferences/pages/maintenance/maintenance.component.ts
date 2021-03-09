import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelEntity } from '@contler/entity';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { AuthService } from 'hotel/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, tap } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { OptionModule } from '@contler/models';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit {
  load = true;
  modules$: Observable<OptionModule[] | null>;
  private hotel: HotelEntity;

  constructor(
    private dynamicModule: DynamicModuleService,
    private auth: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.modules$ = this.auth.$employer.pipe(
      tap((data) => (this.hotel = data.hotel)),
      switchMap((user) => this.dynamicModule.getOptionsModule(user.hotel.uid, MODULES.maintenance, false)),
      tap((data) => (this.load = !data)),
    );
  }

  public changeStatus($event: MatSlideToggleChange, index: number): void {
    const url = `${MODULES.root}/${this.hotel.uid}/${MODULES.maintenance}/options/${index}`;
    this.db.object<OptionModule>(url).update({ active: $event.checked });
  }

  public goToHome(): void {
    this.router.navigate(['preferences', 'cleaning']);
  }
  isDynamicModule(module: OptionModule) {
    return module.text.includes('/name');
  }

  public editModule(option: OptionModule): void {
    const optionTextArr = option.text.split('/');
    if (optionTextArr.length > 0) {
      const formId = optionTextArr[1];
      this.router.navigate(['preferences', 'maintenance', 'service', formId], {
        queryParams: { icon: option.icon },
      });
    }
  }
}
