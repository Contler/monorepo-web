import { Component, Input, OnInit } from '@angular/core';
import { DynamicRequest, DynamicRequestStatus } from '@contler/dynamic-services';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'contler-dynamicresult',
  templateUrl: './dynamic-result.component.html',
  styleUrls: ['./dynamic-result.component.scss'],
})
export class DynamicResultComponent implements OnInit {
  @Input() data: DynamicRequest;
  status: DynamicRequestStatus;

  listStatus = [
    DynamicRequestStatus.PROGRAMING,
    DynamicRequestStatus.ATTENDED,
    DynamicRequestStatus.COMPLETED,
  ];

  constructor(
    private db: AngularFirestore,
    private modalController: ModalController,
    public generalService: GeneralService,
  ) {}

  ngOnInit(): void {
    this.status = this.data.status;
  }

  update() {
    this.data.status = this.status;
    if (this.data.status === DynamicRequestStatus.COMPLETED) {
      this.data.active = false;
    }
    this.db.collection('dynamicRequest').doc(this.data.key).update(this.data);
    this.closeModal();
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
