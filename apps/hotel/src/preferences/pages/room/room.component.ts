import { Component, OnInit } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { AuthService } from 'hotel/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { first, switchMap, tap } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ImmediateOptionLink, OptionModule } from '@contler/models';
import { Router } from '@angular/router';
import { MessagesService } from 'hotel/services/messages/messages.service';

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
    private messagesService: MessagesService,
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
    return module.text.includes('/name');
  }

  public editModule(option: OptionModule): void {
    const formId = this.getFormId(option);
    this.router.navigate(['preferences', 'room', 'service', formId], {
      queryParams: { icon: option.icon },
    });
  }

  public async removeDynamicForm(option: OptionModule): Promise<void> {
    const loader = this.messagesService.showLoader();
    const formId = this.getFormId(option);
    try {
      const formsActive = await this.dynamicModule
        .getDynamicRequest(this.hotel.uid, MODULES.room, true, null, formId)
        .pipe(first())
        .toPromise();
      if (formsActive.length) {
        this.messagesService.closeLoader(loader);
        const removeFormError = 'preferences.message.removeFormError';
        this.dynamicModule.generateMSg(removeFormError);
        return;
      } else {
        await this.removeForm(formId);
        await this.removeOptionModule(option);
      }
      const formsInactive = await this.dynamicModule
        .getDynamicRequest(this.hotel.uid, MODULES.room, false, null, formId)
        .pipe(first())
        .toPromise();
      if (!formsInactive.length) {
        await this.removeDictionaryForm(option);
      }
      this.messagesService.closeLoader(loader);
      const removeFormSuccess = 'preferences.message.removeFormSuccess';
      this.dynamicModule.generateMSg(removeFormSuccess);
    } catch (err) {
      console.log(err);
      this.messagesService.closeLoader(loader);
      this.messagesService.showServerError();
    }
  }
  getFormId(option: OptionModule) {
    const optionTextArr = option.text.split('/');
    if (optionTextArr.length > 0) {
      return optionTextArr[1];
    }
    return null;
  }

  private async removeForm(formId: string): Promise<void> {
    return await this.db.database.ref(MODULES.form).child(formId).remove();
  }

  private async removeOptionModule(option: OptionModule): Promise<void> {
    return await this.dynamicModule.removeOptionModule(
      this.hotel.uid,
      option as ImmediateOptionLink,
      MODULES.room,
    );
  }

  private async removeDictionaryForm(option: OptionModule): Promise<void> {
    const formId = this.getFormId(option);
    return await this.dynamicModule.removeDictionaryFormModule(this.hotel.uid, MODULES.room, formId);
  }
}
