import { Component, OnInit } from '@angular/core';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { AuthService } from '../../../services/auth.service';
import { switchMap, tap } from 'rxjs/operators';
import { HotelEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AngularFireDatabase } from '@angular/fire/database';
import { OptionModule, OptionType } from '@contler/models';
import { Router } from '@angular/router';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'contler-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
})
export class ReceptionComponent implements OnInit {
  load = true;
  modules: Observable<OptionModule[] | null>;
  private hotel: HotelEntity;

  constructor(
    private dynamicModule: DynamicModuleService,
    private auth: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
    private preferencesService: PreferencesService,
  ) {}

  ngOnInit(): void {
    this.modules = this.auth.$employer.pipe(
      tap((data) => (this.hotel = data.hotel)),
      switchMap((user) => this.dynamicModule.getOptionsModule(user.hotel.uid, MODULES.reception, false)),
      tap((data) => (this.load = !data)),
    );
  }

  changeStatus(change: MatSlideToggleChange, index: number) {
    const url = `${MODULES.root}/${this.hotel.uid}/${MODULES.reception}/options/${index}`;
    this.db.object<OptionModule>(url).update({ active: change.checked });
  }

  public goToRoomPage(): void {
    this.router.navigate(['preferences', 'room']);
  }

  isDynamicModule(module: OptionModule) {
    return module.type === OptionType.DYNAMIC_FORM || module.formKey;
  }

  public editModule(option: OptionModule): void {
    this.preferencesService.redirectEditDynamicForm(option, MODULES.reception);
  }

  public async removeDynamicForm(option: OptionModule): Promise<void> {
    await this.preferencesService.removeDynamicForm(option, this.hotel.uid, MODULES.reception);
  }
}
