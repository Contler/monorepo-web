import { Component, OnInit, Input } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(public sidebarService: SidebarService, private router: Router) {}

  ngOnInit() {}

  toogleSidebar() {
    this.sidebarService.opened = !this.sidebarService.opened;
  }

  goToRoute(url: string) {
    this.router.navigateByUrl(url);
  }
}
