import { Component, Input } from '@angular/core';
import { DynamicRequest, DynamicRequestStatus, MODULES } from '@contler/dynamic-services';
import { MatDialog } from '@angular/material/dialog';
import { DynamicResultComponent } from '../dynamicresult/dynamic-result.component';
import { ModalController } from '@ionic/angular';
import { ModalInmediateRequestPage } from '../modal-inmediate-request/modal-inmediate-request.page';

@Component({
  selector: 'contler-dynamic-item',
  templateUrl: './dynamic-item.component.html',
  styleUrls: ['./dynamic-item.component.scss'],
})
export class DynamicItemComponent {
  @Input() item: DynamicRequest;
  @Input() isReady: boolean;

  constructor(private dialog: MatDialog, private modalController: ModalController) {}

  async openModal() {
    if (this.isReady) {
      if (this.item.service === MODULES.room && this.item.typeRequest === 0) {
        this.dialog.open(ModalInmediateRequestPage, {
          data: this.item,
          maxWidth: '100vw',
          panelClass: 'modalApp',
        });
      } else {
        const modal = await this.modalController.create({
          component: DynamicResultComponent,
          componentProps: { data: this.item },
        });
        modal.present();
      }
    }
  }

  get colorStatus() {
    return this.item?.status === DynamicRequestStatus.ATTENDED ? 'yellow' : 'red';
  }

  get isComplete() {
    return this.item?.status === DynamicRequestStatus.COMPLETED;
  }
}
