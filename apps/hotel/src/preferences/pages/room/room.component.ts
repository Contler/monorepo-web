import { Component, OnInit } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { AuthService } from '@contler/hotel/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, tap } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { OptionModule, OptionType } from '@contler/models';
import { Router } from '@angular/router';
import { PreferencesService } from '@contler/hotel/preferences/services/preferences.service';

@Component({
  selector: 'contler-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  load = true;
  modules$: Observable<OptionModule[] | null>;
  private hotel: HotelEntity;

  constructor(
    private dynamicModule: DynamicModuleService,
    private auth: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
    private preferencesService: PreferencesService,
  ) {}

  ngOnInit(): void {
    this.modules$ = this.auth.$employer.pipe(
      tap((data) => (this.hotel = data.hotel)),
      switchMap((user) => this.dynamicModule.getOptionsModule(user.hotel.uid, MODULES.room, false)),
      tap((data) => (this.load = !data)),
    );
  }

  public changeStatus($event: MatSlideToggleChange, index: number): void {
    const url = `${MODULES.root}/${this.hotel.uid}/${MODULES.room}/options/${index}`;
    this.db.object<OptionModule>(url).update({ active: $event.checked });
  }

  public goToMaintenancePage(): void {
    this.router.navigate(['preferences', 'maintenance']);
  }
  isDynamicModule(module: OptionModule) {
    return module.type === OptionType.DYNAMIC_FORM || module.formKey;
  }

  public editModule(option: OptionModule): void {
    this.preferencesService.redirectEditDynamicForm(option, MODULES.room);
  }

  public async removeDynamicForm(option: OptionModule): Promise<void> {
    await this.preferencesService.removeDynamicForm(option, this.hotel.uid, MODULES.room);
  }
}
