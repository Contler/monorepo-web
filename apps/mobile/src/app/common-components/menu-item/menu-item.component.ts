import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ADMIN } from '@contler/const';

@Component({
  selector: 'contler-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() selected = false;
  @Input() item: {icon: string, name: string} | undefined;
  @Input() show = true;
  isAdmin = false;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.idTokenResult.subscribe(token => {
      this.isAdmin = token!.claims.role === ADMIN;
    })
  }

  ngOnInit() {
  }



}
