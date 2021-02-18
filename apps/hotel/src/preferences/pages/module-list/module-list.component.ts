import { Component, OnInit } from '@angular/core';
import { Module } from 'hotel/preferences/pages/module-list/models/module';

@Component({
  selector: 'contler-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss'],
})
export class ModuleListComponent implements OnInit {
  public modules: Module[] = [];

  public ngOnInit(): void {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.modules = [
      {
        name: 'global.IMMEDIATE_REQUEST',
        icon: 'info',
        link: '',
        status: false,
      },
      {
        name: 'global.SPECIAL_REQUEST',
        icon: 'sms_failed',
        link: '',
        status: false,
      },
      {
        name: 'global.SPACE_RESERVATION',
        icon: 'insert_invitation',
        link: '',
        status: false,
      },
      {
        name: 'menu.remoteOrders',
        icon: 'room_service',
        link: '',
        status: false,
      },
      {
        name: 'wakeUp.room',
        icon: 'sensor_door',
        link: '',
        status: false,
      },
      {
        name: 'global.LATE_CHECKOUT',
        icon: 'transfer_within_a_station',
        link: '',
        status: false,
      },
      {
        name: 'typeRequest.CLEAN',
        icon: 'account_circle',
        link: '',
        status: false,
      },
      {
        name: 'typeRequest.RECEPTION',
        icon: 'room_service',
        link: '',
        status: false,
      },
      {
        name: 'typeRequest.MAINTAIN',
        icon: 'engineering',
        link: '',
        status: false,
      },
    ];
  }

  public goToModuleList(): void {}
}
