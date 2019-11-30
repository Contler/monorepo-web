import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'apps/guest/src/services/sidebar.service';

@Component({
  selector: 'contler-zone-request',
  templateUrl: './zone-request.component.html',
  styleUrls: ['./zone-request.component.scss']
})
export class ZoneRequestComponent implements OnInit {

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.sidebarService.backUrl = this.sidebarService.HOME_PATH;
  }

}
