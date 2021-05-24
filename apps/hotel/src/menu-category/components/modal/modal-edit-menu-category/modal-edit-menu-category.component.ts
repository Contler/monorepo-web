import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '@contler/core';
import { MessagesService } from '@contler/hotel/services/messages/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateService as DynamicService } from '@contler/dynamic-translate';
import { AuthService } from '@contler/hotel/services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'contler-modal-edit-menu-category',
  templateUrl: './modal-edit-menu-category.component.html',
  styleUrls: ['./modal-edit-menu-category.component.scss'],
})
export class ModalEditMenuCategoryComponent {
  load = false;
  categoryGroup: FormGroup;
  restaurantId: string;
  categoryId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalEditMenuCategoryComponent>,
    private restaurantServ: RestaurantService,
    private messagesService: MessagesService,
    private translate: TranslateService,
    private dynamic: DynamicService,
    private auth: AuthService,
    formBuild: FormBuilder,
  ) {
    this.categoryGroup = formBuild.group({
      name: [this.dynamic.getInstant(data.category.name), Validators.required],
    });
    this.restaurantId = data.restaurant.uid;
    this.categoryId = data.category.uid;
  }

  updateCategory() {
    if (this.categoryGroup.valid) {
      this.load = true;
      const { name } = this.categoryGroup.value;
      this.auth.$employer
        .pipe(
          switchMap((employer) =>
            this.dynamic.updateTranslate(this.data.category.name, name, employer.hotel.uid),
          ),
        )
        .subscribe(
          () => {
            this.load = false;
            this.dialogRef.close();
            const msn = this.translate.instant('category.updateSusses');
            this.messagesService.showToastMessage(msn);
          },
          () => this.messagesService.showServerError(),
        );
    }
  }
}
