import { Component, OnInit } from '@angular/core';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { AuthService } from '../../../services/auth.service';
import { first, switchMap, tap } from 'rxjs/operators';
import { HotelEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AngularFireDatabase } from '@angular/fire/database';
import { ImmediateOptionLink, OptionModule } from '@contler/models';
import { Router } from '@angular/router';
import { MessagesService } from '../../../services/messages/messages.service';

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
    private messagesService: MessagesService,
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
    return module.text.includes('/name');
  }

  public editModule(option: OptionModule): void {
    const formId = this.getFormId(option);
    this.router.navigate(['preferences', 'reception', 'service', formId], {
      queryParams: { icon: option.icon },
    });
  }

  public async removeDynamicForm(option: OptionModule): Promise<void> {
    const loader = this.messagesService.showLoader();
    const formId = this.getFormId(option);
    try {
      const formsActive = await this.dynamicModule
        .getDynamicRequest(this.hotel.uid, MODULES.reception, true, null, formId)
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
        .getDynamicRequest(this.hotel.uid, MODULES.reception, false, null, formId)
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
      MODULES.reception,
    );
  }

  private async removeDictionaryForm(option: OptionModule): Promise<void> {
    const formId = this.getFormId(option);
    return await this.dynamicModule.removeDictionaryFormModule(this.hotel.uid, MODULES.reception, formId);
  }
}
