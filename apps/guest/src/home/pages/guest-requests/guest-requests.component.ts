import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'apps/guest/src/services/sidebar.service';

@Component({
  selector: 'contler-guest-requests',
  templateUrl: './guest-requests.component.html',
  styleUrls: ['./guest-requests.component.scss'],
})
export class GuestRequestsComponent implements OnInit {
  constructor(private router: Router, private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.backUrl = null;
  }

  goToZone(zone: any) {
    // PONER TIPO CORRESPONDIENTE
    this.router.navigate(['/home', 'zone-request', zone]);
  }
}
