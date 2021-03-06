import { Component, Input } from '@angular/core';
import { DynamicRequest } from '@contler/dynamic-services';
import { MatDialog } from '@angular/material/dialog';
import { DynamicResultComponent } from '../dynamicresult/dynamic-result.component';
import { ModalController } from '@ionic/angular';

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
      const modal = await this.modalController.create({
        component: DynamicResultComponent,
        componentProps: { data: this.item },
      });
      modal.present();
    }
  }

  getDate(data: any) {
    return new Date(data['seconds'] * 1000);
  }
}
