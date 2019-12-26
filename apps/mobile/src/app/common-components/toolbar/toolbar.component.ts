import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: "contler-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  @Input() isModal = false;
  @Input() hasSearch = false;

  constructor(public generalService: GeneralService, private modalController: ModalController) {}

  ngOnInit() {}

  closeModal(){
    this.modalController.dismiss();
  }

  search() {
    this.generalService.emitSearchToolbar();
  }
}