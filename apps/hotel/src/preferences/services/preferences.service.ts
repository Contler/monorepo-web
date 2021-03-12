import { Injectable } from '@angular/core';
import { ImmediateOptionLink, OptionModule, OptionType } from '@contler/models';
import { Router } from '@angular/router';
import { DynamicModuleService, DynamicRequestStatus, MODULES } from '@contler/dynamic-services';
import { first } from 'rxjs/operators';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  constructor(
    private router: Router,
    private messagesService: MessagesService,
    private dynamicModuleService: DynamicModuleService,
    private angularFireDatabase: AngularFireDatabase,
  ) {}

  public redirectEditDynamicForm(option: OptionModule, moduleReference: MODULES): void {
    if (option.type === OptionType.DYNAMIC_FORM) {
      this.router.navigate(['preferences', moduleReference, 'service', option.formKey], {
        queryParams: { icon: option.icon },
      });
    }
  }

  public async removeDynamicForm(
    option: OptionModule,
    hotelUid: string,
    moduleReference: MODULES,
  ): Promise<void> {
    const loader = this.messagesService.showLoader();
    const formId = option.formKey;
    try {
      const forms = await this.dynamicModuleService
        .getDynamicRequest(null, null, null, null, formId)
        .pipe(first())
        .toPromise();
      const formsActive = forms.filter((form) => form.status !== DynamicRequestStatus.COMPLETED);
      if (formsActive.length) {
        this.messagesService.closeLoader(loader);
        const removeFormError = 'preferences.message.removeFormError';
        this.dynamicModuleService.generateMSg(removeFormError);
        return;
      } else {
        await this.removeForm(formId);
        await this.removeOptionModule(option, hotelUid, moduleReference);
      }
      const formsInactive = forms.filter((form) => form.status === DynamicRequestStatus.COMPLETED);
      if (!formsInactive.length) {
        await this.removeDictionaryForm(option, hotelUid, moduleReference);
      }
      this.messagesService.closeLoader(loader);
      const removeFormSuccess = 'preferences.message.removeFormSuccess';
      this.dynamicModuleService.generateMSg(removeFormSuccess);
    } catch (err) {
      console.log(err);
      this.messagesService.closeLoader(loader);
      this.messagesService.showServerError();
    }
  }

  private async removeForm(formId: string): Promise<void> {
    return await this.angularFireDatabase.database.ref(MODULES.form).child(formId).remove();
  }

  private async removeOptionModule(
    option: OptionModule,
    hotelUid: string,
    moduleReference: MODULES,
  ): Promise<void> {
    return await this.dynamicModuleService.removeOptionModule(
      hotelUid,
      option as ImmediateOptionLink,
      moduleReference,
    );
  }

  private async removeDictionaryForm(
    option: OptionModule,
    hotelUid: string,
    moduleReference: MODULES,
  ): Promise<void> {
    return await this.dynamicModuleService.removeDictionaryFormModule(
      hotelUid,
      moduleReference,
      option.formKey,
    );
  }
}
