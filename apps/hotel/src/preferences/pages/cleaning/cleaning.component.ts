import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionModule, OptionType } from '@contler/models';
import { HotelEntity } from '@contler/entity';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { AuthService } from 'hotel/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PreferencesService } from 'hotel/preferences/services/preferences.service';

@Component({
  selector: 'contler-cleaning',
  templateUrl: './cleaning.component.html',
  styleUrls: ['./cleaning.component.scss'],
})
export class CleaningComponent implements OnInit {
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
      switchMap((user) => this.dynamicModule.getOptionsModule(user.hotel.uid, MODULES.cleaning, false)),
      tap((data) => (this.load = !data)),
    );
  }
  public changeStatus($event: MatSlideToggleChange, index: number): void {
    const url = `${MODULES.root}/${this.hotel.uid}/${MODULES.cleaning}/options/${index}`;
    this.db.object<OptionModule>(url).update({ active: $event.checked });
  }

  public goToHome(): void {
    this.router.navigate(['home']);
  }
  isDynamicModule(module: OptionModule) {
    return module.type === OptionType.DYNAMIC_FORM;
  }

  public editModule(option: OptionModule): void {
    this.preferencesService.redirectEditDynamicForm(option, MODULES.cleaning);
  }

  public async removeDynamicForm(option: OptionModule): Promise<void> {
    await this.preferencesService.removeDynamicForm(option, this.hotel.uid, MODULES.cleaning);
  }
}
