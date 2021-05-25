import { Component, HostBinding, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChildrenMenu } from '../interfaces/children-menu.interface';
import { Router } from '@angular/router';
import { ItemMenu } from '../interfaces/item-menu.interface';

@Component({
  selector: 'contler-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
})
export class MenuListItemComponent {
  expanded = false;
  @Input() item: ChildrenMenu;
  @Input() depth: number;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;

  constructor(public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  onItemSelected(item: ChildrenMenu) {
    if (!item) {
      this.router.navigate([item.link]);
    }
    if (item) {
      this.expanded = !this.expanded;
    }
  }
}
